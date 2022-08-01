const Koa =require("koa2")
const cors =require('koa2-cors')
const app = new Koa()
const Router = require('koa-router')
const manage =require('./router/manage')
const web =require('./router/manage')
const nomatch = require('./router/nomantch')

const router =new Router()
const path =require('path')
const static =require('koa-static')
const bodyParser = require('koa-bodyparser')

const{host,port,query} =require("./utils")



router.get('/',async (cc)=>{
    let data = await new Promise ((resolve,reject)=>{
        let sql  = `SELECT * FROM user`
        query(sql,(err,data)=>{
            if(err) reject(err)
            resolve(data)
        })
    })
    cc.body = data
})

// router.get('/list',async (cc)=>{
//     cc.body = '列表数据'
// })

router.use('/manage',manage.routes(),router.allowedMethods())
router.use('/web',web.routes(),router.allowedMethods())

router.use('/404',nomatch.routes(),router.allowedMethods())


// router.redirect('/','/manage')

app.use(async (cc,next)=>{
    await next()

    if(parseInt(cc.status) === 404){
        cc.response.redirect('/404')
    }
})
app.use(cors())
app.use(bodyParser())
app.use(router.routes(),router.allowedMethods())
app.use(static(path.join(__dirname,'/router/manage/upload')))
app.use(static(path.join(__dirname,'/static'))) //http://127.0.0.1:9000/image/school.jpg


app.listen(port,()=>{
    console.log(`at ${host}:${port}`);
})