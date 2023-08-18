const express = require('express');
const BikeController = require('../controllers/BikeController');
const isAuth = require('../middlewares/isAuth');

const router = express.Router();

router.get('/', BikeController.getAllBikes);

router.get('/notDeleted', BikeController.getBikeNotDeleted);

router.get('/:id', BikeController.getBikeById);

router.post("/", isAuth, BikeController.createBike);

router.patch("/:id", isAuth, BikeController.updateBikeById);

router.delete("/:id", isAuth, BikeController.deleteBikeById);

router.get('/dock/:dock', BikeController.getBikesByDock);

module.exports = router;