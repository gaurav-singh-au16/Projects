const express = require("express")
const router = express.Router()
const session = require("express-session")
const bcrypt = require("bcrypt")
const {UserModel} = require("../models/user")

router.use(session({
    secret: "imageDrive",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 9000000
    }
}))
router.globalData = {}

router.get("/signupLogin", (req, res) => {
    console.log("Signup/Login Page Started")
    res.render("signupLogin")
})
router.get("/logout", (req, res) => {
    console.log("User Logout")
    req.session.destroy()
    res.render("homePage")
})
router.get("/about", (req, res) => {
    console.log("About Page")
    req.session.destroy()
    res.render("about")
})
router.get("/dashBoard", async(req, res) => {
    console.log("Signup/Login Page Started")
    if (req.session.isLoggedIn) {
        var _id = globalData._id
        var updateData = await UserModel.findById(_id)
        res.render("dashBoard", updateData)
    }
    else {
        res.render("signupLogin")
    }
})

router.post("/Login", async(req, res) => {
    console.log("Login POST REQUEST Started")
    const { email, password } = req.body

    var users = await UserModel.findOne({ email })
    if (users == null){
        let err = {
            error: "Email Not Exist"
        }
        res.render("signupLogin", err)
    }
    const isMatching = await bcrypt.compare(password, users.password)

    
    if (users != null && isMatching == true) {

        req.session.isLoggedIn = true

        globalData = users
        res.redirect("/dashBoard")

    }
    else {
        let err = {
            error: "Incorrect Password!!!"
        }
        res.render("signupLogin", err)
    }
})

router.post("/signup", async(req, res) => {
    console.log("signup POST REQUEST Started")
    const { name, email, mobile, password } = req.body
    console.log(req.body)
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash((req.body).password, salt)
    signUpData = {
        name,
        email,
        mobile,
        password: hashedPassword
    }
    globalData = signUpData
    try {

        const newUserDoc = new UserModel(signUpData)

        const savedUserDoc = await newUserDoc.save()

        req.session.isLoggedIn = true
        res.redirect("/dashBoard")

    } catch (error) {
        console.log(error)
        res.send(`Internal Error Occurred: ${error._message}`)
    }
})


module.exports = router
