import React from 'react';
import styles from './ItemCard.module.css';
import {Card} from "antd";
import Meta from "antd/es/card/Meta";


class ItemCard extends React.Component {


    render() {
        return <div className={styles.ItemCard}>
            <Card
                  cover={<img alt="item photo" src={this.props.imageUrl} style={{width:"100%", height: "100%", display: "block"}} />}
                  hoverable
            >
                <Meta title={this.props.name} description={`Описание: ${this.props.description}`} />
                <Meta description={`Автор: ${this.props.authorNickname}`} />
            </Card>
        </div>
    }
}


export default ItemCard;
