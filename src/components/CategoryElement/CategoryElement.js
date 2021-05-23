import React from 'react';
import styles from './CategoryElement.module.css';
import {Button, Card, Col, Collapse, Popover, Row} from "antd";
import Title from "antd/es/typography/Title";
import Text from "antd/es/typography/Text";
import {render} from "react-dom";



class CategoryElement extends React.Component {


    render() {
        const {Panel} = Collapse;

        return (
        <div className={styles.CategoryElement}>

            <Card size="small"
                actions={
                [


                    <Collapse >
                        <Panel header="Подробнее" key="1">
                            <p>Тестовое описание категории</p>
                            <Button>Редактировать</Button>
                            <Button danger>Удалить</Button>
                        </Panel>
                    </Collapse>
                ]
            }
            >

                <Row justify="end" wrap={false}>
                    <Col flex="auto" style={{ textAlign: "center", padding: "10px"}}>
                        <Text strong>{this.props.title}</Text>
                    </Col>
{/*                    <Col flex="100px">
                        <Popover content={
                            <>
                                <p>Тестовое описание категории</p>
                                <Button>Редактировать</Button>
                                <Button danger>Удалить</Button>
                            </>
                        } title="Title">
                            <Button type="primary">Подробнее</Button>
                        </Popover>
                    </Col>*/}
                </Row>


            </Card>
        </div>
        );
    }
}

export default CategoryElement;
