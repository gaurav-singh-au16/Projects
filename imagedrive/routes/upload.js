require("dotenv").config()
const express = require("express")
const expressUpload = require('express-fileupload')
const cloudinary = require('cloudinary').v2
const {Base64} = require('js-base64')
const router = express.Router()
const session = require("express-session")
const signupLoginRoute = require("./signupLogin")
const {UserModel} = require("../models/user")
const {cloudName, apiKey, apiSecret} = process.env

router.use(expressUpload())
router.use(express.json())

cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
})

router.use("", signupLoginRoute)

router.get("/upload", (req, res) => {
    console.log("Upload Page Started")
    if (req.session.isLoggedIn) {
        res.render("upload", globalData)
    }
    else {
        res.render("signupLogin")
    }
})

router.post("/upload", async(req, res) => {
    console.log("Uploading Images")
    const fileName = req.files.myFile.name
    try {
        
        const bas64FormattedString = Base64.encode(req.files.myFile.data)
        const uploadResult  = await cloudinary.uploader.upload(`data:${req.files.myFile.mimetype};base64,${bas64FormattedString}`)
        
        let imageURL = uploadResult.secure_url
        var _id = globalData._id
        let data = await UserModel.findByIdAndUpdate(_id, {$push: {imageURL: imageURL}})
        
        res.redirect("/dashBoard");
    
        } catch (error) {
            console.log(error)
            res.send("Error")
        }

})

module.exports = router