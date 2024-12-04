import {Stock} from "../entities/stock.entity";
import {AppDataSource} from "../database/configs/postgres.config";


export const StockRepository = AppDataSource.getRepository(Stock);
