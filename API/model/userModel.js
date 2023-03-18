const UserTableModel = require('../db/model/user');

/**
 * Model其实也是很好处理的，Model只需要按照Controller
 * 模型层的需求去提供公开的API接口即可。
 */
/**
 * 创建用户，用于用户登录的需求
 * @param {*} param
 */
async function createUserInfo({
  username,
  password
}) {
  await UserTableModel.create({
    username,
    password
  });
};

/**
 * 查询用户，用于注册是判断用户是否存在，以用户名的方式进行查询
 * @param {*} username 
 */
async function findUserInfo(username) {
  return await UserTableModel.findOne({
    where: {
      username: username
    }
  });
};

/**
 * 获取用户信息，用于用户成功登陆后返回相关用户信息
 * @param {*} id 
 */
async function getUserInfo(id) {
  const userInfo = await UserTableModel.findOne({
    where: {
      id: id
    }
  });
  return userInfo ? ({
    username: userInfo.username,
    admin: userInfo.admin,
    level: userInfo.level,
    createdAt: userInfo.createdAt,
    updatedAt: userInfo.updatedAt
  }) : null;
};


module.exports = {
  createUserInfo,
  findUserInfo,
  getUserInfo
}