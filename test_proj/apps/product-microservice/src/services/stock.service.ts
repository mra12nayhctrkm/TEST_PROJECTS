import {Stock} from "../entities/stock.entity";
import {StockRepository} from "../repositories/stock.repository";
import {Update_stocks} from "../controllers/requests/update_stocks";
import axios from "axios";
import {ActionType} from "../enums/action-type";


export class StockService {
    private readonly historyServiceApi = 'http://localhost:3001/api/';

    async createStock(data: Partial<Stock>): Promise<Stock> {
        const stock = StockRepository.create(data);
        const savedStock = await StockRepository.save(stock);
        const getStock = await StockRepository.findOne({
            where: { id: stock.id },
            relations: ['product', 'shop'],
        });
        if (!getStock) {
            throw new Error('Stock not found');
        }


        const logData = {
            action: ActionType.ADD_STOCK,
            shop_id: getStock.shop.id,
            plu: getStock.product.plu,
            shelf_quantity_after: getStock.quantity_on_shelf,
            order_quantity_after: getStock.quantity_in_order,
        };
        try {
            await axios.post(this.historyServiceApi + "history/log", logData);
        } catch (error) {
            console.error('Failed to log history for creating stock:', error.message);
        }

        return savedStock;
    }

    async increaseStock(stockId: number, data: Update_stocks): Promise<Stock> {
        const stock = await StockRepository.findOne({
            where: { id: stockId },
            relations: ['product', 'shop'],
        });
        if (!stock) {
            throw new Error('Stock not found');
        }

        await StockRepository.update(stockId, {
            quantity_on_shelf: stock.quantity_on_shelf + (data.quantity_on_shelf || 0),
            quantity_in_order: stock.quantity_in_order + (data.quantity_in_order || 0),
        });

        const updatedStock = await StockRepository.findOneBy({ id: stockId });
        if (!updatedStock) {
            throw new Error('Failed to retrieve updated stock');
        }

        const logData = {
            action: ActionType.INCREASE_STOCK,
            shop_id: stock.shop.id,
            plu: stock.product.plu,
            shelf_quantity_before: stock.quantity_on_shelf,
            shelf_quantity_after: updatedStock.quantity_on_shelf,
            order_quantity_before: stock.quantity_in_order,
            order_quantity_after: updatedStock.quantity_in_order,
        };
        try {
            await axios.post(this.historyServiceApi + "history/log", logData);
        } catch (error) {
            console.error('Failed to log history for increasing stock:', error.message);
        }

        return updatedStock;
    }


    async decreaseStock(stockId: number, data: Update_stocks): Promise<Stock> {
        const stock = await StockRepository.findOne({
            where: { id: stockId },
            relations: ['product', 'shop'],
        });
        if (!stock) {
            throw new Error('Stock not found');
        }

        const newQuantityOnShelf = stock.quantity_on_shelf - (data.quantity_on_shelf || 0);
        const newQuantityInOrder = stock.quantity_in_order - (data.quantity_in_order || 0);

        if (newQuantityOnShelf < 0) {
            throw new Error('Quantity on shelf cannot be less than 0');
        }

        if (newQuantityInOrder < 0) {
            throw new Error('Quantity in order cannot be less than 0');
        }

        await StockRepository.update(stockId, {
            quantity_on_shelf: newQuantityOnShelf,
            quantity_in_order: newQuantityInOrder,
        });

        const updatedStock = await StockRepository.findOneBy({ id: stockId });
        if (!updatedStock) {
            throw new Error('Failed to retrieve updated stock');
        }

        const logData = {
            action: ActionType.DECREASE_STOCK,
            shop_id: stock.shop.id,
            plu: stock.product.plu,
            shelf_quantity_before: stock.quantity_on_shelf,
            shelf_quantity_after: updatedStock.quantity_on_shelf,
            order_quantity_before: stock.quantity_in_order,
            order_quantity_after: updatedStock.quantity_in_order,
        };
        try {
            await axios.post(this.historyServiceApi + "history/log", logData);
        } catch (error) {
            console.error('Failed to log history for decreasing stock:', error.message);
        }

        return updatedStock;
    }



    async getStocks(filters: {
        plu?: string;
        shop_id?: number;
        quantity_on_shelf_from?: number;
        quantity_on_shelf_to?: number;
        quantity_in_order_from?: number;
        quantity_in_order_to?: number;
    }): Promise<Stock[]> {
        const query = StockRepository.createQueryBuilder('stock')
            .leftJoinAndSelect('stock.product', 'product')
            .leftJoinAndSelect('stock.shop', 'shop');

        if (filters.plu) {
            query.andWhere('product.plu = :plu', { plu: filters.plu });
        }

        if (filters.shop_id) {
            query.andWhere('shop.id = :shop_id', { shop_id: filters.shop_id });
        }

        if (filters.quantity_on_shelf_from !== undefined) {
            query.andWhere('stock.quantity_on_shelf >= :quantity_on_shelf_from', { quantity_on_shelf_from: filters.quantity_on_shelf_from });
        }

        if (filters.quantity_on_shelf_to !== undefined) {
            query.andWhere('stock.quantity_on_shelf <= :quantity_on_shelf_to', { quantity_on_shelf_to: filters.quantity_on_shelf_to });
        }

        if (filters.quantity_in_order_from !== undefined) {
            query.andWhere('stock.quantity_in_order >= :quantity_in_order_from', { quantity_in_order_from: filters.quantity_in_order_from });
        }

        if (filters.quantity_in_order_to !== undefined) {
            query.andWhere('stock.quantity_in_order <= :quantity_in_order_to', { quantity_in_order_to: filters.quantity_in_order_to });
        }

        return await query.getMany();
    }
}
