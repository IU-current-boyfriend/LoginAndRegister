const state = {
  username: '',
  password: '',
  repassword: ''
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
  repassword: (newValue, oldValue) => ({
    rule: newValue === oldValue,
    msg: '两次密码输入的不一致.'
  })
};

export {
  state,
  validators
}