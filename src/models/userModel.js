const sql = require("../dbConfig");

// 회원가입
const create = async (userData, callback) => {
    sql.query(
        "INSERT INTO user (email, password, name, token) VALUES (?, ?, ?, ?)",
        [userData.email, userData.password, userData.name, null],
        (err, res) => {
            if (err) return callback(err, {
                result: "error",
                msg: err.message,
                data: null
            });

            return callback(null, {
                result: "success",
                msg: "가입성공",
                data: null
            });
        }
    )
}

// 로그인
const login = async (userData, callback) => {
    sql.query(
        "SELECT email, password FROM user WHERE email = ?",
        [userData.email, userData.password],
        (err, res) => {
            if (err) return callback(err, {
                result: "error",
                msg: err.message,
                data: null
            });

            if (res.length) {
                if (res[0].password === userData.password) {
                    // 로그인 성공
                    return callback(null, {
                        result: "success",
                        msg: "로그인 성공",
                        data: null
                    });
                } else {
                    //로그인 실패(비밀번호 틀림)
                    return callback(null, {
                        result: "fall",
                        msg: "비밀번호 틀림",
                        data: null
                    });
                }
            } else {
                // 조회 실패
                return callback(null, {
                    result: "not_found",
                    msg: "이메일 조회 실패",
                    data: null
                });
            }
        }
    )
}

// 토큰생성
const createToken = async (userData, token, callback) => {
    sql.query(
        "UPDATE user SET token = ? WHERE email = ?",
        [token, userData.email],
        (err, res) => {
            if (err) return callback(err, {
                result: "error",
                msg: err.message,
                data: null
            });

            return callback(null, {
                result: "success",
                msg: null,
                data: {
                    email: userData.email,
                    token: token
                }
            });
        }
    )
}

// 유저 토큰 체크
const tokenCheck = async (userData, callback) => {
    sql.query(
        "SELECT token FROM user WHERE email = ?",
        [userData.email],
        (err, res) => {
            if (err) return callback(err, {
                result: "error",
                msg: err.message,
                data: null
            });

            if (res.length) {
                if (res[0].token === userData.token) {
                    // 토큰 일치함
                    return callback(null, {
                        result: "success",
                        msg: "토큰 일치",
                        data: null
                    });
                } else {
                    // 토큰 일치하지않음
                    return callback(null, {
                        result: "fail",
                        msg: "토큰 일치 안함",
                        data: null
                    });
                }
            } else {
                // 조회 실패 
                return callback(null, {
                    result: "not_found",
                    msg: "이메일 조회 실패",
                    data: null
                });
            }
        }
    )
}

// 유저 전체 조회
const findAll = async (callback) => {
    sql.query(
        "SELECT * FROM user",
        (err, res) => {
            if (err) return callback(err, {
                result: "error",
                msg: err.message,
                data: null
            });

            return callback(null, {
                result: "success",
                msg: null,
                data: res
            });
        }
    )
}

module.exports = { create, login, createToken, tokenCheck, findAll };