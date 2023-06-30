class ApiError extends Error{
    constructor(status, message) {
        super(); //Вызываем родительский конструктор
        this.status = status
        this.message = message
    }

    // Статические ф-и - ф-и, кот. можем вызывать без создания объекта
    static badRequest(message) {
        return new ApiError(404, message)
    }

    static internal(message) {
        return new ApiError(500, message)
    }

    static forbidden(message) {
        return new ApiError(403, message)
    }
}

module.exports = ApiError