const express = require("express");
const tourController = require("./../controllers/memeController");

// express.Router() to create mountable route handlers
const router = express.Router();

// Routes
router
  .route("/")
  .get(tourController.getAllMemes)
  .post(tourController.createMeme);

router
  .route("/:id")
  .get(tourController.getMeme)
  .patch(tourController.checkBody, tourController.updateMeme);

module.exports = router;
