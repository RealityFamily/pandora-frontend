import React from 'react';
import styles from './CategoryPage.module.css';
import {Content, Header} from "antd/es/layout/layout";
import {Button, Layout} from "antd";
import {PlusOutlined} from '@ant-design/icons';
import CategoryTable from "../CategoryTable/CategoryTable";

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
