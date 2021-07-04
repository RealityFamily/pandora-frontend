import React from 'react';

import styles from './AddItemNew.module.css';
import {Button, Cascader, Form, Input, Result, Select, Tooltip,} from 'antd';
import CategoryDataService from "../../../service/api/CategoryDataService";
import {InfoCircleOutlined, SearchOutlined, UserOutlined} from '@ant-design/icons';
import 'antd/dist/antd.css';
import {Option} from "antd/es/mentions";
import UserDataService from "../../../service/api/UserDataService";
import ItemDataService from "../../../service/api/ItemDataService";

class AddItemNew extends React.Component {

    formRef = React.createRef();

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
        selectedSubtagErrors: undefined,
        authorId: "Пользователь не найден",
        successOfLoading: false
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

    handleUserSearchBoxEdited = e => {
        this.setState({
            userSearchValue: e.target.value
        })
    }

    searchUser = e => {
        console.log(this.state.userSearchValue)
        UserDataService.retrieveUserByMailOrNickname(this.state.userSearchValue)
            .then(r => {
                console.log(r.data);
                this.setState({
                    authorId: r.data[0].id
                })
            })
            .catch(e => {
                this.setState({
                    authorId: "Пользователь не найден, попробуйте еще раз"
                })
            })
    }

    handleImagePreviewLarge = (e) => {
        let image_as_base64 = URL.createObjectURL(e.target.files[0])
        let image_as_files = e.target.files[0];

        this.setState({
            image_previewLarge: image_as_base64,
            image_fileLarge: image_as_files,
        })
    }

    handleImagePreviewSmall = (e) => {
        let image_as_base64 = URL.createObjectURL(e.target.files[0])
        let image_as_files = e.target.files[0];

        this.setState({
            image_previewSmall: image_as_base64,
            image_fileSmall: image_as_files,
        })
    }

    handleModel = (e) => {
        let model_as_files = e.target.files[0];

        this.setState({
            model_file: model_as_files,
        })
    }

    dropAllForm = () => {
        this.setState({
            selectedSubtag: "main",
            selectedSubtagErrors: undefined,
            authorId: "Пользователь не найден",
            successOfLoading: false,

            image_previewSmall: null,

            image_previewLarge: null,
            image_fileLarge: null,
            image_fileSmall: null,
            userSearchValue: ""
        });
    }

    onFinish = async values => {
        console.log(values)
        let form = new FormData();

        form.append("authorid", this.state.authorId);
        form.append("itemName", values.itemName);
        form.append("description", values.description);
        form.append("modelAccessStrategy", values.modelAccessStrategy);
        form.append("photoLarge", this.state.image_fileLarge);
        form.append("photoSmall", this.state.image_fileSmall);
        form.append("3dmodel", this.state.model_file);
        form.append("subtagid", values.subtagid[2]);

        //form.forEach(e =>{console.log(e)})

        ItemDataService.postItemToServer(form)
            .then(resp => {
                console.log(resp.data);
                this.setState({
                    successOfLoading: true
                })
            });

        // values.forEach(el => {
        //     if (el.)
        //         form.append(el)
        // })
    }


    render() {
        return <div className={styles.AddItemNew}>
            <h1 style={{textAlign: "center"}}>Добавление нового Item</h1>

            {this.state.successOfLoading ?
                <Result
                    status="success"
                    title="Модель была успешно добавлена"
                    subTitle="Вы можете найти через вкладку с моделями в левой панели"
                    extra={[
                        <Button type="primary" key="add" onClick={e => {
                            this.dropAllForm();
                        }}>Загрузить еще одну модель
                        </Button>,
                        <Button key="items" onClick={e => {
                            this.props.history.push("/admin/items")
                        }}>Перейти обратно ко всем моделям</Button>,
                    ]}
                /> :
                <>
                    <Form
                        ref={this.formRef}
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
                                   rules={[{
                                       required: true,
                                       message: 'Выберите какой тип доступа будет назначен к модели'
                                   }]}
                        >
                            <Select placeholder="Выберите тип доступа модели">
                                <Option value="Free">Бесплатно и доступно всем</Option>
                                <Option value="Premium">Доступно только по подписке</Option>
                            </Select>
                        </Form.Item>


                        <Form.Item name="photoLarge" label="Большое фото модели" required>
                            {this.state.image_previewLarge ?
                                <img style={{display: "block", width: "160px", height: "120px"}}
                                     src={this.state.image_previewLarge} alt="image preview"/>
                                : null}
                            <input onChange={this.handleImagePreviewLarge} type="file" name="photoLarge"
                                   accept="image/jpeg,image/jpg" required/>
                        </Form.Item>

                        <Form.Item name="photoSmall" label="Маленькое фото модели" required>
                            {this.state.image_previewSmall ?
                                <img style={{display: "block", width: "160px", height: "120px"}}
                                     src={this.state.image_previewSmall} alt="image preview"/>
                                : null}
                            <input onChange={this.handleImagePreviewSmall} type="file" name="photoSmall"
                                   accept="image/jpeg,image/jpg" required/>
                        </Form.Item>

                        <Form.Item name="model" label="Zip с 3д моделью" required>
                            <input onChange={this.handleModel} type="file" name="model" accept="application/zip"
                                   required/>
                        </Form.Item>


                        <Form.Item label="Автор Модели">
                            <Input
                                placeholder="Введите никнейм или email"
                                prefix={<UserOutlined className="site-form-item-icon"/>}
                                suffix={
                                    <>
                                        <Tooltip title="search">
                                            <Button type="dashed" shape="circle" icon={<SearchOutlined/>}
                                                    onClick={this.searchUser}/>
                                        </Tooltip>
                                        <Tooltip
                                            title="Введите никнейм пользователя или email с которого он был зарегестрирован">
                                            <InfoCircleOutlined style={{color: 'rgba(0,0,0,.45)'}}/>
                                        </Tooltip>
                                    </>
                                }
                                onChange={this.handleUserSearchBoxEdited}
                                value={this.state.userSearchValue}
                            />
                            <Form.Item name="authorid" label="ID пользователя" required>
                                <span className="ant-form-text">{this.state.authorId}</span>
                            </Form.Item>
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
            }
        </div>
    }

}

export default AddItemNew;
