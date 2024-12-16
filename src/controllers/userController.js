const userService = require("../services/userService");


// 초대코드 검증
const invitationCodeCheck = (req, res) => {
    if (!req.body) return res.status(400).send({ message: "요청 값 없음" });

    userService.invitationCodeCheck(req.body, (err, data) => {
        if (err) return res.send(data);

        return res.send(data);
    })
}

// 이메일 중복 검사
const emailOverlapCheck = (req, res) => {
    if (!req.body) return res.status(400).send({ message: "요청 값 없음" });

    userService.emailOverlapCheck(req.body, (err, data) => {
        if (err) return res.send(data);

        return res.send(data);
    })
}

// 회원가입
const createUser = (req, res) => {
    if (!req.body) return res.status(400).send({ message: "요청 값 없음" });

    userService.createUser(req.body, (err, data) => {
        if (err) return res.send(data);

        return res.send(data);
    })
}

// 로그인
const login = (req, res) => {
    if (!req.body) return res.status(400).send({ nsg: "요청 값 없음" });

    userService.login(req.body, (err, data) => {
        if (err) return res.send(data);

        return res.send(data);
    })
}

// 토큰 검증
const tokenCheck = (req, res) => {
    if (!req.body) return res.status(400).send({ msg: "요청 값 없음" });

    userService.tokenCheck(req.body, (err, data) => {
        if (err) return res.send(data);

        return res.send(data);
    })
}

// 유저 조회
const getUser = (req, res) => {
    if (!req.body) return res.status(400).send({ msg: "요청 값 없음" });

    userService.getUser(req.body, (err, data) => {
        if (err) return res.send(data);

        return res.send(data);
    })
}

// 유저 전체 조회
const getUserAll = (req, res) => {
    userService.getUserAll((err, data) => {
        if (err) return res.send(data);

        return res.send(data);
    })
}

// 로그인
const modifyPassword = (req, res) => {
    if (!req.body) return res.status(400).send({ nsg: "요청 값 없음" });

    userService.modifyPassword(req.body, (err, data) => {
        if (err) return res.send(data);

        return res.send(data);
    })
}

// 유저 상태메시지 조회
const findStatusMessage = (req, res) => {
    userService.findStatusMessage(req.body, (err, data) => {
        if (err) {
            return res.send(data);
        }
        return res.send(data);
    })
}

module.exports = { invitationCodeCheck, emailOverlapCheck, createUser, login, tokenCheck, getUser, getUserAll, modifyPassword, findStatusMessage }