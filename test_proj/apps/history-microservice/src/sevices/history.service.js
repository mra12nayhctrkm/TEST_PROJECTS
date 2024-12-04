const { AppDataSource } = require("../database/config/postgres.config");
const { History } = require("../entities/history.entity");

class HistoryService {
    constructor() {
        this.repository = AppDataSource.getRepository(History);
    }

    /**
     * Logs an action to the history table.
     * @param {Object} data - The data to log.
     */
    async logAction(data) {
        const history = this.repository.create({
            shop_id: data.shop_id,
            plu: data.plu,
            action: data.action,
            shelf_quantity_before: data.shelf_quantity_before || null,
            shelf_quantity_after: data.shelf_quantity_after || null,
            order_quantity_before: data.order_quantity_before || null,
            order_quantity_after: data.order_quantity_after || null,
        });
        return await this.repository.save(history);
    }

    /**
     * Retrieves history based on filters.
     * @param {Object} filters - The filters to apply.
     */
    async getHistory(filters) {
        const query = this.repository.createQueryBuilder("history");

        if (filters.shop_id) query.andWhere("history.shop_id = :shop_id", { shop_id: filters.shop_id });
        if (filters.plu) query.andWhere("history.plu = :plu", { plu: filters.plu });
        if (filters.startDate && filters.endDate) {
            query.andWhere("history.date BETWEEN :startDate AND :endDate", {
                startDate: filters.startDate,
                endDate: filters.endDate,
            });
        }
        if (filters.action) query.andWhere("history.action = :action", { action: filters.action });

        return await query.getMany();
    }
}

module.exports = { HistoryService };
