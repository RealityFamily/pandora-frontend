import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Layout, Menu, Breadcrumb, Table } from 'antd';
import {
    DesktopOutlined,
    OrderedListOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import CategoryDataService from '../../service/CategoryDataService.js'


const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

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


const data = [
    {
        id: "6091d0435a3b5d65053665cf",
        category: "Кухня"
    },
    {
        id: "6091d0435a3b5d65053665d0",
        category: "Детская"
    },
    {
        id: "6091d0435a3b5d65053665ea",
        category: "Мебель"
    }

];


export default class AdminPage extends React.Component {
    state = {
        collapsed: false,
    };

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };

    // componentDidMount() {
    //     this.refreshCategorys();
    // }

    render() {
        const { collapsed } = this.state;
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>

                    <div className="logo" />
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="vertical">

                        <Menu.Item key="1" icon={<OrderedListOutlined />}>
                            Категории
                        </Menu.Item>

                        <Menu.Item key="2" icon={<DesktopOutlined />}>
                            Option 2
                        </Menu.Item>

                        <SubMenu key="sub1" icon={<UserOutlined />} title="User">

                            <SubMenu key="subsub2" icon={<TeamOutlined />} title="Team">
                                <Menu.Item key="submen2">Team 1</Menu.Item>
                                <Menu.Item key="submen3">Team 2</Menu.Item>
                            </SubMenu>
                            <Menu.Item key="3">Tom</Menu.Item>
                            <Menu.Item key="4">Bill</Menu.Item>
                            <Menu.Item key="5">Alex</Menu.Item>
                        </SubMenu>

                        <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
                            <Menu.Item key="6">Team 1</Menu.Item>
                            <Menu.Item key="8">Team 2</Menu.Item>
                        </SubMenu>

                        <Menu.Item key="9" icon={<FileOutlined />}>
                            Files
                        </Menu.Item>


                    </Menu>
                </Sider>


                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 0 }} />
                    <Content style={{ margin: '0 16px' }}>
{/*
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>User</Breadcrumb.Item>
                            <Breadcrumb.Item>Bill</Breadcrumb.Item>
                        </Breadcrumb>

                        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                            Bill is a cat.
                        </div>
*/}

                        {
                            <div className="container">
                                <h3>All Category's</h3>
                                <div className="container">

                                    <Table dataSource={data} columns={columns} />;
                                </div>
                            </div>
                        }
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Pandrora ©2018 Created by RealityFamily and Diskill</Footer>
                </Layout>
            </Layout>
        );
    }

    refreshCategorys() {
        CategoryDataService.retrieveAllCourses();
    }
}

