import {Shop} from "../entities/shop.entity";
import {AppDataSource} from "../database/configs/postgres.config";


export const ShopRepository = AppDataSource.getRepository(Shop);
