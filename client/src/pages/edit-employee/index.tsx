import {Row} from "antd";
import {EmployeeForm} from "../../components/employee-form";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {selectUser} from "../../features/auth/authSlice";
import {useNavigate, useParams} from "react-router-dom";
import {Employee} from "@prisma/client";
import {useEditEmployeeMutation, useGetEmployeeQuery} from "../../app/services/employeesAPI";
import {isErrorWithMessage} from "../../utils/is-error-with-message";
import {Layout} from "../../components/layout";
import {Paths} from "../../paths";


export const EditEmployee = () => {
    const user = useSelector(selectUser);
    const navigate = useNavigate();
    const params = useParams<{ id: string }>();
    const [error, setError] = useState("");
    const { data, isLoading } = useGetEmployeeQuery(params.id || "");
    const [editEmployee] = useEditEmployeeMutation();

    useEffect(() => {
        if(!user){
            navigate('/login');
        }
    }, [user, navigate])

    if (isLoading) {
        return <span>Загрузка</span>
    }

    const handleEditEmployee = async (employee: Employee) => {
        try{
            const editedEmployee = {...data, ...employee};

            await editEmployee(editedEmployee).unwrap();
            navigate(`${Paths.status}/updated`);
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
                <EmployeeForm
                    onFinish={handleEditEmployee}
                    title="Изменить сотрудника"
                    btnText="Сохранить"
                    error={error}
                    employee={data}
                />
            </Row>
        </Layout>
    )
}