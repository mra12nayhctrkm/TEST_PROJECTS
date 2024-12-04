import {Shop} from "../../entities/shop.entity";
import {createShopFactory} from "../factories/shop.factory";
import {DataSource} from "typeorm";

export const seedShop = async (dataSource: DataSource) => {
    const shopRepository = dataSource.getRepository(Shop);
    console.log({shopRepository})
    let shops = []
    for (let i = 0; i < 10; i++) {
        shops.push(createShopFactory());
    }
    await shopRepository.save(shops)
}
