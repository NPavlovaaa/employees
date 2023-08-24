import {PlusCircleOutlined} from "@ant-design/icons";
import {Table} from "antd";
import {ColumnsType} from "antd/lib/table";
import {useNavigate} from "react-router-dom";
import {Employee} from "@prisma/client";
import {useSelector} from "react-redux";
import {selectUser} from "../../features/auth/authSlice";


import {Layout} from "../../components/layout";
import {CustomButton} from "../../components/custom-button";
import {useGetAllEmployeesQuery} from "../../app/services/employeesAPI";
import {Paths} from "../../paths";
import {useEffect} from "react";


const columns: ColumnsType<Employee> = [
    {
        title: 'Имя',
        dataIndex: 'firstName',
        key: 'firstName',
    },
    {
        title: 'Возраст',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Адрес',
        dataIndex: 'address',
        key: 'address',
    }
]
export const Employees = () => {
    const {data, isLoading} = useGetAllEmployeesQuery();
    const user = useSelector(selectUser);
    const navigate = useNavigate();

    useEffect(() => {
        if(!user){
            navigate('/login')
        }
    }, [user, navigate])

    return(
        <Layout>
            <CustomButton type="primary" icon={<PlusCircleOutlined/>}>
                Добавить
            </CustomButton>
            <Table loading={isLoading}
                   dataSource={data}
                   columns={columns}
                   rowKey={record => record.id}
                   onRow={(record) => {
                       return {
                           onClick: () => navigate(`${Paths.employee}/${record.id}`)
                       }
                   }}
            >

            </Table>
        </Layout>
    )
}