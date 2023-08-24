import {Card, Form, Row, Space, Typography} from "antd";
import {Link, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {User} from "@prisma/client";
import {Layout} from "../../components/layout";
import {CustomInput} from "../../components/custom-input";
import {CustomPasswordInput} from "../../components/custom-password-input";
import {CustomButton} from "../../components/custom-button";
import {Paths} from "../../paths";
import {selectUser} from "../../features/auth/authSlice";
import {useEffect, useState} from "react";
import {useRegisterMutation} from "../../app/services/authAPI";
import {isErrorWithMessage} from "../../utils/is-error-with-message";
import {ErrorMessage} from "../../components/error-message";


export const Register = () => {
    const navigate = useNavigate();
    const user = useSelector(selectUser);
    const [error, setError] = useState("");
    const [registerUser] = useRegisterMutation();

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

    const onRegistration = async (data: User) => {
        try{
            await registerUser(data).unwrap();
            navigate("/");
        } catch (err) {
            const maybeError = isErrorWithMessage(err);

            if (maybeError) {
                setError(err.data.message);
            } else {
                setError("Неизвестная ошибка");
            }
        }
    }

    return(
        <Layout>
            <Row align="middle" justify="center">
                <Card title="Регистрация" style={{ width: "30rem" }}>
                    <Form onFinish={onRegistration}>
                        <CustomInput type="text" name="name" placeholder="Имя" />
                        <CustomInput type="email" name="email" placeholder="Email" />
                        <CustomPasswordInput name="password" placeholder="Пароль" />
                        <CustomPasswordInput name="confirmPassword" placeholder="Пароль" />
                        <CustomButton type="primary" htmlType="submit">
                            Зарегистрироваться
                        </CustomButton>
                    </Form>
                    <Space direction="vertical" size="large">
                        <Typography.Text>
                            Уже есть аккаунт? <Link to={Paths.login}>Войдите</Link>
                        </Typography.Text>
                        <ErrorMessage message={error} />
                    </Space>
                </Card>
            </Row>
        </Layout>
    )
}