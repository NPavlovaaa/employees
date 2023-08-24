import {Card, Form, Space} from "antd";
import { CustomInput } from "../custom-input";
import { ErrorMessage } from "../error-message";
import {CustomButton} from "../custom-button";
import {Employee} from "@prisma/client";


type Props<T> = {
    onFinish: (values: T) => void;
    btnText: string;
    title: string;
    error?: string;
    employee?: T;
}

export const EmployeeForm = ({
    onFinish,
    btnText,
    title,
    error,
    employee,
}: Props<Employee>) => {
    return(
        <Card title={title} style={{ width: "30rem" }}>
            <Form name="add-employee" onFinish={onFinish} initialValues={employee}>
                <CustomInput type="text" name="firstName" placeholder="Имя"/>
                <CustomInput name="lastName" placeholder="Фамилия"/>
                <CustomInput type="number" name="age" placeholder="Возраст"/>
                <CustomInput name="address" placeholder="Адрес"/>
                <Space direction="vertical" size="large">
                    <ErrorMessage message={error}/>
                    <CustomButton htmlType="submit">{btnText}</CustomButton>
                </Space>
            </Form>
        </Card>
    )
}