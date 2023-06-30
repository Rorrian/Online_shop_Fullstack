const jwt = require('jsonwebtoken')

module.exports = function(role) {
    return function (req, res, next) {
        if(req.method === "OPTIONS") {
            next()
        }
        try {
            const token = req.headers.authorization.split(' ')[1] // Bearer asfasnfkajsfnjk
            if(!token) {
                return res.status(401).json({ message: "Пользователь не авторизован!" })
            }
            const decoded = jwt.verify(token, process.env.SECRET_KEY)

            // Проверка соответствия роли с заданной
            if(decoded.role !== role) {
                return res.status(403).json({ message: `Нет доступа! Роль текущая: ${decoded.role} и роль необходимая: ${role}` })
            }
            req.user = decoded;
            next()
        } catch (e) {
            res.status(401).json({ message: "Пользователь не авторизован!" })
        }
    };
}