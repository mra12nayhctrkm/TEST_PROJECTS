import { faker } from '@faker-js/faker';
import {Shop} from "../../entities/shop.entity";

export const createShopFactory = (): Shop => {
    const shop = new Shop();
    shop.name = faker.company.name()
    return shop;
};
