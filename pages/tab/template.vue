<template>
	<view>
		<!-- 顶部 fixed定位 -->
		<view class="top-warp">
			<view>顶部区域</view>
			<view style="font-size: 24rpx;">通过fixed定位其他元素,实现"局部区域滚动"</view>
		</view>

		<!-- 左边 fixed定位 -->
		<scroll-view class="left-warp" :scroll-y="true">
			<view class="tab" :class="{active:i==tabIndex}" v-for="(tab,i) in tabs" :key="i" @click="tabChange(i)">
				{{tab}}</view>
		</scroll-view>

		<dlhc-container ref="mescrollRef" :top="(iStatusBarHeight + 44)+'px'" @initData="init">
			<good-list :list="goods"></good-list>
		</dlhc-container>
	</view>
</template>


<script>
	import {
		apiGoods,
		apiGetTabs
	} from "@/api/mock.js"

	export default {
		data() {
			return {
				iStatusBarHeight: 0,
				goods: [], // 数据列表
				tabs: [], // tabs异步获取
				tabIndex: 0 // tab下标
			}
		},
		onLoad() {
			this.iStatusBarHeight = uni.getSystemInfoSync().statusBarHeight
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

			getGoods(page) {
				// tabs异步获取
				if (this.tabs.length == 0) {
					apiGetTabs().then(res => {
						this.tabs = res
						this.mescroll.resetUpScroll() // 重新触发upCallback
					}).catch(() => {
						this.mescroll.endErr()
					})
					return // 此处return,先获取tabs
				}

				//联网加载数据
				let keyword = this.tabs[this.tabIndex]
				apiGoods(page.num, page.size, keyword).then(res => {
					//联网成功的回调,隐藏下拉刷新和上拉加载的状态;
					this.mescroll.endSuccess(res.list.length);
					//设置列表数据
					if (page.num == 1) this.goods = []; //如果是第一页需手动制空列表
					this.goods = this.goods.concat(res.list); //追加新数据
				}).catch(() => {
					//联网失败, 结束加载
					this.mescroll.endErr();
				})
			},
			// 切换菜单
			tabChange(i) {
				if (this.tabIndex != i) {
					this.tabIndex = i
					this.goods = []; // 先置空列表,显示加载进度条
					this.mescroll.resetUpScroll(); // 重置列表数据
				}
			}
		}
	}
</script>


<style lang="scss">
	/* 顶部 fixed定位*/
	.top-warp {
		left: 0;
		width: 100%;
		z-index: 200;
		height: calc(var(--status-bar-height) + 44px);
		color: #FFFFFF;
		position: fixed;
		font-size: 28rpx;
		text-align: center;
		top: var(--window-top);
		box-sizing: border-box;
		background-color: #5cb3cc;
		// background-color: inherit;
		padding-top: var(--status-bar-height);
	}

	/* 左边 fixed定位*/
	.left-warp {
		z-index: 100;
		position: fixed;
		top: var(--window-top);
		left: 0;
		width: 180rpx;
		padding-top: calc(var(--status-bar-height) + 44px);
		background-color: #eee;

		.tab {
			font-size: 28rpx;
			padding: 28rpx;

			&.active {
				background-color: #fff;
			}
		}
	}

	// 设置padding
	.mescroll-body,
	/deep/.mescroll-body {
		padding-left: 180rpx;
	}

	/* 底部 fixed定位*/
	.bottom-warp {
		z-index: 200;
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 100rpx;
		line-height: 100rpx;
		text-align: center;
		background-color: #FF6990;
	}
</style>
