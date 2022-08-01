const Router = require('koa-router')
const router = new Router()
const { returnMsg, query, queryFn, jwtFn } = require('../../utils')
const jwt = require('jsonwebtoken');
const multer = require('@koa/multer');//加载@koa/multer模块
const path = require("path")
const fs = require("fs");

let myfilename = ""

var storage = multer.diskStorage({
    //文件保存路径
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '/upload/'))
    },
    //修改文件名称
    filename: function (req, file, cb) {
        let type = file.originalname.split('.')[1]
        // logo.png -> logo.xxx.png
        myfilename = `${file.fieldname}-${Date.now().toString(16)}.${type}`
        cb(null, myfilename)
    }
})

//文件上传限制
const limits = {
    fields: 10,//非文件字段的数量
    fileSize: 2000 * 1024,//文件大小 单位 b
    files: 1//文件数量
}
const upload = multer({ storage, limits })


router.post('/', upload.single('avatar'), async cc => {
    const token = cc.request.headers.x_token

    if (jwtFn(token).length === 0) {
        cc.body = returnMsg(1, '失败', '没有token或已过期')
        return
    }
    let sql = `SELECT username FROM user WHERE token='${token}'`
    let result = await queryFn(sql)
    if (result.length > 0) {
        let sql1 = `UPDATE user SET avatar='${myfilename}' WHERE token='${token}'`
        await queryFn(sql1)
        
        
    }else{
        return
    }
    // let sql1 = `UPDATE user SET avatar='${myfilename}' WHERE token='${token}'`
    // let result1 = await queryFn(sql1)

     let sql2 =`SELECT username,token,avatar FROM user WHERE token='${token}'`
     let result1 = await queryFn(sql2)
     cc.body = result1
    // if (result1) {
    //     cc.body = returnMsg(0, '上传成功', {
    //         filePath: myfilename
    //     })
    // } else {
    //     cc.body = returnMsg(1, '上传失败,请重新上传')
    // }
    console.log(myfilename);



})


module.exports = router