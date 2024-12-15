const express = require("express");
const router = express.Router();
const todaywork = require("../controllers/todayworkController.js");

// 오늘업무 작성
router.post("/createTodaywork", todaywork.createTodaywork);

// 오늘업무 가져오기
router.post("/getTodaywork", todaywork.getTodaywork);

// 오늘업무 삭제
router.post("/deleteTodaywork", todaywork.deleteTodaywork);

// 오늘업무 수정
router.post("/modifyTodaywork", todaywork.modifyTodaywork);

exports.router = router;