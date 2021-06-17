import React from 'react';

import styles from './AddItemNew.module.css';
import {
    Form,
    Input,
    Button,
    Select,
    Cascader,
    DatePicker,
    InputNumber,
    TreeSelect,
    Switch, Upload, Divider,
} from 'antd';
import CategoryDataService from "../../../service/api/CategoryDataService";
import {DeploymentUnitOutlined} from '@ant-design/icons';
import 'antd/dist/antd.css';
import {Option} from "antd/es/mentions";

class AddItemNew extends React.Component {

    state = {
        options: [
            {
                value: 'someID',
                label: 'Category1',
                children: [
                    {
                        value: 'someID',
                        label: 'Subcategory1',
                        children: [
                            {
                                value: 'someID',
                                label: 'SubTag1',
                            },
                        ]
                    },
                ]
            },
        ],
        selectedSubtag: "main",
        selectedSubtagErrors: undefined
    }

    componentDidMount() {

        console.log(this.state.options);
        CategoryDataService.retrieveAllCategorysForSelect().then(resp => {
            this.setState({
                options: resp.data
            })
        })
    }

    handleCategorySelect = (e) => {
        if (e.length > 2) {
            this.setState({
                selectedSubtag: e[2],
                selectedSubtagErrors: undefined
            })
        } else if (e.length == 2) {
            this.setState({
                selectedSubtag: "SubCategoryNotAllowed",
                selectedSubtagErrors: "Вы выбрали подкатегорию. Элемент будет сохранен без сабтега"
            })
        } else if (e.length == 1) {
            this.setState({
                    selectedSubtag: "categoryNotAllowed",
                    selectedSubtagErrors: "Сохранение напрямую в категорию запрещено. Элемент будет отображен некорректно"
                }
            )
        }
    }


    onFinish = async values => {
        console.log(values)

    }


    render() {
        return <div className={styles.AddItemNew}>
            <h1 style={{textAlign: "center"}}>Добавление нового Item</h1>
            <>
                <Form
                    labelCol={{span: 4}}
                    wrapperCol={{span: 14}}
                    layout="horizontal"
                    onFinish={this.onFinish}
                >
                    <Form.Item
                        style={{
                            display: "flex",
                            textAlign: "center"
                        }}>
                        <span
                            style={{
                                color: "red"
                            }}>{this.state.selectedSubtagErrors ? this.state.selectedSubtagErrors.toString() : ""}</span>
                    </Form.Item>

                    <Form.Item
                        name="subtagid"
                        label="Категория"
                        rules={[
                            {
                                required: true,
                                message: 'Пожалуйста выберите категорию, оканчивая 3 столбцом',
                                type: 'array'
                            },
                        ]}
                    >
                        <Cascader
                            options={
                                this.state.options
                            }
                            onChange={this.handleCategorySelect}
                        />

                    </Form.Item>

                    <Form.Item
                        name="itemName"
                        label="Название модели"
                        rules={[
                            {
                                required: true,
                                message: 'Пожалуйста введите имя модели',
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        name="description"
                        label="Описание модели"
                        rules={[
                            {
                                required: true,
                                message: 'Пожалуйста введите описание модели',
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>


                    <Form.Item name="modelAccessStrategy" label="Тип доступа к модели"
                               rules={[{required: true, message: 'Выберите какой тип доступа будет назначен к модели'}]}
                    >
                        <Select placeholder="Выберите тип доступа модели">
                            <Option value="Free">Бесплатно и доступно всем</Option>
                            <Option value="Premium">Доступно только по подписке</Option>
                        </Select>
                    </Form.Item>


                    <Form.Item name="photoLarge" label="Большое фото модели" required>
                        <input type="file" name="photoLarge" accept="image/jpeg,image/jpg" required/>
                    </Form.Item>

                    <Form.Item name="photoSmall" label="Маленькое фото модели" required>
                        <input type="file" name="photoSmall" accept="image/jpeg,image/jpg" required/>
                    </Form.Item>

                    <Form.Item name="3dmodel" label="Zip с 3д моделью" required>
                        <input type="file" name="3dmodel" accept="application/zip" required/>
                    </Form.Item>


                    <Form.Item
                        wrapperCol={{
                            xs: {span: 24, offset: 0},
                            sm: {span: 16, offset: 8},
                        }}
                    >


                        <Button type="primary" htmlType="submit"
                                disabled={this.state.selectedSubtagErrors ? true : false}>Сохранить</Button>
                    </Form.Item>

                </Form>
            </>
        </div>
    }

}

export default AddItemNew;
