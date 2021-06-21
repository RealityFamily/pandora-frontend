import React from 'react';
import styles from './SubcategoryElement.module.css';
import {Button, Card, Col, Collapse, Popover, Row} from "antd";
import SubCategoryDataService from "../../../service/api/SubCategoryDataService";


class SubcategoryElement extends React.Component {

    state = {
        subcategory: {id: "60a562761281ea24953aa1c4", title: "Техника крупная", description: "подкатегория техника крупная", childCount: 0}
    }

    componentDidMount() {
        SubCategoryDataService.retrieveSubcategoryDetailedInfo(this.props.id)
            .then( resp => {
                this.setState({
                    subcategory: resp.data
                });
                //console.log(resp.data);
            })
    }

    render() {
        const {Panel} = Collapse;

        return (
            <div className={styles.CategoryElement}>

                <Card size="small">

                    <Row justify="end" wrap={false}>
                        <Col flex="auto" style={{textAlign: "center", padding: "10px"}}>
                            <Collapse ghost={true} expandIconPosition="right">
                                <Panel header={this.state.subcategory.title} key="1">
                                    <p> Описание: {this.state.subcategory.description}</p>
                                    <p> Колличество вложений: {this.state.subcategory.childCount}</p>
                                    <Popover content={

                                        <>
                                            <input type={"text"} placeholder={"Название"}/>
                                            <input type={"text"} placeholder={"Описание"}/>
                                            <button>Сохранить</button>
                                        </>

                                    } title="Редактировать данные">
                                        <Button type="primary">Редактировать</Button>
                                    </Popover>
                                    <Button danger
                                    onClick={(id)=> this.props.onSubcategoryDelete(this.state.subcategory.id)}>Удалить</Button>
                                </Panel>
                            </Collapse>
                        </Col>
                        <Col flex="100px" style={{display: "flex", alignItems: "center"}}>
                            <Button onClick={()=>this.props.onSubcategorySelected(this.state.subcategory.id)}
                                    type={this.props.selected ? "primary" : "default"}>Выбрать</Button>
                        </Col>
                    </Row>


                </Card>
            </div>
        );
    }
}

export default SubcategoryElement;
