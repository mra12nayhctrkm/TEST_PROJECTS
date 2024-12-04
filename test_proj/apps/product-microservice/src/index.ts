import 'reflect-metadata';
import { ProductController } from "./controllers/product.controller";
import { createExpressServer } from "routing-controllers";
import {StockController} from "./controllers/stock.controller";
import {AppDataSource} from "./database/configs/postgres.config";

AppDataSource.initialize()
    .then(() => {
        const app = createExpressServer({
            controllers: [ProductController, StockController],
            routePrefix: '/api',
        });

        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => console.log(error));
