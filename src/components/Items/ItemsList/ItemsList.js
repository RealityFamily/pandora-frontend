import React from 'react';
import styles from './ItemsList.module.css';
import {Button, Divider, Layout, List, Select} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {Header} from "antd/es/layout/layout";
import ItemCard from "../ItemCard/ItemCard";
import CategoryDataService from "../../../service/api/CategoryDataService";
import SubCategoryDataService from "../../../service/api/SubCategoryDataService";
import ItemDataService from "../../../service/api/ItemDataService";

const {Option} = Select;

const data = [
    {
        name: 'Title 1',
        description: "The test description",
        imageURL: "https://manufaktura-yuyta-sochi.ru/wp-content/uploads/dionis-ugol-1.jpg",
        authorNickname: "authorTestNickname"
    },
];

class ItemsList extends React.Component {

    state = {
        categorys: [],
        selectedCategory: undefined,
        subcategorys: [],
        selectedSubcategory: undefined,
        networkError: false,
        itemsInSubtag: []
    }


    componentDidMount() {
        this.refreshAndBootstrapData();
    }


    refreshAndBootstrapData() {
        CategoryDataService.retrieveAllCategorys()
            .then((response => {
                console.log(response.data);
                this.setState({
                    categorys: response.data,
                    selectedCategory: response.data[0]
                });
            }))
            .catch(() => {
                console.log("Can't retrieve category list information");
                this.setState({
                    selectedCategory: "Нет доступа к данным",
                    selectedSubcategory: "Нет доступа к данным",
                    networkError: true
                });
            })
            .finally(() => {
                this.handleCategoryChange(this.state.selectedCategory.id);
            })
    }

    handleCategoryChange = async (key) => {
        const categorysCopy = [...this.state.categorys];
        const categorySelectedAll = categorysCopy.filter((category) => {
            if (category.id === key)
                return category;
        });
        let categorySelected = categorySelectedAll[0];
        await this.setState({selectedCategory: categorySelected});
        await this.getSubcats(categorySelected);
        await this.handleSubcatsChange(this.state.selectedSubcategory.id);
    }

    async getSubcats(categorySelected) {
        await SubCategoryDataService.retrieveAllSubategorysByCategoryId(categorySelected.id)
            .then((response) => {
                console.log(response.data);
                this.setState({
                    subcategorys: response.data,
                    selectedSubcategory: response.data[0]
                })
            })
            .catch((e) => {
                console.log("Can't retrieve category list information");
                this.setState({
                    selectedCategory: "Нет доступа к данным",
                    selectedSubcategory: "Нет доступа к данным",
                    networkError: true
                });
            });
    }

    async getItemsBySubcat(subactSelectedId) {
        ItemDataService.retrieveAllItemsBySubcategoryId(subactSelectedId)
            .then((response) => {
                this.setState({
                    itemsInSubtag: response.data
                })
                console.log(response.data);
            })
            .catch((e) => {
                console.log("Can't retrieve item list information");
                this.setState({
                    selectedCategory: "Нет доступа к данным",
                    selectedSubcategory: "Нет доступа к данным",
                    items: [],
                    networkError: true
                });
            });
    }

    handleSubcatsChange = async (key) => {

        const sucatsCopy = [...this.state.subcategorys];
        const subcatsSelectedAll = await sucatsCopy.filter((subcat) => {
            if (subcat.id === key) {
                return subcat;
            }
        });
        let subcatSelected = subcatsSelectedAll[0];
        await this.setState({selectedSubcategory: subcatSelected});

        if (subcatSelected) {
            await this.getItemsBySubcat(subcatSelected.id);
        }
    }

    render() {
        //console.log(this.state);
        return <div className={styles.ItemsList}>

            {this.state.networkError ?
                <p style={{color: "red"}}> Нет доступа к данным</p> :
                (
                    <Layout>
                        <Header theme={"light"} style={{
                            backgroundColor: "rgba(240,242, 245, 0.85)",
                            display: "flex",
                            justifyContent: "space-between"
                        }}>
                            <div style={{marginTop: "5px", marginLeft: "20px"}}>

                                <Select
                                    defaultValue="Категория не выбрана"
                                    style={{width: 120}}
                                    onChange={this.handleCategoryChange}
                                    defaultActiveFirstOption={true}
                                    value={this.state.selectedCategory === undefined ? "Категория не выбрана" : this.state.selectedCategory.category}>

                                    {this.state.categorys.map((category) => {
                                        return <Option key={category.id}
                                                       value={category.id}>
                                            {category.category}
                                        </Option>
                                    })}

                                </Select>
                                <Select defaultValue="Категория не выбрана"
                                        style={{width: 120}}
                                        onChange={this.handleSubcatsChange}
                                        value={this.state.selectedSubcategory === undefined ? "Категория не выбрана" : this.state.selectedSubcategory.title}>
                                    {this.state.subcategorys.map((subcat) => {
                                        return <Option key={subcat.id}
                                                       value={subcat.id}>
                                            {subcat.title}
                                        </Option>
                                    })}

                                </Select>


                            </div>
                            <Button type="primary" shape="round" icon={<PlusOutlined/>} size={"Large"}
                                    onClick={e => {this.props.history.push("/admin/items/addNew")}}
                                    style={{marginTop: "5px"}}>
                                Добавить
                            </Button>
                        </Header>


                        {this.state.itemsInSubtag.map(tag => {
                                return <>
                                    <Divider>{tag.title}</Divider>
                                    <List
                                    pagination={{
                                        onChange: page => {
                                            console.log(page);
                                        },
                                        pageSize: 5,
                                        showTitle: true
                                    }}
                                    grid={{
                                        gutter: 16,
                                        xs: 1,
                                        sm: 2,
                                        md: 4,
                                        lg: 4,
                                        xl: 6,
                                        xxl: 6
                                    }}
                                    dataSource={tag.itemCardShortDTOS}
                                    renderItem={ item =>
                                        <List.Item key={item.id}>
                                            <ItemCard id={item.id} accessStrategy={item.modelAccessStrategy}/>

                                        </List.Item>
                                    }
                                    >

                                    </List>
                                </>
                            }
                        )}



                    </Layout>
                )
            }
        </div>
    }

}


export default ItemsList;
