require('dotenv').config();
const { verify } = require("jsonwebtoken");

module.exports = {
    validateToken: (req, res, next) => {
        let token = req.get("authorization");
        if (token) {
            token = token.slice(7);
            verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
                if (err) {
                    res.json({
                        success: false,
                        message: "Invalid token."
                    });
                } else {
                    next();
                }
            });
        } else {
            res.json({
                success: false,
                message: "Access denied. Unauthorized user."
            });
        }
    }
}