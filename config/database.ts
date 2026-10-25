import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DATABASE_NAME as string,
  process.env.DATABASE_USERNAME as string,
  process.env.DATABASE_PASSWORD as string,
  {
    host: process.env.DATABASE_HOST || 'localhost',
    dialect: 'mysql',
  },
);

sequelize
.authenticate()
.then(() => {
   console.log('Connection has been established successfully.');
}).catch((error) => {
   console.error('Unable to connect to the database: ', error);
});

export default sequelize;