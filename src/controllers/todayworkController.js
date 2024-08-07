const todayworkService = require("../services/todayworkService");

// 오늘업무 작성
const createTodaywork = (req, res) => {
    if (!req.body) return res.status(400).send({ message: "요청 값 없음" });

    todayworkService.createTodaywork(req.body, (err, data) => {
        if (err) return res.status(500).send(data);

        return res.send(data);
    })
}

// 오늘업무 가져오기
const getTodaywork = (req, res) => {
    if (!req.body) return res.status(400).send({ message: "요청 값 없음" });

    todayworkService.getTodaywork(req.body, (err, data) => {
        if (err) return res.status(500).send(data);

        return res.send(data);
    })
}

module.exports = { createTodaywork, getTodaywork }