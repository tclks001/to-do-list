<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	
	@import "colorui/main.css";
	@import "colorui/icon.css";
	
   
	.cu-btn {
		border-radius: 20rpx;
		margin: 20rpx;
	}
	text.cuIcon-close {
		margin: 20rpx;
		font-size: 50rpx;
		border-radius: 5rpx;
		background-color: red;
	}
</style>
