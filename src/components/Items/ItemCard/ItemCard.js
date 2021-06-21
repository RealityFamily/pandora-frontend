import React from 'react';
import styles from './ItemCard.module.css';
import {Button, Card, Form, Input, message, Popover} from "antd";
import Meta from "antd/es/card/Meta";
import ItemDataService from "../../../service/api/ItemDataService";
import {EditOutlined} from '@ant-design/icons';

class ItemCard extends React.Component { // TODO: Not Finished. Need to make upload instrument first

    state = {
        image: "https://memepedia.ru/wp-content/uploads/2019/12/kot-gruzitsja-9.jpg",
        item: {
            id: "60cfaa854f697c38fa0b594a",
            authorReference: "realityfamilyteam@yandex.ru",
            name: "Батарея",
            description: "Просто прикольная батарея для общего пользования",
            modelSize: 8803372,
            authorNick: "realityfamily",
        }
    }

    handleItemChanged = (data) =>{
        console.log(data)
        ItemDataService.updateItemInfo(this.state.item.id, data.name, data.description)
            .then( resp => {
                this.setState({
                    item: resp.data
                })
                message.success(`Данные элемента только что были обновлены`)
            })
            .catch(e => {
                message.error(`Произошла непредвиденная ошибка при обновлении элемента`)
            })
    }

    componentDidMount() {
        ItemDataService.getSmallImageByItemId(this.props.id)
            .then(resp => {
                const blob = new Blob([resp.data], {
                    type: 'image/jpg',
                });
                let image = URL.createObjectURL(blob);
                this.setState({
                    image: image
                })
            })

        ItemDataService.getDetailedInfoItem(this.props.id)
            .then(resp => {
                console.log(resp.data)
                this.setState({
                    item: resp.data
                })
            })

    }


    render() {
        return <div className={styles.ItemCard}>
            <Card
                cover={<img alt="item photo" src={this.state.image}
                            style={{width: "100%", height: "100%", display: "block"}}/>}
                hoverable
                actions={[
                    <Popover content={
                        <div>
                            <Form onFinish={this.handleItemChanged}>
                                <Form.Item label="Имя модели" name="name">
                                    <Input/>
                                </Form.Item>

                                <Form.Item label="Описание" name="description">
                                    <Input/>
                                </Form.Item>

                                <Button type="primary" htmlType="submit">
                                    Сохранить
                                </Button>
                            </Form>
                        </div>
                    }
                             title="Title" trigger="click">
                        <EditOutlined key="edit"/>
                    </Popover>
                ]}
            >
                <Meta title={this.state.item.name} description={`Описание: ${this.state.item.description}`}/>
                <Meta description={`Автор: ${this.state.item.authorNick}`}/>
                <Meta description={`Сслыка автора: ${this.state.item.authorReference}`}></Meta>
                <Meta description={`Тип доступа: ${this.props.accessStrategy}`}></Meta>
                <Meta description={`Размер модели: ${this.state.item.modelSize * 0.0000010} МегаБайт`}></Meta>
            </Card>
        </div>
    }
}


export default ItemCard;
