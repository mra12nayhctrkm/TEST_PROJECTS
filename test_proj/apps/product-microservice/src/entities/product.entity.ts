import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import {Stock} from "./stock.entity";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    plu: string;

    @Column()
    name: string;

    @OneToMany(() => Stock, (stock) => stock.product)
    stocks: Stock[];
}
