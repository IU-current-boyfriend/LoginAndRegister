<template>
  <div 
    class="form-component"
    :style="{ 
      'width': width + 'px',
      'height': height + 'px',
      'margin-left': -(width / 2) + 'px',
      'margin-top': -(height / 2) + 'px' 
      }"
    >
    <div class="form-header">
      <h1 class="title"> {{ title }} </h1>
    </div>
    <div class="form-body">
      <input 
        type="text"
        class="username-input"
        placeholder="please try input username"   
        v-if="usernameInput"
        :value="username"
        @input="$emit('update:username', $event.target.value)"
      />
      <input
        type="password"
        class="password-input"
        placeholder="please try input password"
        v-if="passwordInput"
        :value="password"
        @input="$emit('update:password', $event.target.value)"
      />
      <input
        type="password"
        class="repassword-input"
        placeholder="please try input repassword"
        v-if="repasswordInput"
        :value="repassword"
        @input="$emit('update:repassword', $event.target.value)"
      />
    </div>
    <div 
      class="form-btns"
      @click="handleClickBtn"
    >
      <button
        v-if="registerBtn"
        class="register-btn"
      >REGISTER</button>
      <button
        v-if="loginBtn"
        class="login-btn"
      >LOGIN</button>
    </div>
  </div>
</template>

<script setup>
  const props = defineProps({
    width: {
      type: Number,
      default: 300
    },
    height: {
      type: Number,
      default: 200
    },
    title: {
      type: String,
      default: 'welcome to Login View'
    },
    username: String,
    password: String,
    repassword: String,
    usernameInput: {
      type: Boolean,
      default: true
    },
    passwordInput: {
      type: Boolean,
      default: true
    },
    repasswordInput: {
      type: Boolean,
      default: false
    },
    registerBtn: {
      type: Boolean,
      default: false
    },
    loginBtn: {
      type: Boolean,
      default: false
    }
  });
  const emits = defineEmits(['update:username', 'update:password', 'update:repassword']);
</script>

<style lang="scss">
  .form-component {
    position: absolute;
    top: 50%;
    left: 50%;
    padding: 20px;
    border-radius: 6px;
    box-shadow: 2px 2px 2px 4px rgba(0, 0, 0, .5);
    .form-header {
      width: 100%;
      height: 40px;
      text-align: center;
      margin-bottom: 15px;
      .title {
        margin: 0;
        padding: 0;
        line-height: 40px;
        font-size: 20px;
      }
    }
    .form-body {
      .username-input,
      .password-input,
      .repassword-input {
        width: 100%;
        height: 40px;
        margin-bottom: 20px;
        padding-left: 15px;
        border: 1px solid #ccc;
        border-radius: 6px;
        box-sizing: border-box;
        outline: none;
      }
    }
    .form-btns {
      .register-btn,
      .login-btn {
        width: 100%;
        height: 40px;
        text-align: center;
        line-height: 40px;
        border: 1px solid #ccc;
        border-radius: 6px;
        outline: none;
        cursor: pointer;
      }
    }
  }
</style>