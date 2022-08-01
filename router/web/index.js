const Router = require('koa-router')
const router =new Router()

router.get('/',async cc=>{
    cc.body='网页数据'
})

router.get('/list',async cc=>{
    cc.body='网页数据表数据'
})


module.exports = router