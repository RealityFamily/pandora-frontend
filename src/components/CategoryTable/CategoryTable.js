import React from 'react';
import {Col, Layout, Row} from "antd";
import Title from "antd/es/typography/Title";
import CategoryElement from "../CategoryElement/CategoryElement";

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

                <Col span={8}>

                    <Layout
                        //style={{background: 'rgba(0, 33, 64)'}}
                    >

                        <CategoryElement title="Ебаные диваны"></CategoryElement>
                        <CategoryElement title="Ну очень ебаные диваны"></CategoryElement>
                        <CategoryElement title="Самые трахучие злоебейшие адские очень ебаные диваны"></CategoryElement>

                    </Layout>
                </Col>

                <Col span={8}>
                    <Layout
                        //style={{background: 'rgba(0, 33, 64)'}}
                    >

                        <CategoryElement title="Ебаные диваны"></CategoryElement>
                        <CategoryElement title="Ну очень ебаные диваны"></CategoryElement>
                        <CategoryElement title="Самые трахучие злоебейшие адские очень ебаные диваны"></CategoryElement>

                    </Layout>
                </Col>

                <Col span={8}>

                    <Layout
                        //style={{background: 'rgba(0, 33, 64)'}}
                    >
                        <CategoryElement title="Ебаные диваны"></CategoryElement>
                        <CategoryElement title="Ну очень ебаные диваны"></CategoryElement>
                        <CategoryElement title="Самые трахучие злоебейшие адские очень ебаные диваны"></CategoryElement>

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
