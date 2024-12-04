import {JsonController, Post, Get, Body, QueryParams, HttpError, Param} from 'routing-controllers';
import { StockService } from '../services/stock.service';
import {StockCreateRequest} from "./requests/create_stock.request";
import {Update_stocks} from "./requests/update_stocks";

const stockService = new StockService();

@JsonController('/stocks')
export class StockController {
    @Post('/')
    async createStock(@Body() stockRequest: StockCreateRequest) {
        try {
            return await stockService.createStock(stockRequest);
        } catch (error) {
            throw new HttpError(400, error.message);
        }
    }

    @Post('/increase/:id')
    async increaseStock(@Body() stockUpdateRequest: Update_stocks, @Param('id') stockId: number) {
        try {
            return await stockService.increaseStock(stockId, stockUpdateRequest);
        } catch (error) {
            throw new HttpError(400, error.message);
        }
    }

    @Post('/decrease/:id')
    async decreaseStock(@Body() stockUpdateRequest: Update_stocks, @Param('id') stockId: number) {
        try {
            return await stockService.decreaseStock(stockId, stockUpdateRequest);
        } catch (error) {
            throw new HttpError(400, error.message);
        }
    }

    @Get('/')
    async getStocks(@QueryParams() filters: { plu?: string; shop_id?: number; quantity_on_shelf_from?: number; quantity_on_shelf_to?: number; quantity_in_order_from?: number; quantity_in_order_to?: number }) {
        try {
            return await stockService.getStocks(filters);
        } catch (error) {
            throw new HttpError(400, error.message);
        }
    }
}
