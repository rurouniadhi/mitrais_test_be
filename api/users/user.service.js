const mySqlConnection = require("../../config/db");

module.exports = {
    // ADD NEW DATA
    createItem: (req, callBack) => {
        mySqlConnection.query(
            "INSERT into user(mobile_number, first_name, last_name, date_birth, gender, email, password) values(?,?,?,?,?,?,?)",
            [
                req.mobile_number ? req.mobile_number : null,
                req.first_name ? req.first_name : null,
                req.last_name ? req.last_name : null,
                req.date_birth ? req.date_birth : null,
                req.gender ? req.gender : null,
                req.email ? req.email : null,
                req.password ? req.password : null
            ],
            (err, result, fields) => {
                if (err) {
                    return callBack(err)
                }
                return callBack(null, result)
            }
        )
    },
    // GET ALL DATA
    getItems: callBack => {
        mySqlConnection.query(
            "SELECT * from user",
            [],
            (err, results, fields) => {
                if (err) {
                    return callBack(err);
                }
                return callBack(null, results);
            }
        );
    },
    // GET DATA BY ID
    getItemById: (id, callBack) => {
        mySqlConnection.query(
            "SELECT * from user WHERE id=?",
            [id], 
            (err, results, fields) => {
                if (err) {
                    return callBack(err);
                }
                return callBack(null, results[0]);
        });
    },
    // UPDATE DATA BY ID
    updateItem: (req, callBack) => {
        mySqlConnection.query(
            "UPDATE user SET mobile_number=?, first_name=?, last_name=?, date_birth=?, gender=?, email=?, password=? WHERE id=?",
            [
                req.mobile_number,
                req.first_name,
                req.last_name,
                req.date_birth,
                req.gender,
                req.email,
                req.password,
                req.id
            ],
            (err, results, fields) => {
                if (err) {
                    return callBack(err);
                }
                return callBack(null, results[0]);
            }
        );
    },
    // DELETE DATA BY ID
    deleteItem: (req, callBack) => {
        mySqlConnection.query(
            "DELETE from user WHERE id=?",
            [req.id],
            (err, results, fields) => {
                if (err) {
                    return callBack(err);
                }
                return callBack(null, results[0]);
            }
        )
    },
    // GET DATA BY EMAIL
    getItemByEmail: (email, callBack) => {
        mySqlConnection.query(
            "SELECT * from user WHERE email=?",
            [email],
            (err, results, fields) => {
                if (err) {
                    return callBack(err);
                }
                return callBack(null, results[0]);
            }
        )
    }
}