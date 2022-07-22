const jwt = require('jsonwebtoken');
const dayjs = require('dayjs');

const User = require('../models/user');

const checkToken = async (req, res, next) => {
    const token = req.headers['authorization'];
    let tokenUser;


    if (!req.headers['authorization']) {
        return res.json({ error: 'El token necesita un header.' });
    }

    try {
        tokenUser = jwt.verify(token, 'token');
    } catch (err) {
        return res.json({ error: 'El token no es válido' });
    }

    if (dayjs().unix() > tokenUser.expDate) {
        res.json({ error: 'El token está caducado.' });
    }

    try {
        req.user = await User.getById(tokenUser.userId);
    } catch (err) {
        res.json({ error: err.message });
    }

    next();
};



module.exports = { checkToken };