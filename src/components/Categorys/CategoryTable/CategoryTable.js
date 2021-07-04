import React from 'react';
import {Button, Card, Col, Collapse, Divider, Form, Layout, message, Row} from "antd";
import Title from "antd/es/typography/Title";
import CategoryElement from "../CategoryElement/CategoryElement";
import CategoryDataService from "../../../service/api/CategoryDataService";
import SubcategoryElement from "../SubcategoryElement/SubcategoryElement";
import SubtagElement from "../SubtagElement/SubtagElement";
import {PlusOutlined} from "@ant-design/icons";
import SubCategoryDataService from "../../../service/api/SubCategoryDataService";
import SubTagDataService from "../../../service/api/SubTagDataService";

class CategoryTable extends React.Component {

    categoryFormRef = React.createRef();
    subcategoryFormRef = React.createRef();
    subtagFormRef = React.createRef();

    state = {
        catSubCatSubtag: [],
        subcategorys: [],
        subtags: [],
        categorySelected: "",
        subcategorySelected: "",
        subtagSelected: ""
    }


    componentDidMount() {
        this.getAllScheme();
    }

    getAllScheme = async () => {
        await CategoryDataService.retrieveAllCategorysForSelect()
            .then((resp) => {
                this.setState({
                    catSubCatSubtag: resp.data
                });
                //console.log(this.state.catSubCatSubtag)
            });
    }

    refreshSchemeFromState = async () => {
        let categoryId = this.state.categorySelected;
        let subcategoryId = this.state.subcategorySelected;

        let subcategorys = this.state.catSubCatSubtag?.filter(category => category.value === categoryId)[0]?.children;
        let subtags = subcategorys.filter(subcategory => subcategory.value === subcategoryId)[0]?.children;
        subtags = subtags === undefined ? [] : subtags;

        await this.setState({
            subcategorys: subcategorys,
            subtags: subtags
        });
    }

    handleCategorySelected = async (id) => {
        await this.setState({
            categorySelected: id,
            subcategorys: this.state.catSubCatSubtag.filter(category => category.value === id)[0].children,
            subtags: [],
            subcategorySelected: "",
            subtagSelected: ""
        })
    }


    handleSubcategorySelected = async (id) => {
        let subtags = this.state.subcategorys.filter(subcategory => subcategory.value === id)[0].children;
        subtags = subtags === undefined ? [] : subtags;
        await this.setState({
            subcategorySelected: id,
            subtags: subtags
        })
    }

    handleSubtagSelected = (id) => {
        //console.log(id)
    }

    handleCategoryAdded = async (e) => {
        await CategoryDataService.addCategoryToTheServer(e.title, e.description)
            .then(resp => {
                message.success(`Категория ${e.title} только что была добавлена на сервер`);
            })
            .catch(e => message.error(e));
        await this.getAllScheme();
        this.categoryFormRef.current.resetFields();
    }

    handleCategoryDelete = async (id) => {
        //console.log('Deleting category id', id);
        await CategoryDataService.deleteCategoryFromServer(id)
            .catch(e => message.error(e));
        await this.getAllScheme();
        await this.setState({
            subcategorys: [],
            subtags: [],
            categorySelected: "",
            subcategorySelected: "",
            subtagSelected: ""
        })
        message.success(`Категория c ${id} только что была удалена с сервера`)
    }

    handleSubcategoryAdded = async (e) => {
        await SubCategoryDataService.addSubcategoryToTheServer(e.title, e.description, this.state.categorySelected)
            .then(resp => {
                message.success(`Подкатегория ${e.title} только что была добавлена на сервер`);
            })
            .catch(e => message.error(e))
        await this.getAllScheme();
        await this.refreshSchemeFromState();
        this.subcategoryFormRef.current.resetFields();
    };

    handleSubcategoryDelete = async (id) => {
        //console.log('Deleting subcategory id', id);
        await SubCategoryDataService.deleteSubcategoryFromServer(id)
            .catch(e => message.error(e));
        await this.getAllScheme();
        await this.handleCategorySelected(this.state.categorySelected);
        message.success(`Категория c ${id} только что была удалена с сервера`)
    }

    handleSubtagAdded = async (e) => {
        await SubTagDataService.addSubcategoryToTheServer(e.title, this.state.subcategorySelected)
            .then(resp => {
                message.success(`Подкатегория ${e.title} только что была добавлена на сервер`);
            })
            .catch(e => message.error(e));
        await this.subtagFormRef.current.resetFields();
        await this.getAllScheme();
        await this.refreshSchemeFromState();
    }

    handleSubtagDelete = async (id) => {
        //console.log('Deleting subtag id', id);
        await SubTagDataService.deleteSubtagFromServer(id)
            .catch(e => message.error(e));
        await this.getAllScheme();
        await this.refreshSchemeFromState();
        message.success(`Сабтег c ${id} только что была удалена с сервера`)
    }

    render() {
        const {Panel} = Collapse;
        return <>
            <Row gutter={[16, 16]}>

                <Col span={8} style={{textAlign: "center"}}>
                    <div>
                        <Title level={3}>Категории</Title>
                    </div>
                </Col>

                <Col span={8} style={{textAlign: "center"}}>
                    <div>
                        <Title level={3}>Подкатегории</Title>
                    </div>
                </Col>

                <Col span={8} style={{textAlign: "center"}}>
                    <div>
                        <Title level={3}>Теги</Title>
                    </div>
                </Col>

                <Col span={8}>

                    <Layout
                        //style={{background: 'rgba(0, 33, 64)'}}
                    >

                        <Card size="small" bodyStyle={{border: "2px dotted #1890FF"}}>
                            <Row justify="end" wrap={false}>
                                <Col flex="auto" style={{textAlign: "center", padding: "10px"}}>
                                    <Collapse ghost={true} expandIconPosition="right"
                                              expandIcon={(panelProps) => <PlusOutlined/>}>
                                        <Panel header="Добавить новую категорию" key="1">
                                            <Form ref={this.categoryFormRef} onFinish={this.handleCategoryAdded}>
                                                <Form.Item name="title" label="Название">
                                                    <input type={"text"} placeholder={"Введите название"}/>
                                                </Form.Item>
                                                <Form.Item name="description" label="Описание">
                                                    <input type={"text"} placeholder={"Введите описание"}/>
                                                </Form.Item>
                                                <Form.Item>
                                                    <Button type="primary" htmlType="submit">Сохранить</Button>
                                                </Form.Item>
                                            </Form>
                                        </Panel>
                                    </Collapse>
                                </Col>
                            </Row>
                        </Card>

                        <Divider></Divider>

                        {this.state.catSubCatSubtag?.map(category => {
                            return <CategoryElement key={category.value} id={category.value}
                                                    selected={category.value === this.state.categorySelected ? true : false}
                                                    onCategorySelected={(id) => this.handleCategorySelected(id)}
                                                    onCategoryDelete={(id) => this.handleCategoryDelete(id)}></CategoryElement>
                        })}

                    </Layout>
                </Col>

                <Col span={8}>
                    <Layout
                        //style={{background: 'rgba(0, 33, 64)'}}
                    >

                        <Card size="small" bodyStyle={{border: "2px dotted #1890FF"}}>

                            {this.state.categorySelected ?
                                <Row justify="end" wrap={false}>
                                    <Col flex="auto" style={{textAlign: "center", padding: "10px"}}>
                                        <Collapse ghost={true} expandIconPosition="right"
                                                  expandIcon={(panelProps) => <PlusOutlined/>}>
                                            <Panel header="Добавить новую подкатегорию" key="1">
                                                <Form ref={this.subcategoryFormRef}
                                                      onFinish={this.handleSubcategoryAdded}>
                                                    <Form.Item name="title" label="Название">
                                                        <input type={"text"} placeholder={"Введите название"}/>
                                                    </Form.Item>
                                                    <Form.Item name="description" label="Описание">
                                                        <input type={"text"} placeholder={"Введите описание"}/>
                                                    </Form.Item>
                                                    <Form.Item>
                                                        <Button type="primary" htmlType="submit">Сохранить</Button>
                                                    </Form.Item>
                                                </Form>
                                            </Panel>
                                        </Collapse>
                                    </Col>
                                </Row>
                                : null}
                        </Card>

                        <Divider></Divider>

                        {this.state.subcategorys?.map(subcategory => {
                            return <SubcategoryElement key={subcategory.value} id={subcategory.value}
                                                       selected={subcategory.value === this.state.subcategorySelected ? true : false}
                                                       onSubcategorySelected={(id) => this.handleSubcategorySelected(id)}
                                                       onSubcategoryDelete={(id) => this.handleSubcategoryDelete(id)}></SubcategoryElement>
                        })}

                    </Layout>
                </Col>

                <Col span={8}>

                    <Layout
                        //style={{background: 'rgba(0, 33, 64)'}}
                    >
                        <Card size="small" bodyStyle={{border: "2px dotted #1890FF"}}>

                            {this.state.subcategorySelected ?
                                <Row justify="end" wrap={false}>
                                    <Col flex="auto" style={{textAlign: "center", padding: "10px"}}>
                                        <Collapse ghost={true} expandIconPosition="right"
                                                  expandIcon={(panelProps) => <PlusOutlined/>}>
                                            <Panel header="Добавить новый тег" key="1">
                                                <Form ref={this.subtagFormRef} onFinish={this.handleSubtagAdded}>
                                                    <Form.Item name="title" label="Название">
                                                        <input type={"text"} placeholder={"Введите название"}/>
                                                    </Form.Item>
                                                    <Form.Item>
                                                        <Button type="primary" htmlType="submit">Сохранить</Button>
                                                    </Form.Item>
                                                </Form>
                                            </Panel>
                                        </Collapse>
                                    </Col>
                                </Row>
                                : null}
                        </Card>

                        <Divider></Divider>

                        {this.state.subtags?.map(subtag => {
                            return <SubtagElement key={subtag.value} id={subtag.value}
                                                  selected={subtag.value === this.state.subtagSelected ? true : false}
                                                  onSubtagSelected={(id) => this.handleSubtagSelected(id)}
                                                  onSubtagDelete={(id) => this.handleSubtagDelete(id)}></SubtagElement>
                        })}
                    </Layout>

                </Col>
            </Row>


        </>;
    }


}

CategoryTable.propTypes = {};

CategoryTable.defaultProps = {};

export default CategoryTable;
