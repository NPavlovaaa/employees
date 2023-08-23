import {Card, Form, Row, Space, Typography} from "antd";
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import {Layout} from "../../components/layout";
import {CustomInput} from "../../components/custom-input";
import {CustomPasswordInput} from "../../components/custom-password-input";
import {CustomButton} from "../../components/custom-button";
import {Paths} from "../../paths";
import {useLoginMutation, UserData} from "../../app/services/authAPI";
import {isErrorWithMessage} from "../../utils/is-error-with-message";
import {ErrorMessage} from "../../components/error-message";


export const Login = () => {
    const navigate = useNavigate();
    const [loginUser] = useLoginMutation();
    const [loginError, setLoginError] = useState('');

    const onLogin = async (data: UserData) => {
        try {
            await loginUser(data).unwrap();
            navigate('/');
        } catch (err){
            const error = isErrorWithMessage(err);

            if(error){
                setLoginError(err.data.message);
            } else {
                setLoginError('Неизветсная ошибка');
            }
        }
    }

    return(
        <Layout>
            <Row align="middle" justify="center">
                <Card title="Войдите в аккаунт" style={{width: '30rem'}}>
                    <Form onFinish={onLogin}>
                        <CustomInput name="email" placeholder="Email" type="email"/>
                        <CustomPasswordInput name="password" placeholder="Пароль"/>
                        <CustomButton type="primary" htmlType="submit">Войти</CustomButton>
                    </Form>
                    <Space direction="vertical" size="large">
                        <Typography.Text>
                            Нет аккаунта? <Link to={Paths.register}>Зарегистрируйтесь</Link>
                        </Typography.Text>
                    </Space>
                    <ErrorMessage message={loginError}/>
                </Card>
            </Row>
        </Layout>
    )
}