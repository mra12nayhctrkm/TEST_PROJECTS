const express = require("express");
const {HistoryService} = require("../sevices/history.service");

const router = express.Router();
const historyService = new HistoryService();

router.post("/log", async (req, res) => {
    try {
        const result = await historyService.logAction(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/", async (req, res) => {
    try {
        const result = await historyService.getHistory(req.query);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
