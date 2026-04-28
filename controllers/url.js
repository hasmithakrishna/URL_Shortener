//Request Handler file. Contains all functions

const shortid = require("shortid");
const URLModel = require("../models/url");

async function handleGenerateNewShortURL(req, res) {
    const body = req.body || {};

    if (!body.url) {
        return res.status(400).json({ error: "url is required" });
    }

    let parsedURL;
    try {
        parsedURL = new URL(body.url);
    } catch (error) {
        return res.status(400).json({ error: "Invalid URL" });
    }

    const existingURL = await URLModel.findOne({
        redirectURL: parsedURL.href,
    });

    if (existingURL) {
        return res.redirect("/url");
    }

    let shortID = body.customShortId?.trim();

    if (shortID) {
        const existingShortId = await URLModel.findOne({ shortId: shortID });

        if (existingShortId) {
            return res.status(400).json({ error: "Custom short id already exists" });
        }
    } else {
        shortID = shortid();
    }

    await URLModel.create({
        shortId: shortID,
        redirectURL: parsedURL.href,
        visitHistory: [],
    });

    return res.redirect("/url");
}
async function handleGetURL(req, res) {
    const shortId = req.params.shortId;

    const entry = await URLModel.findOneAndUpdate(
        { shortId },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now(),
                },
            },
        },
        { new: true }
    );

    if (!entry) {
        return res.status(404).send("Short URL not found");
    }

    res.redirect(entry.redirectURL);
}

async function handleGetAllURLs(req, res) {
    const allUrls = await URLModel.find({});
    return res.render("home", {
        urls: allUrls,
    });
}
module.exports = {
    handleGenerateNewShortURL,
    handleGetURL,
    handleGetAllURLs,
};