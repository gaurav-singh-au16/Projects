require("dotenv").config()
const express = require("express")
const app = express()
const mongoose = require('mongoose')
const homePageRoute = require("./routes/users")
const exphbs  = require('express-handlebars')
const signupLoginRoute = require("./routes/signupLogin")
const uploadRoute = require("./routes/upload")
const {DATABASE} = process.env

app.engine('.hbs', exphbs({
    extname: '.hbs',
    defaultLayout: false
}));
app.set('view engine', '.hbs')


mongoose.connect(DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}, (err) => {
    if (err) throw err
    console.log('DataBase Connected')
})

app.use(express.static("style"))
app.use(express.static("script"))
app.use(express.static("assets"))

app.use(express.urlencoded({extended:false}))
app.use("", homePageRoute)
app.use("", signupLoginRoute)
app.use("", uploadRoute)

app.listen(process.env.PORT || 3000, () => {
    console.log("Server Started @ 3000")
})