import {seedShop} from "./1733158347222-shop_seeder";
import {AppDataSource} from "../configs/postgres.config";

(() => {
    AppDataSource.initialize().then((db) => {
        console.log('db connected')
        seedShop(db).then(() => db.destroy())
    }).catch((e)=> console.log(e));
})();
