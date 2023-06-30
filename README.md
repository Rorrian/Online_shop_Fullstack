<h2>Fullstack-проект "Интернет-магазин"</h2>
<br />
<h3>Реализованы следующие механизмы:</h3> 

* Создание диаграммы, моделей и связей между ними в БД

![Alt text](/git-images/Schema-pic.png)
* Основной функционал работы с БД - CRUD(create, read, update, delete)
* Роутинг
* Обработка ошибок(401, 403, 404)
* Middleware для обработки ошибок, проверки факта аутентификации и роли пользователя
* Раздача статики
* Регистрация & авторизация по jwt-токену(+ запросы требующие авторизации и общедоступные)
* Работа со стейтом
* Визуальная часть: несколько страниц: авторизация/регистрация, админ-панель, главная магазина, деталка товара, модалки
* Получение данных с сервера, фильтрация по брендам и типам, пагинация

<br />
<h3>Стек технологий: </h3>

* PERN Stack: PostgreSQL + express + React js + node.js
* State manager MobX
* Взаимодействие с сервером - Axios 

<br /><hr /><br />

<h2>Полезные материалы:</h2>

<h3>Backend:</h3> 

* Установка PostgreSQL: https://www.postgresql.org/download/
* Построение диаграмм для БД: https://app.diagrams.net/
* Клиент, кот. позволяет отправлять запросы на сервер(для проверки работоспособности запросов):<br />
Postman - https://www.postman.com/
https://web.postman.co/workspace/My-Workspace~ac54ca68-1a00-479f-8578-0fb627195159/request/create?requestId=9e4505ae-4ccf-471c-bdb4-b377736210f7 - gmail<br />
Нужна установленная desktop-версия для отправки запросов на localhost(http://localhost:5000)
* Декодирование JTW-токенов: https://jwt.io/

<h3>Frontend:</h3> 

* React Bootstrap: https://react-bootstrap.netlify.app/docs/getting-started/introduction
* Для возможности распарсить токен: https://www.npmjs.com/package/jwt-decode

<br /><hr /><br />

<h2>Развертывание и запуск приложения</h2><br />

* Установить СУБД, создать БД и указать данные для подключения в файле "/server/.env"
<br /><br />
* Backend:<br />

> cd server<br />
> npm i<br />
> npm run dev

<br />

* Frontend:<br />

> cd client<br />
> npm i<br />
> npm start

![Alt text](/git-images/image.png)

![Alt text](/git-images/image-1.png)

![Alt text](/git-images/image-2.png)

<br /><hr /><br />

<h2><i>// TODO:</i></h2>

В сервисе не реализованы:
* корзина: добавление, удаление, сохранение
* система рейтинга: установка, смена и сохранение
* возможность регистрации пользователя как админа(с выбором роли)
* возможность изменить роль с пользователя на админа
* связь типа и бренда товаров(при создании бренда выбираешь какие категории могут у него быть доступны(несколько), и соответственно при создании товара в выпадающем списке отображаются только необходимые позиции)
* удаление существующих типов, брендов, устройств и пользователей

Можно также сделать:
* избранные товары