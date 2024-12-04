import {Product} from "../entities/product.entity";
import {AppDataSource}  from "../database/configs/postgres.config";


export const ProductRepository = AppDataSource.getRepository(Product);
