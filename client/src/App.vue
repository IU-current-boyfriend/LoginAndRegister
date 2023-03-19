<template>
  <router-view/>
</template>
<script setup>
 import { useRouter  } from 'vue-router';
  import Storage from './storage';
  import UserService from './service';
  import Message from './UI/Message';

  const router = useRouter();

  router.beforeEach(async (to, from) => {
    // from是从哪里离开，to是从哪里来。
    /**
     * 现在是要取消或者拦截和取消路由。
     */
    const token = Storage.getStorage('access_token');
    if (token) {
      // 如果token存在的话。应该调用checkLogin API接口。
      const { err_code, err_msg } = await UserService.CheckLoginInfo('/check_login');
      if (!err_code) {
        // 说明token信息验证通过，那么就不能够去login与register页面
        if (to.name == 'login' || to.name == 'register') {
          return {
            name: 'home'
          }
        };
      } else {
        // 说明token信息验证未通过，那么就不能够去非login和register页面
        if (to.name !== 'login' && to.name !== 'register') {
          Message({
            showClose: true,
            message: err_msg,
            type: 'error'
          });
          return {
            name: 'login'
          }
        };
        // token信息校验不通过，去Login和register页面的话，就要删除token信息。
        if (to.name == 'login' || to.name == 'register') {
          Storage.removeStorage('access_token');
        };
      }
    } else {
      // 如果token不存在的话
      if (to.name !== 'login' && to.name !== 'register') {
        return {
          name: 'login'
        }
      };
    }
  });
</script>
<style lang="scss">
</style>
