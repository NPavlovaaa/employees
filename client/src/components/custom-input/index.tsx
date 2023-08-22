import {Form, Input} from "antd";


type Props = {
    name: string;
    placeholder: string;
    type?: string;
}

export const CustomInput = ({name, placeholder, type}: Props) => {
    return(
        <Form.Item
            name={name}
            rules={[{required: true, message: 'Обязательное поле'}]}
            shouldUpdate>
            <Input placeholder={placeholder} type={type} size="large"/>
        </Form.Item>
    )
}