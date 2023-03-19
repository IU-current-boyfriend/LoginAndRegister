<template>
  <div class="login-view">
     <form-component
      :width="500"
      :height="250"
      title="Welcome to Login View"
      :username-input="true"
      :password-input="true"
      :login-btn="true"
      v-model:username="formState.username"
      v-model:password="formState.password"
    >
    </form-component>
  </div>
</template>

<script setup>
  import FormComponent from '../FormComponent';
  import FormValidator from '../../utils/FormValidator';
  import { state, validators } from './hook';
  import { useRouter } from 'vue-router';
  import UserService from '../../service';
  import Message from '../../UI/Message';
  const router = useRouter();
  const formState = FormValidator.create('.login-btn', {
    state,
    validators,
    pass: function(key, value) {
    console.log(`通过校验${ key } => ${ value }`);
    },
    noPass: function(key, msg) {
      console.log(`${ key } => ${ msg }`);
    },
    submitCallback: async function(formData) {
      console.log(formData);
      // 在这个地方，要调用API接口，完成注册功能；
      const { err_code, err_msg } = await UserService.UserLogin('/login', formData);
      handleLoginTip(err_code, err_msg);
    }
  });

  const handleLoginTip = (err_code, err_msg) => {
    switch(err_code) {
      case 0:
        Message({
          showClose: true,
          message: 'Congratulations on your successful login',
          type: 'success'
        });
        // toHomeView();
        toHomeView();
        break;
      case 10003:
        Message({
          showClose: true,
          message: err_msg,
          type: 'error'
        });
        break;
      case 10004:
        Message({
          showClose: true,
          message: err_msg,
          type: 'error'
        });
        break;
    }
  };

  const toHomeView = () => {
    setTimeout(() => {
      router.push('/');
    }, 2000);
  };
</script>

<style>

</style>