// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import i18n from './i18n/i18n'
import './mixin'
// 引入ui组件
import ElementUI from 'element-ui';
//import 'element-ui/lib/theme-chalk/index.css';

import qs from 'qs';
import api from './assets/js/common.js' // 公共js
import './assets/css/common.scss' // 公共css
import './core';
import { log } from 'util';

Vue.use(ElementUI);

const axiosBaseUrl = "http://192.168.49.82:8080/jeecg-boot"; // 请求地址
/** axios 全局配置 */
axios.defaults.baseURL = axiosBaseUrl; // 默认地址
axios.defaults.headers.post['Content-Type'] = 'application/json'; // 设置请求头
axios.defaults.timeout = 30 * 1000; // 设置请求超时时间

let loadingInstance = null; // 请求动画

// 添加请求拦截器   (统一设置请求前修改参数)
axios.interceptors.request.use((config) => {
	loadingInstance = ElementUI.Loading.service({}); // 加载动画
	// 若是有做鉴权token , 就给头部带上token
	if (sessionStorage.getItem('token')) {
		// 判断是否存在token，如果存在的话，则每个http header都加上token
		config.headers.common['X-Access-Token'] = sessionStorage.getItem('token');
	}
	return config;
}, (error) => {
	Promise.reject(error);
});

// 统一设置请求不成功的方法
axios.interceptors.response.use(response => {
	setTimeout(() => {
		loadingInstance.close();
		if (response.data && !response.data.success) {
			ElementUI.Message.error({
				message: response.data.message || '请求数据异常，请稍后再试！！',
				duration: 3000,
				showClose: true
			});
		}
		// } else if (response.data && response.data.success) {
		// 	ElementUI.Message.success({
		// 		message: response.data.message || '请求成功！！',
		// 		duration: 3000,
		// 		showClose: true
		// 	});
		// }
	}, 500)
	return response.data;
}, error => {
	const errorRes = error.response.data;
	if (errorRes.message === 'Token失效，请重新登录') { // 系统长时间没操作，token失效跳转到登录页
		router.push('/');
		ElementUI.Message.error({
			message: 'Token失效，请重新登录！！',
			duration: 3000,
			showClose: true
		});
	} else {
		ElementUI.Message.error({ // 其他报错直接抛出错误，不用跳到登录页
			message: '服务器异常，请稍后再试！！',
			duration: 3000,
			showClose: true
		});
	}
	loadingInstance.close();
});
// 权限过滤
Vue.prototype.$auths = (key) => {
	const resourceCodes = sessionStorage.getItem('resourceCodes');
	return (key && resourceCodes && resourceCodes.includes(key));
};

// 全局使用
Vue.prototype.api = api;
Vue.prototype.$axios = axios;
Vue.prototype.$qs = qs;

// Date对象的toJSON方法
Date.prototype.toJSON = function () {
	return this.toString();
}

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	i18n,
	components: {
		App
	},
	template: '<App/>'
})