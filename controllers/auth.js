const bcrypt = require("bcrypt");
const User = require("../models/user");

async function handleUserSignup(req, res) {
    const body = req.body || {};

    if (!body.name || !body.email || !body.password) {
        return res.render("signup", { error: "All fields are required" });
    }

    const existingUser = await User.findOne({ email: body.email });
    if (existingUser) {
        return res.render("signup", { error: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);

    await User.create({
        name: body.name,
        email: body.email,
        password: hashedPassword,
    });

    return res.redirect("/auth/login");
}

async function handleUserLogin(req, res) {
    const body = req.body || {};

    if (!body.email || !body.password) {
        return res.render("login", { error: "Email and password are required" });
    }

    const user = await User.findOne({ email: body.email });
    if (!user) {
        return res.render("login", { error: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(body.password, user.password);
    if (!isMatch) {
        return res.render("login", { error: "Invalid email or password" });
    }

    req.session.user = {
        _id: user._id,
        name: user.name,
        email: user.email,
    };

    return res.redirect("/url");
}

function handleUserLogout(req, res) {
    req.session.destroy(() => {
        res.redirect("/auth/login");
    });
}

module.exports = {
    handleUserSignup,
    handleUserLogin,
    handleUserLogout,
};