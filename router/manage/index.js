const Router = require('koa-router')
const router =new Router()
const login  = require('./login')
const register = require('./register')
const info = require('./info')
const upload = require('./upload')




router.get('/',async cc=>{
    cc.body='管理数据'
})


router.use('/login',login.routes(),router.allowedMethods())
router.use('/register',register.routes(),router.allowedMethods())
router.use('/info',info.routes(),router.allowedMethods())
router.use('/upload',upload.routes(),router.allowedMethods())



module.exports = router