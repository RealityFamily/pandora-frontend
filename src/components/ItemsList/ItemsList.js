import React from 'react';
import styles from './ItemsList.module.css';
import {Button, Layout, List, Select} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {Header} from "antd/es/layout/layout";
import ItemCard from "../ItemCard/ItemCard";
import CategoryDataService from "../../service/api/CategoryDataService";

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
        selectedCategory: null,
        subcategorys: [],
        selectedSubcategory: null
    }


    componentDidMount() {
        CategoryDataService.retrieveAllCourses().then((data => {
            console.log(data.data);
            this.setState({categorys: data.data
                , selectedCategory: data.data[0]
            })
        }))
    }

    render() {
        return <div className={styles.ItemsList}>

            <Layout>
                <Header theme={"light"} style={{
                    backgroundColor: "rgba(240,242, 245, 0.85)",
                    display: "flex",
                    justifyContent: "space-between"
                }}>
                    <div style={{marginTop: "5px", marginLeft: "20px"}}>
                        <Select defaultValue="Категория не выбрана" style={{width: 120}}>

                            {this.state.categorys.map((category) => {
                                return <Option key={category.id}
                                               value={category.category}
                                               /*onChange={this.setState({selectedCategory: {...category}})}*/>
                                    {category.category}
                                </Option>
                            })}

                        </Select>
                        <Select defaultValue="Категория не выбрана" style={{width: 120}}>
                            <Option value="lol">лол</Option>
                            <Option value="kek">кек</Option>
                            <Option value="cheburek">чебурек</Option>
                        </Select>
                        <Select defaultValue="Категория не выбрана" style={{width: 120}}>
                            <Option value="lol">лол</Option>
                            <Option value="kek">кек</Option>
                            <Option value="cheburek">чебурек</Option>
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
                            ></ItemCard>
                        </List.Item>
                    )}
                />

            </Layout>
        </div>
    }
}


export default ItemsList;
