import React from 'react';
import styles from './UsersList.module.css';
import {Button, Checkbox, Input, Layout, Table, Tag} from "antd";
import {Header} from "antd/es/layout/layout";
import {PlusOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import UserDataService from "../../service/api/UserDataService";


const dataSource = [
    {
        key: '1',
        id: "8a8260ec-cbb7-4ead-a2ae-7d4fa6c4ad96",
        mail: 'testuser@gmail.com',
        nickname: 'testuser',
        role: ['USER'],
    },
    {
        key: '2',
        id: "161980ca-e02b-4f7c-bab9-52d2807a6fc3",
        mail: 'admintest@gmail.com',
        nickname: 'admin',
        role: ['ADMIN'],
    },
    {
        key: '3',
        id: "62075f11-20cd-486a-b0ac-322fa840058f",
        mail: 'artemmakarevich1997@gmail.com',
        nickname: 'artemboomAss',
        role: ['USER'],
    },

];


class UsersList extends React.Component {

    state = {
        userList: []
    }


    columns = [
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
            title: 'Подтвержден',
            dataIndex: 'verified',
            key: 'verified',
            render: (verified, record) => (

                verified?
                    <>
                        <Checkbox defaultChecked={verified} disabled></Checkbox>
                    </>
                    :
                    <>
                        <>
                            <Checkbox defaultChecked={verified} onChange={e => this.onVerifyAccountFromAdmin(e, record.key)}></Checkbox>
                        </>
                    </>
            )
        },
        {
            title: 'Роль',
            dataIndex: 'role',
            key: 'role',
            render: (tags, record) => (
                <>
                    {tags?.map(tag => {
                        let color = 'geekblue';
                        if (tag === 'USER') {
                            color = 'green';
                        }
                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            )
        },
        {
            title: 'Действия',
            key: 'operation',
            render: (_, record) => <Link to={`/admin/user/${record?.id}`}>Редактировать</Link>},
    ];


    componentDidMount() {
        UserDataService.retrieveAllUsers().then(resp =>{
            console.log(resp.data);
            this.setState({
                userList: resp.data?.map( user => {
                    return this.mapUserToUserTable(user);
                })
            })
        })
    }

    mapUserToUserTable(user) {
        let newUser = {};
        newUser.key = user.id;
        newUser.id = user.id;
        newUser.mail = user.mail;
        newUser.nickname = user.nickname;
        newUser.role = user.role;
        newUser.verified = user.enabled;
        console.log(newUser);
        return newUser;
    }

    onVerifyAccountFromAdmin = (e, id) => {
        console.log(e.target.checked);
        console.log(id);
        UserDataService.updateUserVerificationStatus(e.target.checked, id)
            .then( resp =>{
                 let userTableEntity = this.mapUserToUserTable(resp.data);
                 let stateUsers = [...this.state.userList];
                 let toSave = stateUsers.map(user => {
                     if(user.id === userTableEntity.id){
                         return userTableEntity;
                     } else return user;
                 })
                this.setState({
                    userList: toSave
                })
            })
            .catch(e=> {
                console.log(e);
            });
    }

    render() {

        return <div className={styles.UsersList}>
            <Layout>
                <Header theme={"light"} style={{
                    backgroundColor: "rgba(240,242, 245, 0.85)",
                    display: "flex",
                    justifyContent: "space-between"
                }}>
                    <Input.Search size="large" placeholder="поиск" enterButton
                                  style={{marginRight: "25%", marginTop: "5px", marginLeft: "20px"}}/>

                    <Button type="primary" shape="round" icon={<PlusOutlined/>} size={"Large"}
                            style={{marginTop: "5px"}}>
                        Добавить
                    </Button>
                </Header>

                <Table dataSource={this.state.userList} columns={this.columns}/>

            </Layout>
        </div>
    }


}

UsersList.propTypes = {};

UsersList.defaultProps = {};

export default UsersList;
