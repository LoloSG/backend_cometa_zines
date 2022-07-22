
const getByEmail = (email) => {
    return new Promise((resolve, reject) => {
        db.query('select * from users where email = ?', [email], (err, rows) => {
            if (err) return reject(err);
            if (rows.length === 0) return resolve(null)
            resolve(rows[0]);
        });
    });
};


//------------------------------

const create = ({ name, surname, username, email, password }) => {
    return new Promise((resolve, reject) => {
        db.query('insert into users (name, surname, username, email, password) values (?, ?, ?, ?, ?)', [name, surname, username, email, password],
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
    });
};


module.exports = { create, getByEmail }