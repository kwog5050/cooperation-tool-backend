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
        writeTime: formatDate()
    }

    todayworkModel.createTodaywork(data, (err, res) => {
        if (err) return callback(err, null);

        return callback(null, res);
    })
}

// 오늘업무 작성
const getTodaywork = (req, callback) => {
    const data = {
        email: req.email
    }

    todayworkModel.getTodaywork(data, (err, res) => {
        if (err) return callback(err, null);

        return callback(null, res);
    })
}

// 오늘업무 삭제
const deleteTodaywork = (req, callback) => {
    const data = {
        id: req.uuid,
        email: req.email
    }

    todayworkModel.deleteTodaywork(data, (err, res) => {
        if (err) return callback(err, null);

        return callback(null, res);
    })
}

module.exports = { createTodaywork, getTodaywork, deleteTodaywork }