/**
 * 请求拦截
 * @param {Object} http
 */
module.exports = (vm) => {
	uni.$d.http.interceptors.request.use((config) => { // 可使用async await 做异步操作
			// 初始化请求拦截器时，会执行此方法，此时data为undefined，赋予默认{}
			// 登录成功后将后端返回的token加入到缓存，之后的所有请求都会带上hc: token值，为了服务端做身份验证
			config.data = config.data || {}
			config.header = {
				...config.header,
				hc: uni && uni.getStorageSync ? uni.getStorageSync("token") : ''
			}
			// 可以在此通过vm引用vuex中的变量，具体值在vm.$store.state中
			// console.log(vm.$store.state);
			return config
		}, (config) => // 可使用async await 做异步操作
		Promise.reject(config))
}
