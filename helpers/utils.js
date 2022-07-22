const dayjs = require('dayjs');
const jwt = require('jsonwebtoken');




function createToken(user) {
    const obj = {
        userId: user.id,
        expDate: dayjs().add(5, 'days').unix()
    }
    return jwt.sign(obj, 'token');
}


module.exports = {
    createToken
}