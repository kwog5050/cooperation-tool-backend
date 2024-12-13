const todayworkModel = require("../models/todayworkModel");
const { v4: uuidv4 } = require('uuid');
const { formatDate } = require("../utils/formatDate");

// 오늘업무 작성
const createTodaywork = (req, callback) => {
    const data = {
        id: uuidv4(),
        shareId: req.shareId,
        writeId: req.writeId,
        date: req.date,
        content: req.content,
        writeTime: formatDate(),
        isShare: req.isShare
    }

    todayworkModel.createTodaywork(data, (err, res) => {
        if (err) return callback(err, null);

        return callback(null, res);
    })
}

// 오늘업무 가져오기
const getTodaywork = (req, callback) => {
    const data = {
        email: req.email
    }

    todayworkModel.getTodaywork(data, (err, res) => {
        if (err) return callback(err, null);

        const resCopy = {
            result: res.result,
            mas: res.mag,
            data: []
        };

        if (req.calendarDate) {
            // 조회 날짜 비교해서 일치하는 해당 날짜만 글만 응답
            res.data.forEach(el => {
                if (el.date === req.calendarDate) {
                    resCopy.data.push(el);
                }
            });

        } else {
            // 날짜 정보 안날라오면 타임라인에서 요청한거니 당일 작성한거 응답
            const todayDate = new Date();

            const year = todayDate.getFullYear();
            const month = String(todayDate.getMonth() + 1).padStart(2, '0');
            const day = String(todayDate.getDate()).padStart(2, '0');

            const formatDate = `${year}-${month}-${day}`;

            res.data.forEach((el, index) => {
                const writeDate = el.write_time.split(' ')[0];
                const writeTime = el.write_time.split(' ')[1];

                if (formatDate === writeDate) {
                    resCopy.data.push(el);
                    if (Number(writeTime.slice(0, 2)) > 11) {
                        resCopy.data[index].write_time = writeTime.slice(0, 5) + " PM"
                    } else {
                        resCopy.data[index].write_time = writeTime.slice(0, 5) + " AM"
                    }
                }
            });
        }

        return callback(null, resCopy);
    })
}

module.exports = { createTodaywork, getTodaywork }