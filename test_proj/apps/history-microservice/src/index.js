const express = require("express");
const { AppDataSource } = require("./database/config/postgres.config");
const historyRoutes = require("./controllers/history.controller");

AppDataSource.initialize()
    .then(() => {
        const app = express();

        app.use(express.json());

        app.use("/api/history", historyRoutes);

        const PORT = process.env.PORT || 3001;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => console.error("Database connection error:", error));
