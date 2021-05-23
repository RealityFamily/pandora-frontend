import React from 'react';
import PropTypes from 'prop-types';
import styles from './CategoryPage.module.css';
import {Content, Header} from "antd/es/layout/layout";
import {Button, Col, Layout, Row, Table} from "antd";
import {PlusOutlined} from '@ant-design/icons';
import Sider from "antd/es/layout/Sider";
import CategoryTable from "../CategoryTable/CategoryTable";

const dataSource = [
    {
        key: '1',
        name: 'Mike',
        age: 32,
        address: '10 Downing Street',
    },
    {
        key: '2',
        name: 'John',
        age: 42,
        address: '10 Downing Street',
    },
];

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
    },
];


const CategoryPage = () => (
    <div className={styles.CategoryPage}>
        <Layout>
            <Header theme={"light"} style={{backgroundColor: "rgba(240,242, 245, 0.85)", display: "flex", justifyContent: "flex-end"}}>
                <Button type="primary" shape="round" icon={<PlusOutlined/>} size={"Large"}
                        style={{marginTop: "5px"}}>
                    Добавить
                </Button>
            </Header>

            <Content>

                <CategoryTable>
                </CategoryTable>

            </Content>
        </Layout>
    </div>
);

CategoryPage.propTypes = {};

CategoryPage.defaultProps = {};

export default CategoryPage;
