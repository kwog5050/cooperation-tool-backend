const crypto = require('crypto');

// 해시 처리
exports.SHA512 = (value) => {
    return crypto.createHash('sha512').update(value).digest('base64');
}