<template>
	<view class="search_body">
		<view class="search_row">
			<view class="search_input">
				<img src="data:image/png;base64,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"/>
				<input class="input" type="text" value="魔力赏" />
			</view>
			<view class="search_filter">
				分类
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	.search_body {
		padding: 20rpx;
		
		.search_row {
			display: flex;
			align-items: center;
			justify-content: space-between;
			
			.search_input {
				flex: 1;
				display: flex;
				align-items: center;
				border-radius: 10rpx;
				padding: 0 15rpx;
				background-color: rgba($color: #a3a3a3, $alpha: .1);
				
				img {
					width: 32rpx;
					height: 32rpx;
				}
				
				.input {
					padding: 15rpx;
				}
			}
			
			.search_filter {
				margin-left: 20rpx;
				text-align: right;
			}
		}
	}
</style>
