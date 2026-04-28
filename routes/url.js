// This file only defines the endpoint 
// and connects to the functions in controllers

const express = require("express");
const { handleGenerateNewShortURL, handleGetURL, handleGetAllURLs } = require("../controllers/url");

const router = express.Router();

router.post("/", handleGenerateNewShortURL);

router.get("/", handleGetAllURLs);
module.exports = router;