import {Card, Form, Row, Space, Typography} from "antd";
import {Link} from "react-router-dom";
import {Layout} from "../../components/layout";
import {CustomInput} from "../../components/custom-input";
import {CustomPasswordInput} from "../../components/custom-password-input";
import {CustomButton} from "../../components/custom-button";
import {Paths} from "../../paths";


export const Login = () => {
    return(
        <Layout>
            <Row align="middle" justify="center">
                <Card title="Войдите в аккаунт" style={{width: '30rem'}}>
                    <Form onFinish={() => null}>
                        <CustomInput name="email" placeholder="Email" type="email"/>
                        <CustomPasswordInput name="password" placeholder="Пароль"/>
                        <CustomButton type="primary" htmlType="submit">Войти</CustomButton>
                    </Form>
                    <Space direction="vertical" size="large">
                        <Typography.Text>
                            Нет аккаунта? <Link to={Paths.register}>Зарегистрируйтесь</Link>
                        </Typography.Text>
                    </Space>
                </Card>
            </Row>
        </Layout>
    )
}