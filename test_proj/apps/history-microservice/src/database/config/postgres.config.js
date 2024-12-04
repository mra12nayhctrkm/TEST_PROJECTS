require('reflect-metadata');
const { DataSource } = require('typeorm');
const dotenv = require('dotenv');
const {History} = require("../../entities/history.entity");

dotenv.config();

const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DATABASE_HOSTNAME,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [History],
    synchronize: true,
    logging: true,
});

module.exports = { AppDataSource };
