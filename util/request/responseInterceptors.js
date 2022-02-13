/**
 * 响应拦截
 * @param {Object} http 
 */
module.exports = (vm) => {
	uni.$d.http.interceptors.response.use((response) => {
		/* 对响应成功做点什么 可使用async await 做异步操作*/
		const data = response.data
		// 自定义参数
		const custom = response.config?.custom
		if (data.code !== 200) { // 服务端返回的状态码不等于200，则reject()
			// 如果没有显式定义custom的toast参数为false的话，默认对报错进行toast弹出提示
			if (custom.toast !== false) {
				uni.$d.toast(data.message)
			}
			// 如果需要catch返回，则进行reject
			if (custom?.catch) {
				return Promise.reject(data)
			} else {
				// 否则返回一个pending中的promise
				return new Promise(() => {})
			}
			return Promise.reject(response)
		}
		// 如果服务器返回的状态为未登录，跳转之登录页面
		// if (data.code === 'not_login') {
		// 	uni.reLaunch({
		// 		url: "/pages/login/'login"
		// 	})
		// 	uni.removeStorageSync("token")
		// 	uni.removeStorageSync("userInfo")
		// } else {
		// 	uni.$d.toast(data.message)
		// }
		return data.data || {}
	}, (response) => {
		/*  对响应错误做点什么 （statusCode !== 200）*/
		return Promise.reject(response)
	})
}
