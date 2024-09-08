const BlogModel = require("../../models/blog")

module.exports = (req, res) => {
    BlogModel.create(req.body)
        .then(() => {
            res.redirect("/")
        })
        .catch((error) => {
            res.render("error", {message: "/blog/createのエラー"})
        })     
} 