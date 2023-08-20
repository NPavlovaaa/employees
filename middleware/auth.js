const jwt = require("jsonwebtoken");
const {prisma} = require("../prisma/prisma-client");

const auth = async (req, res, next) => {
    try {
        let token = req.headers.authorization.split(' ')[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await prisma.user.findUnique({
            where: {
                id: decoded.id
            }
        });

        next();

    } catch (error){
        return res.status(400).json({message: 'Вы не авторизованы'})
    }
}

module.exports = {
    auth
}