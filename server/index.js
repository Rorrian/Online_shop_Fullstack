require('dotenv').config()
const express = require('express')
const sequelize = require('./db') // Импортируем объект из файла db.js
const models = require('./models/models')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path')

const PORT = process.env.PORT || 5000 // Получение данных переменной окружения

const app = express()
// Настраиваем CORS чтобы была возможность отправлять запросы с браузера к БД
app.use(cors())
app.use(express.json()) // Чтобы приложение могло парсить JSON-формат:
app.use(express.static(path.resolve(__dirname, 'static'))) // Получение файлов из папки static
app.use(fileUpload({}))
app.use('/api', router)

app.use(errorHandler) // middleware кот. работает с ошибками обязательно должен идти в самом конце

// Ф-я для подключения к БД
const start = async () => {
    try {
        // Устанавливаем плдключение к БД
        await sequelize.authenticate()
        // Сверяет состояние БД со схемой данных
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()