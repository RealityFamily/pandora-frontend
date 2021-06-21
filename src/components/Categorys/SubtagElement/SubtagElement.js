import React from 'react';
import styles from './SubtagElement.module.css';
import {Button, Card, Col, Collapse, Popover, Row} from "antd";
import SubTagDataService from "../../../service/api/SubTagDataService";


class SubtagElement extends React.Component {

    state = {
        subtag: ""
    }

    componentDidMount() {
        SubTagDataService.retrieveSubtagDetailedInfo(this.props.id)
            .then(resp => {
                this.setState({
                    subtag: resp.data
                })
            })
    }


    render() {
        const {Panel} = Collapse;

        return (
            <div className={styles.CategoryElement}>

                <Card size="small">

                    <Row justify="end" wrap={false}>
                        <Col flex="auto" style={{textAlign: "center", padding: "10px"}}>
                            <Collapse ghost={true} expandIconPosition="right">
                                <Panel header={this.state.subtag.title} key="1">
                                    <p> id: {this.state.subtag.id}</p>
                                    <p>Колличество вложений: {this.state.subtag.childCount}</p>
                                    <Popover
                                        content={

                                        <>
                                            <input type={"text"} placeholder={"Название"}/>
                                            <button>Сохранить</button>
                                        </>

                                    } title="Редактировать данные">
                                        <Button
                                            disabled={this.state.subtag.title==="main"? true:false}
                                            type="primary">Редактировать</Button>
                                    </Popover>
                                    <Button danger
                                            onClick={(id) => this.props.onSubtagDelete(this.state.subtag.id)}
                                            disabled={this.state.subtag.title==="main"? true:false}
                                    >Удалить</Button>
                                </Panel>
                            </Collapse>
                        </Col>
                        {/*<Col flex="100px" style={{display: "flex", alignItems: "center"}}>*/}
                        {/*    <Button onClick={()=>this.props.onSubtagSelected(this.state.subtag.id)}*/}
                        {/*                   type={this.props.selected ? "primary" : "default"}>Выбрать</Button>*/}
                        {/*</Col>*/}
                    </Row>


                </Card>
            </div>
        );
    }
}

export default SubtagElement;
