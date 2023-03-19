const JWT = require('jsonwebtoken');
const { config: dotEnvConfig } = require('dotenv');
dotEnvConfig();
// 取出密钥
const { SECRET_KEY } = process.env;
function checkTokenMiddleWare(req, res, next) {
  // 首先要从请求头中获取token信息
  const acccess_token = req.headers.authorization.split(' ')[1];
  // 如果token信息不存在的话，那么我们就要返回响应的提示信息
  if (!acccess_token) {
    return res.status(200).json({
      err_code: 10005,
      err_msg: 'Missing token information',
      data: null
    });
  };
  // 如果token信息存在的话，那么我们就要解密token，从token中把用户的id值拿出来。
  try {
    const token = JWT.verify(acccess_token, SECRET_KEY);
    // 如果token解密之后，不存在token的话，那么就要返回错误提示
    if (!token) {
      return res.status(200).json({
        err_code: 10006,
        err_msg: 'Token verification failed',
        data: null
      });
    };
    // 如果token校验通过的话，执行下一个中间件
    // 主要要让下一个中间件获取到当前用户的id值
    req.userId = token.id;
    next();
  } catch (error) {
    return res.status(200).json({
      err_code: 10007,
      err_msg: error.message,
      data: null
    });
  }
};

function formatNameAndPwdWare(req, res, next) {
  // 首先要从请求体中获取传递的参数信息
  const { username, password } = req.body;
  // 对username，password参数的合法性进行校验
  if (username.length < 6 && password.length < 6) {
    return res.status(200).json({
      err_code: 10001,
      err_msg: 'Illegal username and password',
      data: null
    });
  } else {
    next();
  }
};

module.exports = {
  checkTokenMiddleWare,
  formatNameAndPwdWare
}