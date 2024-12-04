import {Response} from 'express';
import {ProductService} from "../services/product.service";
import {ProductRequest} from "./requests/create_product.request";
import {Body, Get, JsonController, Post, QueryParams, Res} from "routing-controllers";
import {Service} from "typedi";


const productService = new ProductService();

@JsonController("/products")
@Service()
export class ProductController {
    @Post('/')
    async createProduct(@Body() body: ProductRequest, @Res() res: Response) {
        try {
            const product = await productService.createProduct(body);
            return res.status(201).json(product);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    @Get('/')
    async getProducts(@QueryParams() filters: { plu?: string; name?: string }, @Res() res: Response) {
        try {
            const products = await productService.getProducts(filters);
            return res.status(200).json(products);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
}
