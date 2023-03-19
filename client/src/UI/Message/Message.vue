<template>
  <transition name="message">
    <div 
      v-show="isShow"
      class="message-container"
    >
      <div 
        :class="['messge-info', type]"  
      > {{ message }} </div>
    </div>
  </transition>
</template>

<script setup>
  import { ref, onMounted } from 'vue';
  
  const props = defineProps({
    showClose: {
      type: Boolean,
      default: false
    },
    message: String,
    type: {
      type: String,
      defualt: 'primary'
    }
  });

  const isShow = ref(false);

  onMounted(() => {
    setShowMessage(props.showClose);
  });

  const setShowMessage = status => {
    isShow.value = status;
  };

  defineExpose({
    setShowMessage
  });

</script>

<style lang="scss" scoped>
  .message-container {
    position: absolute;
    top: 50px;
    left: 50%;
    height: 48px;
    padding: 15px;
    font-size: 14px;
    background-color: #F4F4F5;
    border-radius: 6px;
    box-sizing: border-box;
    .messge-info.primary {
      color: #303133;
    }
    .messge-info.success {
      color: #67C23a;
    }
    .messge-info.warning {
      color: #E6A23C;
    }
    .messge-info.error {
      color: #F56C6C;
    }
  }



  .message-enter-from,
  .message-leave-to {
    transform: translateY(-30px);
    opacity: 0;
  }
  .message-enter-active {
    transition: all .5s ease-out;
  }
  .message-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
  }
  

</style>
