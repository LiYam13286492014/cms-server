const Router = require('koa-router')
const router =new Router()
const {returnMsg,query,queryFn} = require('../../utils')
router.post('/',async cc=>{
    console.log(cc.request.body);
    let {username,password} = cc.request.body
    if(username && password){
        let sql = `SELECT * FROM user WHERE username='${username}'`
        let result = await queryFn(sql) /* new Promise ((resolve,reject)=>{
            let sql = `SELECT * FROM user WHERE username='${username}'`
            query(sql,(err,data)=>{
                if(err) reject(err);
                resolve(data)
            })
        }) */

        if(result.length>0){
            cc.body=returnMsg(0,'失败','用户已注册')
        }else{
            
            let sql1 = `INSERT INTO user  VALUES(null,'${username}','${password}',null,'avatar.jpg',1)`
           let result1 =  await queryFn(sql1)
            cc.body=returnMsg(1,'成功',result1)
        }

        

    }else{
        cc.body=returnMsg(0,'失败','参数错误')
    }
    
})


module.exports = router