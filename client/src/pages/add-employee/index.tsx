import {Row} from "antd";
import {EmployeeForm} from "../../components/employee-form";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {selectUser} from "../../features/auth/authSlice";
import {useNavigate} from "react-router-dom";
import {Employee} from "@prisma/client";
import {useAddEmployeeMutation} from "../../app/services/employeesAPI";
import {isErrorWithMessage} from "../../utils/is-error-with-message";
import {Layout} from "../../components/layout";
import {Paths} from "../../paths";


export const AddEmployee = () => {
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const user = useSelector(selectUser);
    const [addEmployee] = useAddEmployeeMutation();

    useEffect(() => {
        if(!user){
            navigate('/login');
        }
    }, [user, navigate])

    const handleAddEmployee = async (data: Employee) => {
        try{
            await addEmployee(data).unwrap();
            navigate(`${Paths.status}/created`);
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
                    onFinish={handleAddEmployee}
                    title="Добавить сутрудника"
                    btnText="Добавить"
                    error={error}
                />
            </Row>
        </Layout>
    )
}