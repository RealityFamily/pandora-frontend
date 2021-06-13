import React from 'react';
import styles from './ItemCard.module.css';
import {Card} from "antd";
import Meta from "antd/es/card/Meta";
import ItemDataService from "../../../service/api/ItemDataService";


class ItemCard extends React.Component { // TODO: Not Finished. Need to make upload instrument first


    render() {
        return <div className={styles.ItemCard}>
            <Card
                cover={<img alt="item photo" src={ItemDataService.getSmallImageByItemId(this.props.id)}
                            style={{width: "100%", height: "100%", display: "block"}}/>}
                hoverable
            >
                <Meta title={this.props.name} description={`Описание: ${this.props.description}`}/>
                <Meta description={`Автор: ${this.props.authorNickname}`}/>
                <Meta descririon={this.props.modelAccessStrategy}></Meta>
            </Card>
        </div>
    }
}


export default ItemCard;
