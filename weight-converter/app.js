const express = require("express")
const app = express()
const exphbs  = require('express-handlebars');
const homePageRoute = require("./routes/homePage")

app.engine('.hbs', exphbs({
    extname: '.hbs',
    defaultLayout:false
}));
app.set('view engine', '.hbs');

app.use(express.static("style"))
app.use(express.static("script"))
app.use("", homePageRoute)

app.listen(process.env.PORT || 3000, () => {
    console.log("Server Started @ 3000")
})