import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import {Product} from "./product.entity";
import {Shop} from "./shop.entity";


@Entity()
export class Stock {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Product, (product) => product.stocks)
    product: Product;

    @ManyToOne(() => Shop, (shop) => shop.stocks)
    shop: Shop;

    @Column()
    quantity_on_shelf: number;

    @Column()
    quantity_in_order: number;
}
