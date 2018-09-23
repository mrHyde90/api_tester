const express = require("express");
const router = express.Router();
const PredictController = require("../controllers/predict");

//GET INSTRUMENT
router.get("/time", PredictController.predict_time);
router.get("/tractoplanas", PredictController.predict_tractoplanas);

module.exports = router;
