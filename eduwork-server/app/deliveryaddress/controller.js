const { subject } = require("@casl/ability");
const { policy_check } = require("../../middleware");
const { policyFor } = require("../../utils");
const DeiveryAddress = require("./model");

const store = async (req, res, next) => {
  try {
    let payload = req.body;
    let user = req.user;
    let address = new DeiveryAddress({ ...payload, user: user._id });
    await address.save();
    return res.json(address);
  } catch {
    if (err && err.name === "ValidationError") {
      return res.json({
        error: 1,
        message: err.message,
        fields: err.errors,
      });
    }
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    let { _id, ...payload } = req.body;
    let { id } = req.params;
    let address = await DeiveryAddress.findById(id);
    let subjectAddress = subject("DeliveryAddress", {
      ...address,
      user_id: address.user,
    });
    let policy = policyFor(req.user);
    if (!policy.can("update", subjectAddress)) {
      return res.json({
        error: 1,
        message: "You don't have permission to update this address",
      });
    }

    address = await DeiveryAddress.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    });
    return res.json(address);
  } catch (err) {
    if (err && err.name === "ValidationError") {
      return res.json({
        error: 1,
        message: err.message,
        fields: err.errors,
      });
    }
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    let { id } = req.params;
    let address = await DeiveryAddress.findById(id);
    let policy = policyFor(req.user);
    let subjectAddress = subject("DeliveryAddress", {
      ...address,
      user_id: address.user,
    });
    if (!policy.can("delete", subjectAddress)) {
      return res.json({
        error: 1,
        message: "You don't have permission to delete this address",
      });
    }
    address = await DeiveryAddress.findByIdAndDelete(id);
    // return res.json({
    // error: 0,
    // message: "Address deleted successfully",
    // });
    res.json(address);
  } catch (err) {
    if (err && err.name === "ValidationError") {
      return res.json({
        error: 1,
        message: err.message,
        fields: err.errors,
      });
    }
    next(err);
  }
};

const index = async (req, res, next) => {
  try {
    let { skip = 0, limit = 10 } = req.query;
    let count = await DeiveryAddress.find({
      user: req.user._id,
    }).countDocuments();
    let address = await DeiveryAddress.find({ user: req.user._id })
      .skip(parseInt(skip))
      .limit(parseInt(limit))
      .sort("-createdAt");
    return res.json({ data: address, count });
  } catch (err) {
    if (err && err.name === "ValidationError") {
      return res.json({
        error: 1,
        message: err.message,
        fields: err.errors,
      });
    }
    next(err);
  }
};

module.exports = {
  store,
  update,
  destroy,
  index,
};
