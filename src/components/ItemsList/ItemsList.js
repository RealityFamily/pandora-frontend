import React from 'react';
import styles from './ItemsList.module.css';
import {Button, Card, Layout, List} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {Header} from "antd/es/layout/layout";

const data = [
    {
        title: 'Title 1'
    },
    {
        title: 'Title 2'
    },
    {
        title: 'Title 3'
    },
    {
        title: 'Title 4'
    },
    {
        title: 'Title 5'
    },
    {
        title: 'Title 6'
    },
    {
        title: 'Title 7'
    },
    {
        title: 'Title 8'
    },
    {
        title: 'Title 9'
    },
    {
        title: 'Title 10'
    },
    {
        title: 'Title 11'
    },
    {
        title: 'Title 12'
    },
    {
        title: 'Title 13'
    },
    {
        title: 'Title 14'
    }
];

class ItemsList extends React.Component {

    render(){
    return <div className={styles.ItemsList}>

        <Layout>
        <Header theme={"light"} style={{backgroundColor: "rgba(240,242, 245, 0.85)", display: "flex", justifyContent: "flex-end"}}>
            <Button type="primary" shape="round" icon={<PlusOutlined/>} size={"Large"}
                    style={{marginTop: "5px"}}>
                Добавить
            </Button>
        </Header>
        <List
          pagination={{
              onChange: page => {
                  console.log(page);
              },
              pageSize: 6
          }}
          grid={{
              gutter: 16,
              xs: 1,
              sm: 2,
              md: 4,
              lg: 4,
              xl: 6,
              xxl: 3
          }}
          dataSource={data}
          renderItem={item => (
              <List.Item>
                  <Card title={item.title}>Card content</Card>
              </List.Item>
          )}
      />

        </Layout>
  </div>
    }
}


export default ItemsList;
