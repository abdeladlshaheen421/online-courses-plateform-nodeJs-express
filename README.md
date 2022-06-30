# Online Courses Platform System

an Node JS Application using express
---
## MySQl Configration

1- change policy of password

### `SET GLOBAL validate_password.policy=LOW;`

2- create a new user

### `CREATE USER 'username'@'host' IDENTIFIED BY 'password';`

3- create database

### `CREATE DATABASE databaseName;`

4- give a user all privileges to database

### `grant all privileges on databaseName.* to 'userName'@'host';`
