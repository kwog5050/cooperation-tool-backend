const sql = require("../dbConfig");

// 초대코드 검증
const invitationCodeCheck = async (req, callback) => {
    sql.query(
        "SELECT code FROM invitation_code WHERE code = ?",
        [req.code],
        (err, res) => {
            if (err) return callback(err, {
                result: "error",
                msg: err.message,
                data: null
            })

            if (res.length) {
                return callback(null, {
                    result: "success",
                    msg: "초대코드 있음",
                    data: null
                })
            } else {
                return callback(null, {
                    result: "notFound",
                    msg: "초대코드 없음",
                    data: null
                })
            }
        }
    )
}

// 이메일 중복 검사
const emailOverlapCheck = async (req, callback) => {
    sql.query(
        "SELECT email FROM user WHERE email = ?",
        [req.email],
        (err, res) => {
            if (err) return callback(err, {
                result: "error",
                msg: err.message,
                data: null
            })

            if (res.length) {
                if (res[0].eamil === req.eamil) {
                    return callback(null, {
                        result: "fail",
                        msg: "이메일 중복",
                        data: null
                    })
                }
            } else {
                return callback(null, {
                    result: "success",
                    msg: "이메일 중복없음",
                    data: null
                })
            }
        }
    )
}

// 회원가입
const create = async (req, callback) => {
    sql.query(
        "INSERT INTO user (name, email, password, invitation_code, token) VALUES (?, ?, ?, ?, ?)",
        [req.name, req.email, req.password, req.invitationCode, null],
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
const login = async (req, callback) => {
    sql.query(
        "SELECT email, password FROM user WHERE email = ?",
        [req.email, req.password],
        (err, res) => {
            if (err) return callback(err, {
                result: "error",
                msg: err.message,
                data: null
            });

            if (res.length) {
                if (res[0].password === req.password) {
                    // 로그인 성공
                    return callback(null, {
                        result: "success",
                        msg: "로그인 성공",
                        data: null
                    });
                } else {
                    //로그인 실패(비밀번호 틀림)
                    return callback(null, {
                        result: "fail",
                        msg: "비밀번호 틀림",
                        data: null
                    });
                }
            } else {
                // 조회 실패
                return callback(null, {
                    result: "notFound",
                    msg: "이메일 조회 실패",
                    data: null
                });
            }
        }
    )
}

// 토큰생성
const createToken = async (req, token, callback) => {
    sql.query(
        "UPDATE user SET token = ? WHERE email = ?",
        [token, req.email],
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
                    email: req.email,
                    token: token
                }
            });
        }
    )
}

// 유저 토큰 체크
const tokenCheck = async (req, callback) => {
    sql.query(
        "SELECT token FROM user WHERE email = ?",
        [req.email],
        (err, res) => {
            if (err) return callback(err, {
                result: "error",
                msg: err.message,
                data: null
            });

            if (res.length) {
                if (res[0].token === req.token) {
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
                    result: "notFound",
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

module.exports = { invitationCodeCheck, emailOverlapCheck, create, login, createToken, tokenCheck, findAll };