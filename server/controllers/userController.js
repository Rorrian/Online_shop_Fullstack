const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User, Basket } = require('../models/models')

const generateJwt = (id, email, role) => {
    return jwt.sign(
        { id, email, role },
        process.env.SECRET_KEY,
        { expiresIn: '24h' }
    )
}

class UserController {
    async registration(req, res, next) {
        const { email, password, role } = req.body

        console.log(email);
        console.log(password);

        //Проверяем заполнененность данных
        if(!email || !password){
            return next(ApiError.badRequest('Некорректный email или password!'))
        }

        // Проверяем есть ли в системе уже пользователь с данным email
        const candidate = await User.findOne({ where: { email } })
        if(candidate){
            return next(ApiError.badRequest('Пользователь с данным email уже существует!'))
        }

        // Хешируем пароль и создаем пользователя
        const hashPassword = await bcrypt.hash(password, 5) // 5 - кол-во раз хеширования
        const user = await User.create({ email, role, password: hashPassword })
        const basket = await Basket.create({ userId: user.id })
        // Генерируем jtw-токен для аутентификации пользователя
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({ token })
    }

    async login(req, res, next) {
        const { email, password } = req.body

        // Проверяем есть ли в системе пользователь
        const user = await User.findOne({ where: { email } })
        if(!user){
            return next(ApiError.internal('Пользователь не найден!'))
        }

        // Сравниваем введенный пароль с паролем в БД
        let comparePassword = bcrypt.compareSync(password, user.password)
        if(!comparePassword){
            return next(ApiError.internal('Пароли не совпадают!'))
        }

        // Генерируем jtw-токен для аутентификации пользователя
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({ token })
    }

    //Ф-я для проверки факта авторизации
    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({ token })
    }
}

module.exports = new UserController()