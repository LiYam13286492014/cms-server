const Router = require('koa-router')
const router =new Router()
const path = require('path')
const fs =require('fs')
const mime =require('mime-types')

router.get('/',async cc=>{
    let filePath = path.join(__dirname,'../../static/image/school.jpg')
    let file = fs.readFileSync(filePath)
    let mimeType = mime.lookup(file)
    cc.set('content-type',mimeType)
    cc.body=file
    // cc.body = '404'
})




module.exports = router