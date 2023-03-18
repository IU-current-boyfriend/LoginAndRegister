const {
  Router, json
} = require('express');


/**
 * 获取对应API的控制器，MVC设计模式
 */
const {
  RegisterController,
  LoginController,
  ProfileController,
  CheckLoginController
} = require('../controller');

/**
 * 获取对应的中间件 
 * 
 */
const {
  checkTokenMiddleWare,
  formatNameAndPwdWare
} = require('../middleware');


/**
 * 获取请求参数的解析器
 * 
 */
const bodyPaser = require('body-parser');

const jsonParser = bodyPaser.json();

const router = new Router();



/**
 * 根据API接口设计，定义API
 * 
 */

// 用户注册的API接口
router.post('/api/user/register', jsonParser, formatNameAndPwdWare, RegisterController);
// 用户登录的API接口
router.post('/api/user/login', jsonParser, formatNameAndPwdWare, LoginController);
// 用户获取个人信息的接口
router.get('/api/user/profile', jsonParser, checkTokenMiddleWare, ProfileController);
// 校验用户登录的API接口
router.post('/api/user/check_login', jsonParser, checkTokenMiddleWare, CheckLoginController);

module.exports = router;