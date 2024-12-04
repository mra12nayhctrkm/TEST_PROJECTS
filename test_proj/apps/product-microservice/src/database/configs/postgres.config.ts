import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import {Product} from "../../entities/product.entity";
import {Shop} from "../../entities/shop.entity";
import {Stock} from "../../entities/stock.entity";


dotenv.config();


export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DATABASE_HOSTNAME,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [Product, Shop, Stock],
    synchronize: true,
    logging: true,
});
