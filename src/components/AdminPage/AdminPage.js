import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import {Layout, Menu, Breadcrumb, Table, PageHeader} from 'antd';
import {
    UserOutlined,
    AppstoreOutlined,
    TagsOutlined,
} from '@ant-design/icons';
import CategoryDataService from '../../service/api/CategoryDataService.js'
import AuthenticationService from "../../service/AuthenticationService";
import {Link} from "react-router-dom";


const {Header, Content, Footer, Sider} = Layout;
const {SubMenu} = Menu;

const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Название',
        dataIndex: 'category',
        key: 'category',
    },
];

export default class AdminPage extends React.Component {
    state = {
        collapsed: false,
    };

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({collapsed});
    };

    // componentDidMount() {
    //     this.refreshCategorys();
    // }

    render() {
        const {collapsed} = this.state;
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
        return (

            <div>
                <Header className="site-layout-background" style={{padding: 0}}>
                    <PageHeader
                        extra={
                            <div>
                                {!isUserLoggedIn && <Link to="/login">Login</Link>}
                                {isUserLoggedIn &&
                                <Link to="/logout" onClick={AuthenticationService.logout}>Logout</Link>}
                            </div>
                        }/>
                </Header>
                <Layout style={{minHeight: '100vh'}}>


                    <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>

                        <div className="logo"/>
                        <Menu theme="dark" defaultSelectedKeys={['1']} mode="vertical">

                            <Menu.Item key="items" icon={<AppstoreOutlined />}>
                                Items
                            </Menu.Item>

                            <Menu.Item key="users" icon={<UserOutlined/>}>
                                Users
                            </Menu.Item>


                            <Menu.Item key="categorys" icon={<TagsOutlined />}>
                                Category's
                            </Menu.Item>
                        </Menu>
                    </Sider>


                    <Layout className="site-layout">
                        <Content style={{margin: '0 16px'}}>

                            <></>


                        </Content>
                        <Footer style={{textAlign: 'center'}}>Pandrora ©2021 Created by RealityFamily and
                            Diskill</Footer>
                    </Layout>
                </Layout>
            </div>

        )
            ;
    }
}

