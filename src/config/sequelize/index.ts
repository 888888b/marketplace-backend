import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME || 'name',
    process.env.DB_USER || 'user',
    process.env.DB_PASSWORD || 'password',
    {
        host: process.env.DB_HOST,
        dialect: "postgres",
        port: Number(process.env.DB_PORT) || 5432,
        logging: false
    }
);

sequelize.sync({ alter: true });
export default sequelize;
