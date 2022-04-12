const router = require("express").Router();
const { policy_check } = require("../../middleware");
const orderController = require("./controller");

router.get("/orders", policy_check("view", "Order"), orderController.index);
router.post("/orders", policy_check("create", "Order"), orderController.store);

module.exports = router;
