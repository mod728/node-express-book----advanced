const BlogModel = require("../../models/blog")

module.exports = (req, res) => {
    BlogModel.updateOne({_id: req.params.id}, req.body)
        .then(() => {
            res.redirect("/")
        })
        .catch((error) => {
            res.render("error", {message: "/blog/updateのエラー"})
        })
}   