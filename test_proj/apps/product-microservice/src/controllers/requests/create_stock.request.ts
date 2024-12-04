import { IsNotEmpty, IsNumber, IsObject } from 'class-validator';
import {Shop} from "../../entities/shop.entity";
import {Product} from "../../entities/product.entity";

export class StockCreateRequest {
    @IsNotEmpty()
    @IsNumber()
    shop: Shop;

    @IsNotEmpty()
    @IsNumber()
    product: Product;

    @IsNotEmpty()
    @IsNumber()
    quantity_on_shelf: number;

    @IsNotEmpty()
    @IsNumber()
    quantity_in_order: number;
}
