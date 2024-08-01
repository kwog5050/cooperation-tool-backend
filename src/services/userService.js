const userModel = require("../models/userModel");
const { SHA512 } = require("../utils/sha512");
const { randomString } = require("../utils/randomString");

// 초대코드 검증
const invitationCodeCheck = (req, callback) => {
    userModel.invitationCodeCheck(req, (err, res) => {
        if (err) return callback(err, null);

        return callback(null, res);
    })
}

// 회원가입
const create = (req, callback) => {
    const user = {
        name: req.name,
        email: req.email,
        password: SHA512(req.password),
        invitationCode: req.invitationCode
    }

    userModel.create(user, (err, res) => {
        if (err) return callback(err, null);

        return callback(null, res);
    });
}

// 로그인
const login = (req, callback) => {
    const user = {
        email: req.email,
        password: SHA512(req.password)
    }

    userModel.login(user, (err, res) => {
        if (err) return callback(err, null);

        let token = SHA512(randomString());

        userModel.createToken(user, token, (err, result) => {
            if (err) return callback(err, null);

            return callback(null, result);
        })
    })
}

// 토큰 검증
const tokenCheck = (req, callback) => {
    const user = {
        email: req.email,
        token: req.token
    }

    userModel.tokenCheck(user, (err, res) => {
        if (err) return callback(err, null);

        return callback(null, res);
    })
}

// 유저 전체 조회
const findAll = (callback) => {
    userModel.findAll((err, res) => {
        if (err) return callback(err, null);

        return callback(null, res);
    });
}

module.exports = { invitationCodeCheck, create, login, tokenCheck, findAll };