import {
  httpPost,
  httpGet
} from '../libs';

async function UserLogin(url, personInfo) {
  return await httpPost(url, personInfo);
};

async function UserRegister(url, personInfo) {
  return await httpPost(url, personInfo);
};

async function GetUserInfo(url) {
  return await httpGet(url);
};

async function CheckLoginInfo(url) {
  return await httpPost(url);
};


export default {
  UserLogin,
  UserRegister,
  GetUserInfo,
  CheckLoginInfo
}