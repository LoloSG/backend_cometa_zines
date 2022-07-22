// const { executeQuery, executeQueryOne } = require("../helpers/utils")

const getAll = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM users',
            (err, rows) => {
                if (err) {
                    return reject(err);
                }
                resolve(rows);
            });
    });
};

const getCountUsers = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT count(*) as count FROM users', (err, rows) => {
            if (err) {
                return reject(err);
            }
            resolve(rows[0].count);
        })
    })
}

const getById = (id) => {
    return new Promise((resolve, reject) => {
        db.query('select * from users where id_user = ?', [id], (err, rows) => {
            if (err) return reject(err);
            if (rows.length === 0) return resolve(null);
            resolve(rows[0]);
        });
    });
};

const getByEmail = (email) => {
    return new Promise((resolve, reject) => {
        db.query('select * from users where email = ?', [email], (err, rows) => {
            if (err) return reject(err);
            if (rows.length === 0) return resolve(null)
            resolve(rows[0]);
        });
    });
};

const getByUser = (username, email) => {
    return new Promise((resolve, reject) => {
        db.query('select * from users where username = ? OR email = ?', [username, email], (err, rows) => {
            if (err) return reject(err);
            if (rows.length === 0) return resolve(null)
            resolve(rows[0]);
        });
    });
};

//------------------------------

const updateProfile = ({ profile_picture }, id_user) => {
    console.log(profile_picture, id_user)
    return new Promise((resolve, reject) => {
        db.query(
            'update users set profile_picture = ? where id_user = ?',
            [profile_picture, parseInt(id_user)],
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            })
    });
}

const updateHeader = ({ header_picture, id_user }) => {
    return new Promise((resolve, reject) => {
        db.query(
            'update users set header_picture = ? where id_user = ?',
            [header_picture, id_user],
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            })
    });
}

const deleteById = (id_user) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM users where id_user = ?', [id_user], (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result)
        });
    });
}





module.exports = { getAll, getById, getCountUsers, getByEmail, getByUser, updateHeader, updateProfile, deleteById }