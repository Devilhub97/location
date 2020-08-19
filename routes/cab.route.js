var express = require('express');
var router = express.Router();

var router = require('express').Router();

const cabController = require('../controllers/cab.controller');
var middle = require('../middleware/index')
router.post('/bookcab', middle, cabController.bookcab);
router.post('/cabdetails', [cabController.cabdetail]);
router.get('/mybooking/:_id', middle, [cabController.mybooking]);
router.get('/getcabs/:lat/:long', middle, [cabController.nearbycabs]);

module.exports = router;