const express = require("express");
const router = express.Router();
const paymentsController = require("./payments.controller");

router
  .route("/create")
  .post(paymentsController.createIntent);

router
  .route("/charge")
  .post(paymentsController.createCharge);

router
  .route("/setup-intent")
  .post(paymentsController.setupIntent);

router
  .route("/events/webhook")
  .get(paymentsController.webhook);

module.exports = router;
