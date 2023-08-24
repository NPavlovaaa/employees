import React from "react";
import styles from "./index.module.css"
import {Layout, Space, Typography} from "antd";
import {LoginOutlined, LogoutOutlined, TeamOutlined, UserOutlined} from "@ant-design/icons";
import {CustomButton} from "../custom-button";
import {Link, useNavigate} from "react-router-dom";
import {Paths} from "../../paths";
import {useDispatch, useSelector} from "react-redux";
import {logout, selectUser} from "../../features/auth/authSlice";


export const Header = () =>{
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onLogout = () => {
        dispatch(logout());
        localStorage.removeItem('token');
        navigate('/login');
    }

    return(
        <Layout.Header className={styles.header}>
            <Space>
                <TeamOutlined className={styles.teamIcon}/>
                <Link to={Paths.home}>
                    <CustomButton type="ghost">
                        <Typography.Title level={2}>
                            Сотдрудники
                        </Typography.Title>
                    </CustomButton>
                </Link>
            </Space>
            {!user ?
                <Space>
                    <Link to={Paths.register}>
                        <CustomButton type="ghost" icon={<UserOutlined/>}>Зарегистрироваться</CustomButton>
                    </Link>
                    <Link to={Paths.login}>
                        <CustomButton type="ghost" icon={<LoginOutlined/>}>Войти</CustomButton>
                    </Link>
                </Space>
                :
                <Space>
                    <CustomButton type="ghost" icon={<LogoutOutlined/>} onClick={onLogout}>Выйти</CustomButton>
                </Space>
            }
        </Layout.Header>
    )
}