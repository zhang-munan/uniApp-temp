<script>
	import {
		mapMutations
	} from 'vuex'
	import {
		version
	} from './package.json'
	export default {
		onLaunch: function() {
			this.appLaunch()
			console.log(
				`%c hello dlhc-uniApp %c v${version} %c`,
				'background:#35495e ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff',
				'background:#007aff ;padding: 1px; border-radius: 0 3px 3px 0;  color: #fff; font-weight: bold;',
				'background:transparent'
			)
		},
		onShow: function() {},
		onHide: function() {},
		globalData: {
			test: 'test'
		},
		methods: {}
	}
</script>

<style lang="scss">
	/* 本地引用iconfont */
	@import './static/iconfont/iconfont.css';

	/* #ifndef APP-PLUS-NVUE */
	/* uni.css - 通用组件、模板样式库，可以当作一套ui库应用 */
	@import './common/uni.css';

	/* 引用uview css */
	// 如果不使用uview-ui 删除下面代码
	// @import "@/uni_modules/uview-ui/index.scss";

	/* #endif */
	/* H5 兼容 pc 所需 */
	/* #ifdef H5 */
	@media screen and (min-width: 768px) {
		body {
			overflow-y: scroll;
		}
	}

	/* #endif */
</style>
