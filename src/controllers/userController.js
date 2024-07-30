const UserService = require("../services/userService");


// 회원가입
exports.create = (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: "요청 값 없음" });
    }

    UserService.create(req.body, (err, data) => {
        if (err) {
            return res.status(500).send({
                msg: err.message
            });
        }
        return res.send("가입성공");
    })
}
// 로그인
exports.login = (req, res) => {
    if(!req.body){
        return res.status(400).send({nsg: "요청 값 없음"});
    }

    UserService.login(req.body, (err, data) => {
        if(err){
            return res.send({
                result: "error",
                msg: err.message,
                data: null
            })
        }

        return res.send({
            result : "success",
            msg: "",
            data : data
        });
    })
}
// 유저 전체 조회
exports.findAll = (req, res) => {
    UserService.findAll((err, data) => {
        if (err) {
            return res.status(400).send({ nsg: err.message });
        }
        return res.send(data);
    })
}