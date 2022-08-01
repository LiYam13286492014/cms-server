CREATE DATABASE cms;
USE cms;

CREATE TABLE user (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username varchar(30) COMMENT  '账号',
    password  varchar(30) COMMENT '密码' 
);


insert into user values(null,'zhangsan','123');
insert into user values(null,'lisi','123');