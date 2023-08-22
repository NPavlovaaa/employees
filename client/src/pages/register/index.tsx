import {Card, Form, Row, Space, Typography} from "antd";
import {Link} from "react-router-dom";
import {Layout} from "../../components/layout";
import {CustomInput} from "../../components/custom-input";
import {CustomPasswordInput} from "../../components/custom-password-input";
import {CustomButton} from "../../components/custom-button";
import {Paths} from "../../paths";


export const Register = () => {
    return(
        <Layout>
            <Row align="middle" justify="center">
                <Card title="Регистрация" style={{ width: "30rem" }}>
                    <Form onFinish={() => null}>
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
                    </Space>
                </Card>
            </Row>
        </Layout>
    )
}