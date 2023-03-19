const UserModel = require('../model/userModel');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const { config: dotEnvConfig } = require('dotenv');
dotEnvConfig();

// 从运行环境中，取出密钥
const { SECRET_KEY } = process.env; 
// console.log('process:=>', process.env);
// console.log('success: =>', SECRET_KEY);

async function RegisterController(req, res, next) {
  const { username, password } = req.body;
  // 如果请求的参数合法，那么就要检测用户是否存在
  const isExistUser = await UserModel.findUserInfo(username);
  // 如果用户已经存在，那么就要提示相应的信息
  if (isExistUser) {
    return res.status(200).json({
      err_code: 10002,
      err_msg: 'User already exists',
      data: null
    });
  }
  // 如果用户不存在，那么就要完成注册的逻辑
  try {
    // 密码需要进行加密
    const saltPwd = bcrypt.hashSync(password, 10);
    const newUserInfo = await UserModel.createUserInfo({
      username,
      password: saltPwd
    });  
    return res.status(200).json({
      err_code: 0,
      err_msg: 'create user success',
      data: newUserInfo
    })
  } catch (err) {
    console.log('internal service error: =>', err);
  }
};


async function LoginController(req, res, next) {
  /**
   * 用户名与密码校验完成通过后，我们需要查询当前用户是否存在
   */
  const { username, password } = req.body;
  // 首先要查询当前用户是否存在数据库中
  const userInfo = await UserModel.findUserInfo(username);
  // 判断当前用户信息是否存在
  if (!userInfo) {
    return res.status(200).json({
      err_code: 10003,
      err_msg: 'username is not exist',
      data: null
    });
  };
  // 如果当前信息存在的话，那么我们就要比对密码是否一致，需要进行解密
  const comparePwd = bcrypt.compareSync(password, userInfo.password);
  // 如果密码不一致的话
  if (!comparePwd) {
    return res.status(200).json({
      err_code: 10004,
      err_msg: 'username or password validator error',
      data: null
    });
  };
  // 如果密码一致的话，那么就要返回登录成功的信息，并且返回token
  const acccess_token = JWT.sign({
    // JWT设置id为String类型
    id: String(userInfo.id)
  }, SECRET_KEY, {
    expiresIn: '60s'
  });
  // 重构登录返回后的信息对象
  const responseData = {
    username: userInfo.username,
    admin: userInfo.admin,
    level: userInfo.level
  };
  // 返回登录成功后的信息
  res.status(200).json({
    err_code: 0,
    err_msg: 'user login success',
    data: responseData,
    token: acccess_token
  });
};

async function ProfileController(req, res) {
  // 获取当前用户id
  const id = req.userId;
  // 获取当前用户id信息
  const userInfo = await UserModel.getUserInfo(id);
  // 返回用户的信息
  return res.status(200).json({
    err_code: 0,
    err_msg: 'get userInfo success',
    data: userInfo
  });
};

function CheckLoginController(req, res) {
  return res.status(200).json({
    err_code: 0,
    err_msg: 'user checklogin success',
    data: null
  });
};

module.exports = {
  RegisterController,
  LoginController,
  ProfileController,
  CheckLoginController
}