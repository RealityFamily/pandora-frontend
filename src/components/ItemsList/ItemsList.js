import React from 'react';
import styles from './ItemsList.module.css';
import {Button, Layout, List, Select} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {Header} from "antd/es/layout/layout";
import ItemCard from "../ItemCard/ItemCard";
import CategoryDataService from "../../service/api/CategoryDataService";
import SubCategoryDataService from "../../service/api/SubCategoryDataService";

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
        selectedCategory: "Категория не выбрана",
        subcategorys: [],
        selectedSubcategory: null
    }


    componentDidMount() {
        CategoryDataService.retrieveAllCourses()
            .then((response => {
                console.log(response.data);
                this.setState({
                    categorys: response.data,
                    selectedCategory: response.data[0]
                });
            }))
            .catch( () => {
                console.log("Can't retrieve category list information");
                this.setState({
                    selectedCategory: "Категория не выбрана"
                });
            })
    }


    handleCategoryChange = (e) => {
        const categorysCopy = [...this.state.categorys]
        const categorySelectedAll = categorysCopy.filter( (category) => {
            if(category.id === e)
                return category;
        });
        let categorySelected = categorySelectedAll[0];
        this.setState({selectedCategory: categorySelected});
        this.getSubcats(categorySelected);
    }

    getSubcats(categorySelected) {
        SubCategoryDataService.retrieveAllSubategorysByCategoryId(categorySelected.id)
            .then((response) => {
                console.log(response.data);
                this.setState({subcategorys: response.data})
            });
    }

    render() {
        console.log(this.state);
        return <div className={styles.ItemsList}>

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
                            value={this.state.selectedCategory.category}
                        >

                            {this.state.categorys.map((category) => {
                                return <Option key={category.id}
                                               value={category.id}>
                                    {category.category}
                                </Option>
                            })}

                        </Select>
                        <Select defaultValue="Категория не выбрана" style={{width: 120}}>
                            {this.state.subcategorys.map((subcat) => {
                                return <Option key={subcat.id}
                                               value={subcat.id}>
                                    {subcat.title}
                                </Option>
                            })}

                        </Select>
                        <Select defaultValue="Категория не выбрана" style={{width: 120}}>
                            <Option value="lol2">лол</Option>
                            <Option value="kek2">кек</Option>
                            <Option value="cheburek2">чебурек</Option>
                        </Select>

                    </div>
                    <Button type="primary" shape="round" icon={<PlusOutlined/>} size={"Large"}
                            style={{marginTop: "5px"}}>
                        Добавить
                    </Button>
                </Header>
                <List
                    pagination={{
                        onChange: page => {
                            console.log(page);
                        },
                        pageSize: 20
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
                    dataSource={data}
                    renderItem={item => (
                        <List.Item>
                            <ItemCard
                                name={item.name}
                                description={item.description}
                                imageUrl={item.imageURL}
                                authorNickname={item.authorNickname}
                            />
                        </List.Item>
                    )}
                />

            </Layout>
        </div>
    }

}


export default ItemsList;
