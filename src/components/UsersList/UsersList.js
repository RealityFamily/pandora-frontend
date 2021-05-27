import React from 'react';
import styles from './UsersList.module.css';
import {Button, Layout, Table} from "antd";
import {Header} from "antd/es/layout/layout";
import {PlusOutlined} from "@ant-design/icons";
import {Input} from 'antd';
import {Link} from "react-router-dom";

const dataSource = [
    {
        key: '1',
        id: "8a8260ec-cbb7-4ead-a2ae-7d4fa6c4ad96",
        mail: 'testuser@gmail.com',
        nickname: 'testuser',
        role: 'User',
    },
    {
        key: '2',
        id: "161980ca-e02b-4f7c-bab9-52d2807a6fc3",
        mail: 'admintest@gmail.com',
        nickname: 'admin',
        role: 'Admin',
    },
    {
        key: '3',
        id: "62075f11-20cd-486a-b0ac-322fa840058f",
        mail: 'artemmakarevich1997@gmail.com',
        nickname: 'artemboomAss',
        role: 'User',
    },

];

const columns = [
    {
        title: 'Идентификатор',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Почта',
        dataIndex: 'mail',
        key: 'mail',
    },
    {
        title: 'Ник',
        dataIndex: 'nickname',
        key: 'nickname',
    },
    {
        title: 'Роль',
        dataIndex: 'role',
        key: 'role',
    },
    {
        title: 'Действия',
        key: 'operation',
        render: (_, record) => <Link to={`/admin/user/${record.id}`}>Редактировать</Link>},
];

class UsersList extends React.Component {


    render() {
        return <div className={styles.UsersList}>
            <Layout>
                <Header theme={"light"} style={{
                    backgroundColor: "rgba(240,242, 245, 0.85)",
                    display: "flex",
                    justifyContent: "flex-end"
                }}>
                    <Input.Search size="large" placeholder="поиск" enterButton
                                  style={{marginRight: "25%", marginTop: "5px", marginLeft: "20px"}}/>

                    <Button type="primary" shape="round" icon={<PlusOutlined/>} size={"Large"}
                            style={{marginTop: "5px"}}>
                        Добавить
                    </Button>
                </Header>

                <Table dataSource={dataSource} columns={columns}/>

            </Layout>
        </div>
    }
}

UsersList.propTypes = {};

UsersList.defaultProps = {};

export default UsersList;
