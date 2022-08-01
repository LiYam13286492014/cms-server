const Router = require('koa-router')
const router = new Router()
const { returnMsg, query, queryFn, jwtFn } = require('../../utils')
const jwt = require('jsonwebtoken');





router.get('/', async cc => {

    const token = cc.request.headers.x_token
    console.log(jwt.verify(token, 'wwl'));
    //  let result1 =jwt.verify(token,'wwl')
    if (jwtFn(token).length === 0) {
        cc.body = returnMsg(1, '失败', '没有token或已过期')
        return
    } else {
        let sql = `SELECT username,token,avatar FROM user WHERE token='${token}'`
        let result = await queryFn(sql)
        cc.body = returnMsg(0, '修改成功', result)
    }


    // try{
    //     jwt.verify(token,'wwl')
    //     console.log(jwt.verify(token,'wwl'));
    //  }catch(err){


    //     cc.body = 1
    //     return
    //  }





})


router.post('/', async cc => {
    const token = cc.request.headers.x_token
    const { username, password } = cc.request.body
    let sql2 = `SELECT username,password FROM user WHERE token='${token}'`
    let result1 = await queryFn(sql2)

    if (jwtFn(token).length === 0) {
        cc.body = returnMsg(1, '失败', '没有token或已过期')
        return
    } else {
        let sql = `UPDATE user SET username='${username || result1[0].username}',password='${password || result1[0].password}' WHERE token='${token}'`
        await queryFn(sql)
        let sql1 = `SELECT username,token,avatar FROM user WHERE token='${token}'`
        let result = await queryFn(sql1)
        cc.body = result
    }


})

module.exports = router