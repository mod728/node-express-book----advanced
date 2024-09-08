const express = require("express")
const app = express()
app.use(express.urlencoded({ extended: true })) 
const mongoose = require("mongoose")  
const session = require("express-session") 
const routers = require("./routes") 

app.set("view engine", "ejs") 
app.use("/public", express.static("public"))

// Session
app.use(session({
    secret: "secretKey",
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 3600000},
}))

// Connecting to MongoDB
mongoose.connect("mongodb+srv://xxxxxxx:yyyyyyyy@cluster0.xycrj.mongodb.net/blogUserDatabase?retryWrites=true&w=majority&appName=Cluster0") 
    .then(() => {
        console.log("Success: Connected to MongoDB")
    })
    .catch((error) => {
        console.error("Failure: Unconnected to MongoDB")
    })

app.use(routers) 

// Page NotFound
app.get("*", (req, res) => {
    res.render("error", {message: "ページが存在しません"})
})

// Connecting to port
const port = process.env.PORT || 3000

app.listen(port, () => {        
    console.log(`Listening on ${port}`)
})