const UserModel = require("../../models/user") 

module.exports = (req, res) => {
    UserModel.findOne({email: req.body.email})
        .then((savedData) => {     
            if(savedData){
                // ユーザーが存在する場合の処理
                if(req.body.password === savedData.password){
                    // パスワードが正しい場合の処理
                    req.session.userId = savedData._id.toString()
                    res.redirect("/") 
                }else{
                    // パスワードが間違っている場合の処理
                    res.render("error", {
                        message: "/user/loginのエラー: パスワードが間違っています"
                    })
                }
            }else{
                // ユーザーが存在しない場合の処理
                res.render("error", {
                    message: "/user/loginのエラー: ユーザーが存在していません"
                })
            }
        })
        .catch(() => {
            res.render("error", {
                message: "/user/loginのエラー: エラーが発生しました"
            })
        })
}