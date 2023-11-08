const express = require("express")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const flash = require('connect-flash');
var methodOverride = require('method-override')

const courseRoutes = require("./routes/courseRoute")
const authRoute = require("./routes/authRoute")
const app = express();
var path = require('path');
const session = require("express-session");

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const url = 'mongodb://127.0.0.1:27017/PE_SDN301m_FA23_20231101_SE160208'
const connect = mongoose.connect(url)
connect.then((db) => {
    console.log('Connect ok!!!');
})
app.use(flash());
app.use(
    session({
        secret: 'hacker',
        resave: true,
        saveUnitialized: true
    })
)
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, 'public')));
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.errors = req.flash('errors');
    next();
});


app.use("/course", courseRoutes)
app.use("/", authRoute)


app.listen(5000, () => {
    console.log("Server is running in port 5000");
})