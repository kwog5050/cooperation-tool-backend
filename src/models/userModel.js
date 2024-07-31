const sql = require("../dbConfig");

// 회원가입
const create = async (userData, callback) => {
    sql.query(
        "INSERT INTO user (email, password, name, token) VALUES (?, ?, ?, ?)",
        [
            userData.email,
            userData.password,
            userData.name,
            null
        ],
        (err, res) => {
            if (err) return callback(err, null);
            return callback(null, res);
        }
    )
}

// 로그인
const login = async (userData, callback) => {
    sql.query(
        "SELECT email, password FROM user WHERE email = ?",
        [
            userData.email,
            userData.password
        ],
        (err, res) => {
            if (err) return callback(err, null);
            if (res.length) {
                // 로그인 성공
                if (res[0].password === userData.password) {
                    return callback(null, "success");

                    //로그인 실패(비밀번호 틀림)
                } else {
                    return callback(null, "fail");
                }
            }
            return callback({ kind: "not_found" }, null);
        }
    )
}

// 토큰생성
const createToken = async (userData, token, callback) => {
    sql.query(
        "UPDATE user SET token = ? WHERE email = ?",
        [token, userData.email],
        (err, res) => {
            if (err) return callback(err, null);
            return callback(null, "success");
        }
    )
}

// 유저 전체 조회
const findAll = async (callback) => {
    sql.query(
        "SELECT * FROM user",
        (err, res) => {
            if (err) return callback(err, null);
            return callback(null, res);
        }
    )
}

module.exports = { create, login, createToken, findAll };