const express = require("express")
const app = express()
app.use(express.urlencoded({ extended: true }))
const mongoose = require("mongoose") 

app.set("view engine", "ejs") 
app.use("/public", express.static("public")) 

// Connecting to MongoDB
mongoose.connect("mongodb+srv://xxxxxxx:yyyyyyyy@cluster0.xycrj.mongodb.net/blogUserDatabase?retryWrites=true&w=majority&appName=Cluster0") 
    .then(() => {
        console.log("Success: Connected to MongoDB")
    })
    .catch((error) => {
        console.error("Failure: Unconnected to MongoDB")
    })

// Defining Schema and Model
const Schema = mongoose.Schema

const BlogSchema = new Schema({
    title: String,      
    summary: String,    
    image: String,      
    textBody: String,   
})

const BlogModel = mongoose.model("Blog", BlogSchema)

// ブログ関係機能
// Create a blog
app.get("/blog/create", (req, res) => {
    res.render("blogCreate") 
})   

app.post("/blog/create", (req, res) => {
    console.log("reqの中身", req.body) 
    BlogModel.create(req.body) 
        .then(() => {
            console.log("データの書き込みが成功しました")
            res.send("ブログデータの投稿が成功しました") 
        })
        .catch((error) => {
            console.log("データの書き込みが失敗しました")
            res.send("ブログデータの投稿が失敗しました") 
        })
})     

// Read All blogs
app.get("/", async(req, res) => {
    const allBlogs = await BlogModel.find() 
    console.log("allBlogの中身：", allBlogs)
    res.render("index", {allBlogs}) 
}) 

// Read Single blog
app.get("/blog/:id", async(req, res) => {
    const singleBlog = await BlogModel.findById(req.params.id) 
    console.log("singleBlogの中身：", singleBlog) 
    res.render("blogRead", {singleBlog})
})   

// Update blog
app.get("/blog/update/:id", async(req, res) => {
    const singleBlog = await BlogModel.findById(req.params.id)  
    console.log("singleBlogの中身：", singleBlog) 
    res.render("blogUpdate", {singleBlog}) 
})  

app.post("/blog/update/:id", (req, res) => { 
    BlogModel.updateOne({_id: req.params.id}, req.body)
        .then(() => {
            console.log("データの編集が成功しました")
            res.send("ブログデータの編集が成功しました")
        })
        .catch((error) => {
            console.log("データの編集が失敗しました")
            res.send("ブログデータの編集が失敗しました")
        })
})

// Delete blog
app.get("/blog/delete/:id", async(req, res) => {
    const singleBlog = await BlogModel.findById(req.params.id)  
    console.log("singleBlogの中身：", singleBlog) 
    res.render("blogDelete", {singleBlog}) 
})

app.post("/blog/delete/:id", (req, res) => {
    BlogModel.deleteOne({_id: req.params.id})
        .then(() => {
            console.log("データの削除が成功しました")
            res.send("ブログデータの削除が成功しました")
        })
        .catch((error) => {
            console.log("データの削除が失敗しました")
            res.send("ブログデータの削除が失敗しました")
        })
})

// Connecting to port
app.listen(3000, () => {
    console.log("Listening on localhost port 3000")
})