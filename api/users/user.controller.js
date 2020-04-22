require('dotenv').config();
const {
    createItem,
    getItems,
    getItemById,
    updateItem,
    deleteItem,
    getItemByEmail
} = require('./user.service');

const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const { sign } = require('jsonwebtoken');
module.exports = {
    // REQUEST TO CREATE NEW USER
    createUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        createItem(body, (err, result) => {
            if(err) {
                if (err.errno == 1062) {
                    const errorEntry = err.sqlMessage.split(" ").splice(-1)[0].replace("'user.", "").replace("_UNIQUE'", "");
                    console.log(errorEntry);
                    return res.status(409).json({
                        success: false,
                        message: 'Duplicate entry',
                        errorEntry: errorEntry
                    })
                }
                return res.status(500).json({
                    success: false,
                    message: 'Database connection error'
                });
            }
            return res.status(200).json({
                success: true,
                data: result
            })
        });
    },
    // REQUEST TO GET USER BY ID
    getUserById: (req, res) => {
        const id = req.params.id;
        getItemById(id, (err, result) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!result) {
                return res.json({
                    success: false,
                    message: "Record not found"
                });
            }
            return res.json({
                success: true,
                data: result
            });
        });
    },
    // REQUEST TO GET ALL USER
    getAllUsers: (req, res) => {
        getItems((err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.json({
                success: true,
                data: results
            });
        });
    },
    // REQUEST TO UPDATE USER
    updateUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        updateItem(body, (err, result) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!result) {
                return res.json({
                    success: false,
                    message: "Update failed"
                })
            }
            return res.json({
                success: true,
                message: "Record updated successfully"
            });
        });
    },
    // REQUEST TO DELETE USER
    deleteUser: (req, res) => {
        const data = req.body;
        deleteItem(data, (err, result) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.json({
                success: true,
                message: "Record deleted successfully"
            })
        })
    },
    // REQUEST TO LOGIN
    login: (req, res) => {
        const body = req.body;
        getItemByEmail(body.email, (err, results) => {
            if (err) {
                console.log(err);
            }
            if (!results) {
                return res.json({
                    success: false,
                    message: "Invalid email or password"
                });
            }
            const result = compareSync(body.password, results.password);
            if (result) {
                results.password = undefined;
                const jsontoken = sign({ result: results }, process.env.ACCESS_TOKEN_SECRET, {
                    expiresIn: "1h"
                });
                return res.json({
                    success: true,
                    message: "Login successfully",
                    currentUser: results,
                    token: jsontoken
                });
            } else {
                return res.json({
                    success: false,
                    message: "Invalid email or password"
                })
            }
        });
    },
    // REQUEST TO LOGOUT
    logout: (req, res) => {
        return res.json({
            success: true,
            message: "Logout successfully",
            token: null
        })
    }
}