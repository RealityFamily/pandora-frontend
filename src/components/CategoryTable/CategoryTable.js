import React from 'react';
import PropTypes from 'prop-types';
import styles from './CategoryTable.module.css';
import {Button, Col, Divider, Layout, Row} from "antd";
import Title from "antd/es/typography/Title";

class CategoryTable extends React.Component {
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

                    <Col span={8} >

                        <Layout
                            //style={{background: 'rgba(0, 33, 64)'}}
                        >

                            <Button style={{margin: "4px"}}> Лол кек чебурек</Button>
                            <Button style={{margin: "4px"}}> Лол кек чебурек</Button>
                            <Button style={{margin: "4px"}}> Лол кек чебурек</Button>
                            <Button style={{margin: "4px"}}> Лол кек чебурек</Button>
                            <Button style={{margin: "4px"}}> Лол кек чебурек</Button>
                            <Button style={{margin: "4px"}}> Лол кек чебурек</Button>
                            <Button style={{margin: "4px"}}> Лол кек чебурек</Button>
                            <Button style={{margin: "4px"}}> Лол кек чебурек</Button>
                            <Button style={{margin: "4px"}}> Лол кек чебурек</Button>
                            <Button style={{margin: "4px"}}> Лол кек чебурек</Button>
                            <Button style={{margin: "4px"}}> Лол кек чебурек</Button>
                            <Button style={{margin: "4px"}}> Лол кек чебурек</Button>
                            <Button style={{margin: "4px"}}> Лол кек чебурек</Button>
                            <Button style={{margin: "4px"}}> Лол кек чебурек</Button>
                            <Button style={{margin: "4px"}}> Лол кек чебурек</Button>
                            <Button style={{margin: "4px"}}> Лол кек чебурек</Button>
                            <Button style={{margin: "4px"}}> Лол кек чебурек</Button>
                            <Button style={{margin: "4px"}}> Лол кек чебурек</Button>
                            <Button style={{margin: "4px"}}> Лол кек чебурек</Button>
                            <Button style={{margin: "4px"}}> Лол кек чебурек</Button>
                            <Button style={{margin: "4px"}}> Лол кек чебурек</Button>
                            <Button style={{margin: "4px"}}> Лол кек чебурек</Button>
                            <Button style={{margin: "4px"}}> Лол кек чебурек</Button>
                            <Button style={{margin: "4px"}}> Лол кек чебурек</Button>
                            <Button style={{margin: "4px"}}> Лол кек чебурек</Button>

                        </Layout>
                    </Col>

                    <Col span={8} >
                        <Layout
                            //style={{background: 'rgba(0, 33, 64)'}}
                        >
                            <Button style={{margin: "4px"}}> Лол кек чебурек</Button>
                            <Button style={{margin: "4px"}}> Лол кек чебурек</Button>
                            <Button style={{margin: "4px"}}> Лол кек чебурек</Button>
                            <Button style={{margin: "4px"}}> Лол кек чебурек</Button>
                            <Button style={{margin: "4px"}}> Лол кек чебурек</Button>
                            <Button style={{margin: "4px"}}> Лол кек чебурек</Button>
                            <Button style={{margin: "4px"}}> Лол кек чебурек</Button>
                            <Button style={{margin: "4px"}}> Лол кек чебурек</Button>

                        </Layout>
                    </Col>

                    <Col span={8} >

                        <Layout
                            //style={{background: 'rgba(0, 33, 64)'}}
                        >
                            <Button style={{margin: "4px"}}> Лол кек чебурек</Button>
                            <Button style={{margin: "4px"}}> Лол кек чебурек</Button>
                            <Button style={{margin: "4px"}}> Лол кек чебурек</Button>
                            <Button style={{margin: "4px"}}> Лол кек чебурек</Button>
                            <Button style={{margin: "4px"}}> Лол кек чебурек</Button>
                            <Button style={{margin: "4px"}}> Лол кек чебурек</Button>
                            <Button style={{margin: "4px"}}> Лол кек чебурек</Button>
                            <Button style={{margin: "4px"}}> Лол кек чебурек</Button>

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
