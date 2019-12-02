import Vue from 'vue';

Vue.mixin({
  data() {
    return {
    };
  },
  computed: {
    tipsTitle() { return this.$t('message.tipsTitle') },
    tips() { return this.$t('message.tips') },
    okBtn() { return this.$t('message.okBtn') },
    cancelBtn() { return this.$t('message.cancelBtn') },
    cancelledTips() { return this.$t('message.cancelledTips') }
  },
  created() {
  },
  // 路由渲染前动作
  beforeRouteLeave(to, from, next) {
    // 判断是否有token，验证是否已登录
    if (sessionStorage.getItem('token')) {

      if (to.path === '/index') { // 由于白名单没有包含/index,但是进入系统必须通过/index,所以遇到index在已登录后放行
        return next();
      } else if (sessionStorage.getItem('resourceCodes').includes(to.path)) { // // 白名单放行
        return next();
      } else { // 黑名单禁止并给出提示
        ElementUI.Message.error({
          message: '您没有权限访问',
          duration: 3000,
          showClose: true
        });
      }

    } else { // 没有token，直接跳到登录页
      if (to.path === '/') {
        next();
      } else {
        ElementUI.Message.error({
          message: '您还没登陆',
          duration: 3000,
          showClose: true
        });
        next({ path: '/' });
      }
    }
    const pathName = window.location.origin + window.location.pathname; // 项目路径地址
    //判断版本是否更新(打包时执行)
    if (process.env.NODE_ENV !== 'development') { // 发布环境
      $.ajax({
        url: pathName + 'static/version.json?_=' + Math.random(), //json文件位置
        type: "GET",
        dataType: "json",
        success: function (data) {
          if (process.env.VERSION !== data.version) {
            Vue.prototype.$alert('系统版本有更新，点击确定加载最新，或按【CTRL + F5】！', '系统提示', {
              type: 'warning',
              showClose: false,
              callback(action, instance) {
                window.location.reload(true); // 强制刷新
              }
            });
            return;
          }
          next();
        },
        error: function (err) {
          next();
        }
      });
    }
  },
});