const state = {
  username: '',
  password: ''
};

const validators = {
  username: value => ({
    rule: value.length > 6,
    msg: '用户名长度由6位组成.'
  }),
  password: value => ({
    rule: value.length > 6,
    msg: '密码长度由6位组成.'
  }),
};

export {
  state,
  validators
}