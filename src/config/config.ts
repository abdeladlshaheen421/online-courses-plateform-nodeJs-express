import dotenv from 'dotenv';
dotenv.config();
console.log(process.env.DATABASE_NAME)
export default {
  "development": {
    "username": process.env.DATABASE_USER,
    "password": process.env.DATABASE_PASS,
    "database": process.env.DATABASE_NAME,
    "host": process.env.DATABASE_HOST,
    "dialect": process.env.DATABASE_DIALECT,
  },
//   "test": {
//     "username": "root",
//     "password": null,
//     "database": "database_test",
//     "host": "127.0.0.1",
//     "dialect": "mysql"
//   },
//   "production": {
//     "username": "root",
//     "password": null,
//     "database": "database_production",
//     "host": "127.0.0.1",
//     "dialect": "mysql"
//   }
}
