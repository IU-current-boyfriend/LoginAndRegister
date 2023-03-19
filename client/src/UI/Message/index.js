import { createApp } from 'vue';
import MessageComponent from './Message.vue';
function Message({
  showClose,
  message,
  type
}) {
  const myApp = createApp(MessageComponent, {
    showClose,
    message,
    type
  });
  // 初始化app
  initMyApplication(myApp);
};

function initMyApplication(app) {
  const oFragment = document.createDocumentFragment();
  const vmMessage = app.mount(oFragment);
  document.body.appendChild(oFragment);
  delayCloseMessage(vmMessage);
};

function delayCloseMessage(vm) {
  setTimeout(() => {
    vm.setShowMessage(false);
  }, 3000);
};

export default Message;