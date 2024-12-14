const sql = require("../dbConfig");

// 오늘업무 작성
const createTodaywork = async (req, callback) => {
    sql.query(
        "INSERT INTO todaywork (id, share_id, write_id, date, content, write_time, is_share)VALUES(?, ?, ?, ?, ?, ?, ?)",
        [req.id, req.shareId, req.writeId, req.date, req.content, req.writeTime, req.isShare],
        (err, res) => {
            if (err) return callback(err, {
                result: "error",
                msg: err.message,
                data: null
            })

            return callback(null, {
                result: "success",
                msg: "작성 완료",
                data: res
            })
        }
    )
}

// 오늘업무 가져오기
const getTodaywork = async (req, callback) => {
    sql.query(
        "SELECT * FROM todaywork WHERE write_id = ? ORDER BY write_time DESC",
        [req.email],
        (err, res) => {
            if (err) return callback(err, {
                result: "error",
                msg: err.message,
                data: null
            })

            if (res.length) {
                return callback(null, {
                    result: "success",
                    msg: "오늘업무 조회 성공",
                    data: res
                })
            } else {
                return callback(null, {
                    result: "fail",
                    msg: "오늘업무 없음",
                    data: null
                })
            }
        }
    )
}

// 오늘업무 삭제
const deleteTodaywork = async (req, callback) => {
    sql.query(
        "DELETE FROM todaywork WHERE write_id = ? AND id = ?",
        [req.writeId, req.id],
        (err, res) => {
            if (err) return callback(err, {
                result: "error",
                msg: err.message,
                data: null
            })

            if (res.affectedRows > 0) {
                return callback(null, {
                    result: "success",
                    msg: "오늘업무 삭제 성공",
                    data: res
                })
            } else {
                return callback(null, {
                    result: "fail",
                    msg: "삭제할 오늘업무 없음",
                    data: null
                })
            }
        }
    )
}

module.exports = { createTodaywork, getTodaywork, deleteTodaywork }