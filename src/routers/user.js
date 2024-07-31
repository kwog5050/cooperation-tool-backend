const express = require("express");
const router = express.Router();
const user = require("../controllers/userController.js");

// 가입
router.post("/user", user.create);

// 조회
router.get("/user", user.findAll);

// 로그인
router.post("/login", user.login);

// 로그인 토큰체크
router.post("/token", user.tokenCheck);

exports.router = router;