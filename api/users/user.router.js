const {
    createUser,
    getUserById,
    getAllUsers,
    updateUser,
    deleteUser,
    login,
    logout
} = require('./user.controller');

const router = require('express').Router();
const { validateToken } = require("../../auth/token_validation");

router.post("/register", createUser);
router.get("/", getAllUsers);
router.get("/:id", validateToken, getUserById);
router.put("/", validateToken, updateUser);
router.delete("/", validateToken, deleteUser);
router.post("/login", login);
router.delete("/logout", logout);

module.exports = router;