const UserDto = require("../dtos/userDto");
const UserModel = require("../models/userModel");
const { SHA512 } = require("../utils/sha512");
const { randomString } = require("../utils/randomString");

const UserService = {
    // 회원가입
    create: (userData, callback) => {
        const user = new UserDto({
            ...userData,
            password: SHA512(userData.password)
        });

        UserModel.create(user, (err, result) => {
            if (err) return callback(err, null);
            return callback(null, result);
        });
    },
    
    // 로그인
    login: (userData, callback) => {
        const user = new UserDto({
            ...userData,
            password: userData.password
            // password: SHA512(userData.password)
        })

        UserModel.login(user, (err, result) => {
            if(err) return callback(err, null);

            let token = SHA512(randomString());

            UserModel.createToken(user, token, (err, res) => {
                if(err) return callback(err, null);

                return callback(null, {token : token});
            })
        })
    },

    // 유저 전체 조회
    findAll: (callback) => {
        UserModel.findAll((err, result) => {
            if (err) return callback(err, null);
            return callback(null, result);
        });
    }
};

module.exports = UserService;