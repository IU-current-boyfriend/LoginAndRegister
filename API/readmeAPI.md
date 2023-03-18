# API接口设计
## 用户注册API设计
**
  POST Method
  需要携带的参数,例如：{
  > {
  	username: "jack"
	  password: "123456",
	  repassword: "123456"
  }
**
> http://localhost:8000/api/user/register

## 用户登录API设计
**
  POST Method
  需要携带的参数,例如：
  > {
  	username: "jack",
	  password: "123456"
  }
**
> http://localhost:8000/api/user/login

## 用户获取个人信息API设计
**
  GET Method
  no params
**
> http://localhost:8000/api/user/profile


## 用户登录验证API设计
**
  POST Method
  需要携带的参数：
  > {
    Authorization: 'Bearer xxx'
  }
**
> http://localhost:8000/api/user/check_login