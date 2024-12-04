import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import {Stock} from "./stock.entity";

@Entity()
export class Shop {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Stock, (stock) => stock.shop)
    stocks: Stock[];
}
