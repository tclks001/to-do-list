<template>
	<view class="container">
		<!-- 顶部操作栏 -->
		<view class="cu-bar bg-white solid-bottom">
			<view class="action" @click="setting">
				<text class="cuIcon-settings text-blue"></text> 设置
			</view>
			<view class="action" @click="show">
				<text class="cuIcon-filter text-green"></text> 筛选
			</view>
			<view class="action" @click="addNewTask">
				<text class="cuIcon-add text-orange"></text> 添加
			</view>
		</view>

		<!-- 任务列表 -->
		<view class="cu-list menu-avatar">
			<Task
				v-for="task in store.tasks" 
				:key="task.timestamp" 
				:timestamp="task.timestamp" 
			/>
		</view>
	</view>
</template>

<script setup>
	import { defineStore } from "pinia";
	import { useTaskStore } from "../../store";
	import { ref } from "vue";
	import Task from "../../components/Task.vue"
	const store = useTaskStore();
	const addNewTask = () => uni.navigateTo({
		url: "/pages/addTask/addTask"
	});
	const clear = () => {
		store.clearTasks();
	};
	const show = () => uni.navigateTo({
		url: "/pages/show/show"
	});
	const setting = () => uni.navigateTo({
		url: "/pages/setting/setting"
	});
</script>

<style scoped>
	.container {
		padding: 20rpx;
	}
	.action {
		padding: 20rpx;
		font-size: 32rpx;
		display: flex;
		align-items: center;
	}
</style>
