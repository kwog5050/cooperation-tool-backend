const express = require("express");
const router = express.Router();

const user = require('./user').router;
const todaywork = require('./todaywork').router;

router.use(user);
router.use(todaywork);

exports.router = router;