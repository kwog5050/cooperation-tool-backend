const UserDto = require("../dtos/userDto");
const userModel = require("../models/userModel");
const { SHA512 } = require("../utils/sha512");
const { randomString } = require("../utils/randomString");
const TokenDto = require("../dtos/tokenDto");


// 회원가입
const create = (userData, callback) => {
    const user = new UserDto({
        ...userData,
        password: SHA512(userData.password)
    });

    userModel.create(user, (err, result) => {
        if (err) return callback(err, null);
        return callback(null, result);
    });
}

// 로그인
const login = (userData, callback) => {
    const user = new UserDto({
        ...userData,
        password: userData.password
        // password: SHA512(userData.password)
    })

    userModel.login(user, (err, result) => {
        if (err) return callback(err, null);

        let token = SHA512(randomString());

        userModel.createToken(user, token, (err, res) => {
            if (err) return callback(err, null);

            return callback(null, res);
        })
    })
}

// 유저 토큰 체크
const tokenCheck = (userData, callback) => {
    const user = new TokenDto(userData);

    userModel.tokenCheck(user, (err, result) => {
        if (err) return callback(err, null);

        return callback(null, result);
    })
}

// 유저 전체 조회
const findAll = (callback) => {
    userModel.findAll((err, result) => {
        if (err) return callback(err, null);
        return callback(null, result);
    });
}

module.exports = { create, login, tokenCheck, findAll };