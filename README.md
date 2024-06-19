# 🎓 Выпускная квалификационная работа

> Специальность: Информационные системы и программирование (`09.02.07`)
> Квалификация: Разработчик веб и мультимедийных приложений

![Next.js](https://img.shields.io/badge/Next.js-000?logo=nextdotjs&logoColor=fff&style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-593D88?style=for-the-badge&logo=redux&logoColor=white)
![RTK Query](https://img.shields.io/badge/RTK_Query-593D88?style=for-the-badge&logo=rtk&logoColor=white)
![SCSS](https://img.shields.io/badge/Scss-CC6699?style=for-the-badge&logo=sass&logoColor=white)
![Nest.js](https://img.shields.io/badge/nest.js-%23DD0031.svg?&style=for-the-badge&logo=nestjs&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![GIT](https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white)
![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)

##### 🔗 Frontend: [Gift-Frontend](https://github.com/MarkMelior/Gift-Frontend)

В результате выполнения выпускной квалификационной работы была достигнута основная цель — Разработка сайта для поиска креативных подарков, отвечающего современным требованиям рынка и тенденциям веб-разработки.

**📌 В ходе работы решены следующие задачи:**

- выбраны оптимальные технологии и инструменты, включая React, Next.js, TypeScript, Redux Toolkit, RTK Query, SCSS и TailwindCSS для Fronted и Nest.js, Mongoose, Zod, Docker, JWT для Backend;
- создана архитектура сайта с использованием методологии Feature-Sliced Design и AppRouter (Next.js);
- разработана собственная библиотека адаптивных компонентов, обеспечивающая высокую гибкость и удобство использования сайта;
- разработан дизайн сайта в Figma, включающий в себя как светлую, так и темную темы;
- обеспечена полная типизация проекта с использованием TypeScript, что повысило надежность и читаемость кода;
- реализованы механизмы оптимизации, такие как Lazy loading и асинхронные Reducers, для улучшения производительности сайта;
- реализованы ключевые функции сайта, включая авторизацию и регистрацию пользователей, админ панель для управления продуктами, функцию оптимизации сайта для слабых устройств, фильтры и сортировку товаров, тёмную и светлую тему, добавление в избранное и просмотр истории.

---

### Установка

1. Установить зависимости `npm install`
2. Развернуть Docker `docker-compose up -d`
3. Создать `.env` в главной директории и добавить:

```js
PORT = '8000';
JWT_SECRET = your_token;
REFRESH_SECRET = your_token2;
MYSQL_LOGIN = 'root';
MYSQL_PASSWORD = '';
MYSQL_HOST = 'localhost';
MYSQL_PORT = '3306';
MYSQL_DATABASE = 'gift_database';
MONGO_LOGIN = 'root';
MONGO_PASSWORD = 'root';
MONGO_HOST = '127.0.0.1';
MONGO_PORT = '27017';
```

4. Сбилдить проект `npm run build`
5. Запустить проект `npm start`
