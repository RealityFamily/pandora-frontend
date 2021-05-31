import React from 'react';
import styles from './ItemCard.module.css';
import {Card} from "antd";


class ItemCard extends React.Component {


    render() {
        return <div className={styles.ItemCard}>
            <Card title={this.props.name}>Card content</Card>
        </div>
    }
}


export default ItemCard;
