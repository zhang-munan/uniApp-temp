<template>
	<div>
		<template v-if="false">
			<!-- 顶部组件 -->
			<!-- <u-navbar
					title="个人中心"
					@rightClick=""
					bgColor="#37D4CF"
					:autoBack="true"
			>
			</u-navbar> -->
		</template>
		<!-- 自定义顶部组件 -->
		<slot name="pageTop"></slot>
		<!-- 滚动组件 -->
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" 
		 :down="downOption" 
		 :up="upOption" 
		 :top="top" 
		 :bottom="bottom" 
		 :topbar="topbar" 
		 :bottombar="bottombar" 
		 :fixed="true" 
		 :height="height" 
		 :safearea="safearea" 
		 :sticky="sticky"
		 @emptyclick="emptyClick" 
		 @topclick="topClick" 
		 @scroll="scroll">
			<!-- 页面内容 -->
			<slot></slot>
		</mescroll-body>
	</div>
</template>

<script>
	import MescrollBody from "@/baseConfig/components/mescroll-uni/components/mescroll-body/mescroll-body.vue";
	// import MescrollMixin from "@/baseConfig/components/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	
	export default {
		props: {
			downOption: Object,
			upOption: Object,
			// i18n: Object,
			top: [String, Number],
			topbar: [Boolean, String],
			bottom: [String, Number],
			safearea: Boolean,
			height: [String, Number],
			bottombar:{
				type: Boolean,
				default: true
			},
			sticky: Boolean
		},
		
		// mixins: [MescrollMixin], // 使用mixin
		components: {
			MescrollBody
		},
		data() {
			return {
				
			}
		},
		mounted() {
			// this.initProps()
		},
		methods: {
			/* 初始化参数 */
			initProps() {
				// 下拉配置
				// this.downOptionProp = Object.assign(this.downOptionProp, this.downOption)
			},
			
			/*下拉刷新的回调 */
			downCallback() {
				// 这里加载你想下拉刷新的数据, 比如刷新轮播数据
				if (this.mescroll && !this.mescroll.optUp.use) {
					this.$emit('initData', this.mescroll)
				} else {
					// 下拉刷新的回调,默认重置上拉加载列表为第一页 (自动执行 page.num=1, 再触发upCallback方法 )
					this.mescroll.resetUpScroll()
				}
			},
			/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
			upCallback(page) {
				this.$emit('initData', page)
			},
			// 点击空布局按钮的回调
			emptyClick(){
				this.$emit('emptyClick')
			},
			// 点击回到顶部按钮的回调
			topClick(){
				this.$emit('topClick')
			},
			// mescroll-uni滚动事件 (需在up配置onScroll:true才生效, mescroll-body直接声明onPageScroll)
			scroll(){
				console.log('mescroll元素id: '+this.mescroll.viewId+' , 滚动内容高度:'+this.mescroll.getScrollHeight() + ', mescroll高度:'+this.mescroll.getClientHeight() + ', 滚动条位置:'+this.mescroll.getScrollTop() + ', 距离底部:'+this.mescroll.getScrollBottom() + ', 是否向上滑:'+this.mescroll.isScrollUp)
			},
			
			
		},
	}
</script>

<style></style>
