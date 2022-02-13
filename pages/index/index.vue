<template>
	<dlhc-container @initData="init" :sticky="true">
		<template v-slot:pageTop>
			<view class="pageTop">

			</view>
		</template>
		<!-- 检索组件 -->
		<view class="sticky">
			<uni-search-bar></uni-search-bar>
		</view>

		<!-- 商品组件 -->
		<good-list class="good-comp" :list="goods"></good-list>
	</dlhc-container>
</template>

<script>
	import {
		apiGoods
	} from '@/api/mock.js'
	export default {
		data() {
			return {
				mescroll: null, // 初始化组件对象
				goods: []
			}
		},
		methods: {
			/**
			 * 初始化数据
			 * @param {Object} options
			 */
			init(options) {
				this.mescroll = options
				this.getGoods(options)
			},

			/**
			 * 获取数据
			 */
			getGoods(page) {
				apiGoods(page.num, page.size, '').then(res => {
					//联网成功的回调,隐藏下拉刷新和上拉加载的状态;
					//mescroll会根据传的参数,自动判断列表如果无任何数据,则提示空;列表无下一页数据,则提示无更多数据;

					//方法一(推荐): 后台接口有返回列表的总页数 totalPage
					//this.mescroll.endByPage(res.list.length, res.totalPage); //必传参数(当前页的数据个数, 总页数)

					//方法二(推荐): 后台接口有返回列表的总数据量 totalSize
					//this.mescroll.endBySize(res.list.length, res.totalSize); //必传参数(当前页的数据个数, 总数据量)

					//方法三(推荐): 您有其他方式知道是否有下一页 hasNext
					this.mescroll.endSuccess(res.list.length, true); //必传参数(当前页的数据个数, 是否有下一页true/false)

					//方法四 (不推荐),会存在一个小问题:比如列表共有20条数据,每页加载10条,共2页.如果只根据当前页的数据个数判断,则需翻到第三页才会知道无更多数据
					// this.mescroll.endSuccess(res.list.length);

					//设置列表数据
					if (page.num == 1) this.goods = []; //如果是第一页需手动制空列表
					this.goods = this.goods.concat(res.list); //追加新数据
				}).catch(() => {
					//联网失败, 结束加载
					this.mescroll.endErr();
				})
			},
		}
	}
</script>

<style lang="scss">
	.sticky {
		z-index: 990;
		position: sticky;
		top: var(--window-top);
		background-color: #fff;
		padding-top: var(--status-bar-height);
	}
</style>
