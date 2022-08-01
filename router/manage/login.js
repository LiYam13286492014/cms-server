const Router = require('koa-router')
const router = new Router()
const { returnMsg, query, queryFn } = require('../../utils')
const jwt = require('jsonwebtoken');

router.post('/', async cc => {
    console.log(cc.request.body);
    let { username, password } = cc.request.body
                
    if (username && password) {

        let sql = `SELECT * FROM user WHERE username='${username}' && password='${password}'`

        let result = await queryFn(sql)
        

        if (result.length > 0) {
            let token = jwt.sign(
                { username, password },    // 携带信息
                'wwl',          // 秘钥
                { expiresIn: '1h' }        // 有效期：1h一小时
            )
            let sql1 = `UPDATE user SET token='${token}' WHERE username='${username}'`
            
            await queryFn(sql1)
            let sql2  = `SELECT * FROM user WHERE username='${username}'`
            let result1 = await queryFn(sql2)
            cc.body = returnMsg(0, '登陆成功', result1)
        } else {
            cc.body = returnMsg(1, '登陆失败', '用户名或者密码不存在')
        }

    } else {
        let endResult = returnMsg(2, '参数错误', '用户密码不能为空')
        cc.body = endResult
    }

})


module.exports = router