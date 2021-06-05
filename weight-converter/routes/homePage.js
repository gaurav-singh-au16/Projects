const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
    console.log("App Started")
    res.render("homePage")
})

module.exports = router
