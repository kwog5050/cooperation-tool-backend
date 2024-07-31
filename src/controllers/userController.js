const userService = require("../services/userService");


// 회원가입
const create = (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: "요청 값 없음" });
    }

    userService.create(req.body, (err, data) => {
        if (err) {
            return res.status(500).send(data);
        }
        return res.send(data);
    })
}

// 로그인
const login = (req, res) => {
    if (!req.body) {
        return res.status(400).send({ nsg: "요청 값 없음" });
    }

    userService.login(req.body, (err, data) => {
        if (err) {
            return res.status(500).send(data);
        }

        return res.send(data);
    })
}

const tokenCheck = (req, res) => {
    if (!req.body) {
        return res.status(400).send({ msg: "요청 값 없음" });
    }

    userService.tokenCheck(req.body, (err, data) => {
        if (err) {
            return res.status(500).send(data);
        }

        return res.send(data);
    })
}

// 유저 전체 조회
const findAll = (req, res) => {
    userService.findAll((err, data) => {
        if (err) {
            return res.status(500).send(data);
        }
        return res.send(data);
    })
}

module.exports = { create, login, tokenCheck, findAll }