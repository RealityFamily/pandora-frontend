import React from 'react';
import styles from './CategoryElement.module.css';
import {Button, Card, Col, Collapse, Popover, Row} from "antd";
import CategoryDataService from "../../../service/api/CategoryDataService";


class CategoryElement extends React.Component {

    state = {
        category: {id: "загрузка", title: "загрузка", description: "Загрузка", childCount: 0}
    }

    componentDidMount() {
        this.initCategoryInfo();
    }

    initCategoryInfo() {
        CategoryDataService.retrieveCategoryDetailedInfo(this.props.id)
            .then(resp => {
                this.setState({
                    category: resp.data
                })
            });
    }

    render() {
        const {Panel} = Collapse;
       // console.log(this.state.category);
        return (
            <div className={styles.CategoryElement}>

                <Card size="small">

                    <Row justify="end" wrap={false}>
                        <Col flex="auto" style={{textAlign: "center", padding: "10px"}}>
                            <Collapse ghost={true} expandIconPosition="right">
                                <Panel header={this.state.category.title} key="1">
                                    <p> Описание: {this.state.category.description}</p>
                                    <p> Колличество вложений: {this.state.category.childCount}</p>
                                    <Popover content={

                                        <>
                                            <input type={"text"} placeholder={"Название"}/>
                                            <input type={"text"} placeholder={"Описание"}/>
                                            <button>Сохранить</button>
                                        </>

                                    } title="Редактировать данные">
                                        <Button type="primary">Редактировать</Button>
                                    </Popover>
                                    <Button danger onClick={(e) => this.props.onCategoryDelete(this.state.category.id)}>Удалить</Button>
                                </Panel>
                            </Collapse>
                        </Col>
                        <Col flex="100px" style={{display: "flex", alignItems: "center"}}>
                            <Button onClick={()=>this.props.onCategorySelected(this.state.category.id)}
                                    type={this.props.selected ? "primary" : "default"}>Выбрать</Button>
                        </Col>
                    </Row>


                </Card>
            </div>
        );
    }
}

export default CategoryElement;
