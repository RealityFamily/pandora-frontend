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
    Switch, Upload,
} from 'antd';
import CategoryDataService from "../../../service/api/CategoryDataService";
import { DeploymentUnitOutlined} from '@ant-design/icons';
import 'antd/dist/antd.css';

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

    normFile = (e) => {
        console.log('Upload event:', e);

        if (Array.isArray(e)) {
            return e;
        }

        return e && e.fileList;
    }



    onFinish = async values => {
        let formData = new FormData();
        // fields is the form content, append it to formData
        Object.keys(values).map((item) => {
            formData.append(item,values[item])
        })

        console.log(formData);
    }

    handleBeforeUploadFile = (file) => {
        // Use beforeUpload will lose the ability to see the image immediately after selecting the image, so use the FileReader method to achieve the preview effect
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function () {
            this.setState({fileList: [{uid: file.uid, url: reader.result}],image:reader.result})
        }.bind(this);
        // Use beforeUpload to return false to stop uploading
        return false
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
                    <Form.Item label="Switch">
                        <Switch/>
                    </Form.Item>



{/*                    <Form.Item label="3D модель" name="3dmodel">
                        <Form.Item name="dragger" valuePropName="fileList" noStyle>
                            <Upload.Dragger maxCount={1} accept={".zip"}>
                                <p className="ant-upload-drag-icon">
                                    <DeploymentUnitOutlined />
                                </p>
                                <p className="ant-upload-text">Нажмите на поле или перетащите архив с 3D Моделью в это поле</p>
                                <p className="ant-upload-hint">Поддерживает загрузку только одного файла</p>
                            </Upload.Dragger>
                        </Form.Item>
                    </Form.Item>*/}

{/*
                    <Form.Item label="Dragger">
                        <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={this.normFile} noStyle
                                   >
                            <Upload.Dragger name="files"
                                            beforeUpload = {file => {
                                                return false;
                                            }}>
                                <p className="ant-upload-drag-icon">
                                    <DeploymentUnitOutlined />
                                </p>
                                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                            </Upload.Dragger>
                        </Form.Item>
                    </Form.Item>
*/}

                    <Form.Item
                        name="avatar"
                        label="Upload profile picture"
                        getValueFromEvent={({file}) => file.originFileObj}
                    >
                        <Upload
                            accept="image/png, image/jpeg"
                            maxCount={1}
                            listType="picture-card"
                            beforeUpload={this.handleBeforeUploadFile}
                        >
                            >
                        </Upload>
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
