const express = require("express");
const router = express.Router();
const user = require("../controllers/userController.js");

// 초대코드 검증
router.post("/invitationCode", user.invitationCodeCheck);

// 이메일 중복 검사
router.post("/email", user.emailOverlapCheck);

// 가입
router.post("/createUser", user.createUser);

// 조회
router.get("/getUserAll", user.getUserAll);

// 로그인
router.post("/login", user.login);

// 토큰 검증
router.post("/token", user.tokenCheck);

// 비밀번호 수정
router.post("/modifyPassword", user.modifyPassword);

// 유저 상태메시지 조회
router.post("/statusMessage", user.findStatusMessage);

exports.router = router;