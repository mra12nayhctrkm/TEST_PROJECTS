import {Product} from "../entities/product.entity";
import {ProductRepository} from "../repositories/product.repository";
import axios from 'axios';
import {ActionType} from "../enums/action-type";



export class ProductService {
    private readonly historyServiceApi = 'http://localhost:3001/api/';

    async createProduct(data: Partial<Product>): Promise<Product> {
        const product = ProductRepository.create(data);
        const savedProduct = await ProductRepository.save(product);
        const logData = {
            action: ActionType.ADD_PRODUCT,
            plu: savedProduct.plu,
        }
        try {
            await axios.post(this.historyServiceApi + "history/log", logData);
        } catch (error) {
            console.error('Failed to log history:', error.message);
        }

        return savedProduct;
    }

    async getProducts(filters: { plu?: string; name?: string }): Promise<Product[]> {
        return await ProductRepository.find({
            where: filters,
            relations: ['stocks']
        });
    }
}
