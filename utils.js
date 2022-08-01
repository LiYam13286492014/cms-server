const jwt = require('jsonwebtoken');

const mysql = require("mysql");
let host ="http://127.0.0.1";
let port = 9000

const pool = mysql.createPool({
    host: 'localhost',
    port:'3306',
    user: 'root',
    password: '123456',
    database: 'cms'
    
})

const query =(sql,callback)=>{
    pool.getConnection((err,connection)=>{
        connection.query(sql,(err,rows)=>{
            callback(err,rows)
            connection.release()
        })
    })
}


const returnMsg = (errCode,message,data)=>{
        return {
            errCode:errCode|| 0,
            message:message || "",
            data : data || {}
        }
}

const queryFn = (sql)=>{
    return new Promise ((resolve,reject)=>{
        query(sql,(err,data)=>{
            if(err) reject(err);
            resolve(data)
        })
    })
}

const jwtFn=(token)=>{
    
    try{
        jwt.verify(token,'wwl')
        console.log(jwt.verify(t_value,'wwl'));
     }catch(err){
       

        return false
     }
}

module.exports ={
    host,port,query,returnMsg,queryFn,jwtFn
}