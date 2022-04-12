const { policy_check } = require("../../middleware");
const deliveryAddressController = require("./controller");
const router = require("express").Router();

router.get(
  "/delivery-address",
  policy_check("read", "DeliveryAddress"),
  deliveryAddressController.index
);
router.post(
  "/delivery-address",
  policy_check("create", "DeliveryAddress"),
  deliveryAddressController.store
);
router.put(
  "/delivery-address/:id",
  policy_check("update", "DeliveryAddress"),
  deliveryAddressController.update
);
router.delete(
  "/delivery-address/:id",
  policy_check("delete", "DeliveryAddress"),
  deliveryAddressController.destroy
);

module.exports = router;
