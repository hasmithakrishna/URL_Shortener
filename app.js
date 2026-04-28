
const express = require("express")
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const urlRoute = require("./routes/url");
const { restrictToLoggedInUserOnly } = require("./middlewares/auth");
const { handleGetURL } = require("./controllers/url");
const session = require("express-session");
const authRoute = require("./routes/auth");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("MongoDB connected"))
.catch(err => console.log("Mongo error:", err));

app.use(express.json());


app.get("/", (req,res) => {
    res.send("Server is running");
});

// middlewares


app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.urlencoded({ extended: false }));

//Session Middleware
app.use(
    session({
        secret: "mysecretkey",
        resave: false,
        saveUninitialized: false,
    })
);

app.use("/auth", authRoute);

app.use("/url", restrictToLoggedInUserOnly,urlRoute);

app.get("/:shortId", handleGetURL);



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})