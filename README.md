# Online Courses Platform System

- an Backend Application using NodeJs-express

## MySQl Configration

1- change policy of password

### `SET GLOBAL validate_password.policy=LOW;`

2- create a new user

### `CREATE USER 'username'@'host' IDENTIFIED BY 'password';`

3- create database

### `CREATE DATABASE databaseName;`

4- give a user all privileges to database

### `grant all privileges on databaseName.* to 'userName'@'host';`

- Note :  the migration will automatically migrate after running server

---
## Installation
1- install project dependencies

### `npm i` or `npm install`

2- to build the project

### `npm run build`

3- to test the project

### `npm run test`

4- to run the project

### `npm start` or `npm run start`