const express = require('express');
const router = express.Router();
const trains = require('../controllers/trains');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validateTrain } = require('../middleware');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

const Train = require('../models/train');

router.route('/')
    .get(catchAsync(trains.index))
    .post(isLoggedIn, upload.array('image'), validateTrain, catchAsync(trains.createTrain))


router.get('/new', isLoggedIn, trains.renderNewForm)

router.route('/:id')
    .get(catchAsync(trains.showTrain))
    .put(isLoggedIn, isAuthor, upload.array('image'), validateTrain, catchAsync(trains.updateTrain))
    .delete(isLoggedIn, isAuthor, catchAsync(trains.deleteTrain));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(trains.renderEditForm))



module.exports = router;