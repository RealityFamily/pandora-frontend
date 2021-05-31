import React from 'react';
import 'antd/dist/antd.css';
import {Layout, Menu, PageHeader} from 'antd';
import {AppstoreOutlined, TagsOutlined, UserOutlined,} from '@ant-design/icons';
import AuthenticationService from "../../service/AuthenticationService";
import {Link, Route} from "react-router-dom";
import CategoryPage from "../CategoryPage/CategoryPage";
import UsersList from "../UsersList/UsersList";
import ItemsList from "../ItemsList/ItemsList";

const {Header, Content, Footer, Sider} = Layout;
//const {SubMenu} = Menu;

export default class AdminPage extends React.Component {
    state = {
        collapsed: false,
    };

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({collapsed});
    };

    componentDidMount() {
        this.props.history.replace("/admin/items") // navigate by default to the first tab in menu

    }

    onSideMenuClicked = (e) => {
        switch (e.key){
            case "items":
                this.props.history.push("/admin/items");
                break;
            case "users":
                this.props.history.push("/admin/users");
                break;
            case "category's":
                this.props.history.push("/admin/category/list");
                break;
            default: console.error("Not mapped menu item action");

        }
    }


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
                        <Menu theme="dark" defaultSelectedKeys={['items']} mode="vertical" onClick={this.onSideMenuClicked}>

                            <Menu.Item key="items" icon={<AppstoreOutlined/>} >
                                Items
                            </Menu.Item>

                            <Menu.Item key="users" icon={<UserOutlined/>}>
                                Users
                            </Menu.Item>


                            <Menu.Item key="category's" icon={<TagsOutlined/>}>
                                Category's
                            </Menu.Item>
                        </Menu>
                    </Sider>


                    <Layout className="site-layout">
                        <Content
                            //style={{margin: '0 16px'}}
                        >

                            <Route path="/admin/category/list" exact component={CategoryPage}/>
                            <Route path="/admin/users" exact component={UsersList}/>
                            <Route path="/admin/items" exact component={ItemsList}/>


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

