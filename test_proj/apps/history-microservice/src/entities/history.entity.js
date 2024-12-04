const { EntitySchema } = require("typeorm");

const History = new EntitySchema({
    name: "History",
    tableName: "history",
    columns: {
        id: {
            type: "int",
            primary: true,
            generated: "increment",
        },
        shop_id: {
            type: "int",
            nullable: true,
        },
        plu: {
            type: "varchar",
        },
        action: {
            type: "varchar",
        },
        shelf_quantity_before: {
            type: "int",
            nullable: true,
        },
        shelf_quantity_after: {
            type: "int",
            nullable: true,
        },
        order_quantity_before: {
            type: "int",
            nullable: true,
        },
        order_quantity_after: {
            type: "int",
            nullable: true,
        },
        date: {
            type: "timestamp",
            createDate: true,
        },
    },
});

module.exports = { History };
