<template>
  <div class="register-view">
    <form-component
      :width="500"
      :height="300"
      title="Welcome to Register View"
      :username-input="true"
      :password-input="true"
      :repassword-input="true"
      :register-btn="true"
      v-model:username="formState.username"
      v-model:password="formState.password"
      v-model:repassword="formState.repassword"
    >
    </form-component> 
  </div>
</template>

<script setup>
  import FormComponent from '../FormComponent';
  import FormValidator from '../../utils/FormValidator';
  import { state, validators } from './hook';
  import UserService from '../../service';
  import Message from '../../UI/Message/index';
  import { useRouter } from 'vue-router';
  const router = useRouter();
  // 注册表单校验的逻辑
  const formState = FormValidator.create('.register-btn', {
    state,
    validators,
    pass: function(key, value) {
      console.log(`通过校验${ key } => ${ value }`);
    },
    noPass: function(key, msg) {
      console.log(`${ key } => ${ msg }`);
    },
    submitCallback: async function(formData) {
      // 在这个地方，要调用API接口，完成注册功能；
      // console.log('完成注册接口: =>', formData);
      const { err_code, err_msg } = await UserService.UserRegister('/register', formData);
      handleRegisterTip(err_code, err_msg);
    }
  });
  // 注册完成的提示信息
  function handleRegisterTip(err_code, err_msg) {
    switch(err_code) {
      case 0:
        Message({
          showClose: true,
          message: 'Congratulations on your successful Register',
          type: 'success'
        });
        reset();
        break;
      case 10001:
        Message({
          showClose: true,
          message: 'User or password verification failed',
          type: 'error'
        });
        break;
      case 10002:
        Message({
          showClose: true,
          message: 'This is User already exists',
          type: 'error'
        });
        break;
    }
  }

  /**
   * 初始化登录操作：
   */
  const reset = () => {
    for (let key in formState) {
      formState[key] = '';
    };
    //实现跳转
    setTimeout(() => {
      router.push('/login');
    }, 2000);
  }
</script>