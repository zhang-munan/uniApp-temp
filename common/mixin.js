import APPUpdate, {
	getDownload
} from "../baseConfig/libs/plugins/APPUpdate"
export default {
	data() {
		return {
			token: null,
			userInfo: {}
		}
	},
	async onShow() {
		this.token = uni.getStorageSync("token") || null
		this.userInfo = uni.getStorageSync("userInfo") ? JSON.parse(uni.getStorageSync("userInfo")) : null
	},
	async onLoad(e) {},
	computed: {},
	methods: {

		/**
		 * APP启动
		 */
		appLaunch() {
			let self = this
			// #ifdef APP-PLUS
			// 版本校验
			APPUpdate()
			// 检查通知是否开启
			self.getNotificationAuthority()
			// #endif
		},

		/**
		 * 登录后共通处理
		 * @param res
		 */
		afterLogin(res) {
			if (res.token) uni.setStorageSync('token', res.token);
			uni.setStorageSync('userInfo', JSON.stringify(res));
			this.userInfo = res
		},

		/**
		 * 清空缓存
		 */
		removeUserStorage() {
			uni.removeStorageSync("token")
			uni.removeStorageSync("userInfo")
		}
	}
}
