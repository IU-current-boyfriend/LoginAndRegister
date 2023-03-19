import { onMounted, reactive, watch, toRaw } from 'vue';
export default class FormValidator {
  constructor(submitBtn, {
    state,
    validators,
    pass,
    noPass,
    submitCallback
  }) {
    this.submitBtn = submitBtn;
    FormValidator.formData = FormValidator.initReactive(state);
    this.validators = validators;
    this.pass = pass;
    this.noPass = noPass;
    this.submitCallback = submitCallback;
    this.result = {};
    this.init();
  };

  // 初始化函数执行
  init() {
    // 首先解决的问题，监听到响应式数据的变化，当数据变化时，
    // 我要调用校验器去校验输入的信息，如果通过pass，我就改变验证
    // 集合中的值，如果没有通过，则调用noPass。
    this.addWatch();
    // 其次要解决的问题是submit按钮提交的事件监听，我们知道，既然要操作
    // DOM，肯定是要等到组件挂载之后才获取的到。
    onMounted(this.bindEvent.bind(this));
    // 最后我们肯定是要有一个结果集合
    this.initResultCollect();
  }

  bindEvent() {
    const oSubmitBtn = document.querySelector(this.submitBtn);
    // 点击按钮，我们要做的是什么呢？
    oSubmitBtn.addEventListener('click', this.handleSumbit.bind(this), false);
  };

  handleSumbit() {
    // 按照这个result结果集去进行提示，比如说：username是false
    // 你要找出结果集中第一个为false的属性，然后把提示信息提供给外界
    const resultArr = Object.entries(this.result);
    const validatorsFail = resultArr.find(function(item) {
      const [itemKey, itemValue] = item;
      return itemValue === false; 
    });
    // 根据key进行判断
    if (validatorsFail) {
      // 说明结果集中有验证不通过的条件
      const [key, value] = validatorsFail;
      const { rule, msg } = this.validators[key](value);
      this.noPass(key, msg); 
    } else {
      this.submitCallback(toRaw(FormValidator.formData));
    }
  };

  initResultCollect() {
    // 初始化，默认都是结果集都是false
    for (let key in FormValidator.formData) {
      this.result[key] = false;
    }
  };

  // 监听数据状态的变化，如果数据变化，那么我们就要验证数据
  addWatch() {
    // 循环遍历
    for(let key in FormValidator.formData) {
      if (FormValidator.formData.hasOwnProperty(key)) {
        watch(() => FormValidator.formData[key], (newValue, oldValue) => {
          // 二次密码需要单独判断
          if (key === 'repassword') {
            const { rule, msg } = this.validators[key](newValue, FormValidator.formData['password']);
            this.informationTip({
              key,
              rule,
              msg,
              newValue
            });
          } else {
          // 既然能够获取到文本框的值，那么我们就要去校验器中验证输入的合法性。
          const { rule, msg } = this.validators[key](newValue);
          // 处理提示问题
          this.informationTip({
            key,
            rule,
            msg,
            newValue
          });
        }
        });
      };
    };
  }

  // 统一处理提示问题
  informationTip({
    key,
    rule,
    msg,
    newValue
  }) {
    // 校验通过与未通过
    if (!rule) {
      this.noPass(key, msg);
    } else {
      this.pass(key, newValue);
      this.result[key] = true;
    }
  }

  // 处理响应式数据
  static initReactive(state) {
    return reactive(state);
  }

  static create(submitBtn, {
    state,
    validators,
    pass,
    noPass,
    submitCallback
  }) {
    new FormValidator(submitBtn, {
      state,
      validators,
      pass,
      noPass,
      submitCallback
    });
    return FormValidator.formData;
  }
}