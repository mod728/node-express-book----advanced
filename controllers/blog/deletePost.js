const BlogModel = require("../../models/blog")

module.exports = (req, res) => {
    BlogModel.deleteOne({_id: req.params.id})
        .then(() => {
            res.redirect("/")
        })
        .catch((error) => {
            res.render("error", {message: "/blog/deleteのエラー"})
        })
}  