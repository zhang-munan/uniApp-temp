<template>
	<view>
		<!-- 头部 -->
		<view class="my_header">
			<view class="my_header_panel">
				<view class="my_header_panel_left">
					<view class="my_header_panel_avatar">
						<image src="../../static/image/demo/avatar.jpeg"></image>
					</view>
					<view class="my_header_panel_info">
						<view class="my_header_panel_left_name">{{ '彭于晏' }}</view>
						<view class="my_header_panel_left_introduce">#{{ '越努力，越幸运' }}#</view>
					</view>
				</view>
				<view class="my_header_panel_right">{{ '个人资料' }}</view>
			</view>
		</view>
		<!-- 展示面板 -->
		<view class="my_showcase">
			<view class="my_showcase_item">
				<view class="my_showcase_item_title">90</view>
				<view class="my_showcase_item_text">作品</view>
			</view>
			<view class="my_showcase_item">
				<view class="my_showcase_item_title">1235</view>
				<view class="my_showcase_item_text">粉丝</view>
			</view>
			<view class="my_showcase_item">
				<view class="my_showcase_item_title">23</view>
				<view class="my_showcase_item_text">粉丝</view>
			</view>
		</view>
		<!-- 功能区 -->
		<view class="my_list">
			<view class="my_list_row">
				<i class="iconfont icon-dianzan title_icon"></i>
				<view class="my_list_title">我赞过的</view>
				<i class="iconfont icon-you- icon"></i>
			</view>
			<view class="my_list_row">
				<i class="iconfont icon-aixin title_icon"></i>
				<view class="my_list_title">我的收藏</view>
				<i class="iconfont icon-you- icon"></i>
			</view>
			<view class="my_list_row">
				<i class="iconfont icon-tuandui title_icon"></i>
				<view class="my_list_title">我的团队</view>
				<i class="iconfont icon-you- icon"></i>
			</view>
			<view class="my_list_row">
				<i class="iconfont icon-xunzhang title_icon"></i>
				<view class="my_list_title">我的勋章</view>
				<i class="iconfont icon-you- icon"></i>
			</view>
			<view class="my_list_row">
				<i class="iconfont icon-shezhi title_icon"></i>
				<view class="my_list_title">设置</view>
				<i class="iconfont icon-you- icon"></i>
			</view>
		</view>
		<!-- 作品展示 -->
		<view class="my_gallery">
			<view class="my_gallery_header">
				<view class="my_gallery_title">
					作品（99）
				</view>
				<view class="my_gallery_operate">
					显示全部
				</view>
			</view>
			<view class="my_gallery_content">
				<scroll-view scroll-x="true" class="my_gallery_content_scroll">
					<template v-for="item in 10">
						<view class="my_gallery_content_scroll_panel_item">
							<image src="../../static/image/demo/project-demo.jpg" mode=""></image>
						</view>
					</template>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		methods: {}
	}
</script>
<style lang="scss" scoped>
	.my_header {
		padding-top: var(--status-bar-height);

		.my_header_panel {
			display: flex;
			padding: 30px 25px;
			align-items: center;
			justify-content: space-between;

			.my_header_panel_left {
				display: flex;

				.my_header_panel_avatar {
					width: 85px;
					height: 85px;
					overflow: hidden;
					margin-right: 15px;
					border-radius: 100%;

					image {
						width: 100%;
						height: 100%;
					}
				}

				.my_header_panel_info {
					display: flex;
					flex-direction: column;
					justify-content: space-between;

					.my_header_panel_left_name {
						font-size: 24px;
						font-weight: bold;
					}

					.my_header_panel_left_introduce {
						color: #bbbbbb;
						font-size: 14px;
					}
				}
			}

			.my_header_panel_right {
				height: min-content;
				font-size: 14px;
				padding: 5px 15px;
				border-radius: 15px 0 0 15px;
				box-shadow: -4px 0 5px 2px #f6f6f6;
			}
		}
	}

	.my_showcase {
		display: flex;
		padding: 0 20px;
		margin-bottom: 15px;
		justify-content: space-around;

		.my_showcase_item {
			text-align: center;

			.my_showcase_item_title {
				font-size: 20px;
				font-weight: bold;
				margin: 5px;
			}

			.my_showcase_item_text {
				color: #8d8d8d;
				font-size: 14px;
			}
		}
	}

	.my_list {
		padding: 0 20px;
		margin-bottom: 10px;

		.my_list_row {
			height: 70px;
			display: flex;
			align-items: center;

			.my_list_title {
				flex: 1;
				font-weight: 500;
			}

			.title_icon {
				font-weight: 500;
				font-size: 20px;
				margin-right: 10px;
			}

			.icon {
				color: #999999;
			}
		}
	}

	.my_gallery {
		.my_gallery_header {
			padding: 0 20px;
			display: flex;
			margin-bottom: 15px;
			align-items: center;
			justify-content: space-between;

			.my_gallery_title {
				font-size: 20px;
				font-weight: bold;
			}

			.my_gallery_operate {
				color: $uni-color-primary;
				font-size: 14px;
			}
		}

		.my_gallery_content {
			.my_gallery_content_scroll {
				white-space: nowrap;

				.my_gallery_content_scroll_panel_item {
					width: 200px;
					height: 150px;
					padding: 0 10px;
					overflow: hidden;
					display: inline-block;
					box-sizing: border-box;

					image {
						width: 100%;
						height: 100%;
						border-radius: 10px;
					}
				}
			}
		}
	}
</style>
