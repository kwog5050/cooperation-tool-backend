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

// 이메일 중복 검사
const emailOverlapCheck = (req, callback) => {
    userModel.emailOverlapCheck(req, (err, res) => {
        if (err) return callback(err, null);

        return callback(null, res);
    })
}

// 회원가입
const createUser = (req, callback) => {
    const data = {
        name: req.name,
        email: req.email,
        password: SHA512(req.password),
        invitationCode: req.invitationCode
    }

    userModel.createUser(data, (err, res) => {
        if (err) return callback(err, null);

        return callback(null, res);
    });
}

// 로그인
const login = (req, callback) => {
    const data = {
        email: req.email,
        password: SHA512(req.password)
    }

    userModel.login(data, (err, res) => {
        if (err) return callback(err, null);

        let token = SHA512(randomString());

        if (res.result === "success") {
            userModel.createToken(data, token, (err, res) => {
                if (err) return callback(err, null);

                return callback(null, res);
            })
        } else {
            return callback(null, res);
        }

    })
}

// 토큰 검증
const tokenCheck = (req, callback) => {
    const data = {
        email: req.email,
        token: req.token
    }

    userModel.tokenCheck(data, (err, res) => {
        if (err) return callback(err, null);

        return callback(null, res);
    })
}

// 유저 전체 조회
const getUserAll = (callback) => {
    userModel.getUserAll((err, res) => {
        if (err) return callback(err, null);

        return callback(null, res);
    });
}

// 비밀번호 수정
const modifyPassword = (req, callback) => {
    const data = {
        email: req.email,
        newPassword: SHA512(req.newPassword)
    }

    userModel.modifyPassword(data, (err, res) => {
        if (err) return callback(err, null);

        return callback(null, res);
    })
}

// 상태메시지 조회
const findStatusMessage = (req, callback) => {
    userModel.findStatusMessage(req, (err, res) => {
        if (err) return callback(err, null);

        return callback(null, res);
    })
}

module.exports = { invitationCodeCheck, emailOverlapCheck, createUser, login, tokenCheck, getUserAll, modifyPassword, findStatusMessage };