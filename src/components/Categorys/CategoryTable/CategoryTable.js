import React from 'react';
import {Col, Layout, Row} from "antd";
import Title from "antd/es/typography/Title";
import CategoryElement from "../CategoryElement/CategoryElement";
import CategoryDataService from "../../../service/api/CategoryDataService";
import SubcategoryElement from "../SubcategoryElement/SubcategoryElement";
import SubtagElement from "../SubtagElement/SubtagElement";

class CategoryTable extends React.Component {

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

    getAllScheme = () => {
        CategoryDataService.retrieveAllCategorysForSelect()
            .then((resp) => {
                this.setState({
                    catSubCatSubtag: resp.data
                });
                console.log(this.state.catSubCatSubtag)
            });
    }

    handleCategorySelected = (id) => {
        this.setState({
            categorySelected: id,
            subcategorys: this.state.catSubCatSubtag.filter(category => category.value === id)[0].children
        })
    }


    handleSubcategorySelected = (id) => {
        let subtags = this.state.subcategorys.filter(subcategory => subcategory.value === id)[0].children;
        subtags = subtags === undefined ? [] : subtags;
        this.setState({
            subcategorySelected: id,
            subtags: subtags
        })
    }

    handleSubtagSelected = (id) => {
        console.log(id)
    }

    render() {
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

                        {this.state.catSubCatSubtag.map(category => {
                            return <CategoryElement key={category.value} id={category.value}
                                                    selected={category.value === this.state.categorySelected ? true : false}
                                                    onCategorySelected={(id) => this.handleCategorySelected(id)}></CategoryElement>
                        })}

                    </Layout>
                </Col>

                <Col span={8}>
                    <Layout
                        //style={{background: 'rgba(0, 33, 64)'}}
                    >

                        {this.state.subcategorys.map(subcategory => {
                            return <SubcategoryElement key={subcategory.value} id={subcategory.value}
                                                       selected={subcategory.value === this.state.subcategorySelected ? true : false}
                                                       onSubcategorySelected={(id) => this.handleSubcategorySelected(id)}></SubcategoryElement>
                        })}

                    </Layout>
                </Col>

                <Col span={8}>

                    <Layout
                        //style={{background: 'rgba(0, 33, 64)'}}
                    >
                        {this.state.subtags.map(subtag => {
                            return <SubtagElement key={subtag.value} id={subtag.value}
                                                  selected={subtag.value === this.state.subtagSelected ? true : false}
                                                  onSubtagSelected={(id) => this.handleSubtagSelected(id)}></SubtagElement>
                        })}
                    </Layout>

                </Col>
            </Row>


            {/*
                <Divider type="vertical" style={{height: "auto", marginTop: "15px", marginBottom: "15px", width: "5px" }}></Divider>


                <Divider type="vertical" style={{height: "auto", marginTop: "15px", marginBottom: "15px", width: "5px" }}></Divider>


                <Divider type="vertical" style={{height: "auto", marginTop: "15px", marginBottom: "15px", width: "5px" }}></Divider>
*/}


        </>;
    }


}

CategoryTable.propTypes = {};

CategoryTable.defaultProps = {};

export default CategoryTable;
