const {prisma} = require("../prisma/prisma-client");

/**
 * @route GET /api/employees
 * @desc Получние списка сотрудников
 * @access Private
 **/
const all = async (req, res) => {
    try {
        const employees = await prisma.employee.findMany();

        res.status(200).json(employees);
    } catch {
        res.status(500).json({ message: "Не удалось получить сотрудников" });
    }
};

/**
 * @route GET /api/employees/:id
 * @desc Получение сотрудника
 * @access Private
 **/
const employee = async (req, res) => {
    try {
        const {id} = req.params;

        const employee = await prisma.employee.findUnique({
            where: {
                id
            }
        })
        return res.status(200).json(employee);
    } catch {
        res.status(500).json({ message: "Не удалось получить сотрудника" });
    }
};

/**
 * @route POST /api/employees/add
 * @desc Добавление сотрудника
 * @access Private
 **/
const add = async (req, res) => {
    try {
        const {firstName, lastName, address, age} = req.body;

        if(!firstName || !lastName || !address || !age){
            return res.status(400).json({message: 'Все поля обязательные'})
        }

        const employee = await prisma.employee.create({
            data: {
                firstName,
                lastName,
                address,
                age,
                userId: req.user.id
            }
        })
        return res.status(201).json(employee);
    } catch {
        res.status(500).json({ message: "Что-то пошло не так" });
    }
};

/**
 * @route POST /api/employees/remove/:id
 * @desc Удаление сотрудника
 * @access Private
 **/
const remove = async (req, res) => {
    try {
        const {id} = req.params;

        await prisma.employee.delete({
            where: {
                id
            }
        })
        return res.status(200).json('OK');
    } catch {
        res.status(500).json({ message: "Не удалось удалить сотрудника" });
    }
};

/**
 * @route PUT /api/employees/edit/:id
 * @desc Изменение сотрудника
 * @access Private
 **/
const edit = async (req, res) => {
    try {
        const data = req.body;

        await prisma.employee.update({
            where: {
                id: data.id
            },
            data
        })
        return res.status(200).json('OK');
    } catch {
        res.status(500).json({ message: "Не удалось изменить данные сотрудника" });
    }
};



module.exports = {
    all,
    employee,
    add,
    remove,
    edit
}