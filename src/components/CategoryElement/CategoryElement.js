import React from 'react';
import styles from './CategoryElement.module.css';
import {Button, Card, Col, Collapse, Popover, Row} from "antd";


class CategoryElement extends React.Component {


    render() {
        const {Panel} = Collapse;

        return (
            <div className={styles.CategoryElement}>

                <Card size="small">

                    <Row justify="end" wrap={false}>
                        <Col flex="auto" style={{textAlign: "center", padding: "10px"}}>
                            <Collapse ghost={true} expandIconPosition="right">
                                <Panel header={this.props.title} key="1">
                                    <p>Тестовое описание категории</p>
                                    <Popover content={

                                        <>
                                            <input type={"text"} placeholder={"Название"}/>
                                            <input type={"text"} placeholder={"Описание"}/>
                                            <button>Сохранить</button>
                                        </>

                                    } title="Редактировать данные">
                                        <Button type="primary">Редактировать</Button>
                                    </Popover>
                                    <Button danger>Удалить</Button>
                                </Panel>
                            </Collapse>
                        </Col>
                        <Col flex="100px" style={{display: "flex", alignItems: "center"}}>
                            <Button primary>Выбрать</Button>
                        </Col>
                    </Row>


                </Card>
            </div>
        );
    }
}

export default CategoryElement;
