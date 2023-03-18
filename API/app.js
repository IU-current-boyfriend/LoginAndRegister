const express = require('express');
const router = require('./router');

const app = express();

/**
 * 设置router路由中间件
 */
app.use(router);

/**
 * 跨域
 */
app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST');
  res.header('Access-Control-Allow-Headers', 'Content-type, Authorization');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});

app.listen(8000, () => {
  console.log('listen 8000 port...');
});