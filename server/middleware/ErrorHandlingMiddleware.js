const ApiError = require('../error/ApiError')

module.exports = function (err, req, res, next) { // next - следующий middleware, которому передаем управление
    if(err instanceof ApiError) { // Если класс ошибки ApiError
        return res.status(err.status).json({ message: err.message })
    }
    return res.status(500).json({ message: "Непредвиденная ошибка!" })
}