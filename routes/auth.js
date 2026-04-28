const express = require("express");

const {
    handleUserSignup,
    handleUserLogin,
    handleUserLogout,
} = require("../controllers/auth");

const router = express.Router();

// Show signup page
router.get("/signup", (req, res) => {
    res.render("signup", { error: null });
});

// Show login page
router.get("/login", (req, res) => {
    res.render("login", { error: null });
});

// Handle signup
router.post("/signup", handleUserSignup);

// Handle login
router.post("/login", handleUserLogin);

// Handle logout
router.get("/logout", handleUserLogout);

module.exports = router;