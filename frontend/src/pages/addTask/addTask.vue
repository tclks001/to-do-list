<template>
	<view class="cu-form-group">
		<input v-model="task.text" placeholder="请输入任务名" class="cu-input" />
	</view>
	<view class="cu-form-group">
		<picker mode="date" @change="setBegin">
			<view class="picker">开始日期: {{ task.begin || "未选择" }}</view>
		</picker>
	</view>
	<view class="cu-form-group">
		<picker mode="date" @change="setEnd">
			<view class="picker">结束日期: {{ task.end || "未选择" }}</view>
		</picker>
	</view>
	<view class="cu-form-group">
		<picker mode="selector" :range="taskTypeNames" @change="setType">
			<view class="picker">任务类型: {{ task.type.name }}</view>
		</picker>
	</view>
	<view class="cu-bar">
		<button class="cu-btn bg-blue" @click="add">确认</button>
		<button class="cu-btn bg-green" @click="back">取消</button>
	</view>
</template>

<script setup>
	import { defineStore } from "pinia";
	import { useTaskStore } from "../../store";
	import { computed, ref } from "vue";
	const store = useTaskStore();
	const task = ref({
		text: "",
		type: {"name": "未分类", "icon": "emoji"},
		state: "未完成",
		begin: "",
		end: "",
		timestamp: Date.now()
	});
	const taskTypes = ref(store.taskTypes);
	const taskTypeNames = computed(() => taskTypes.value.map(type => type.name));
	const setType = (val) => {
		task.value.type = taskTypes.value[val.detail.value];
	};
	const setBegin = (val) => {
		task.value.begin = val.detail.value;
	};
	const setEnd = (val) => {
		task.value.end = val.detail.value;
	};
	const add = () => {
		if(task.value.text !== ""){
			store.addTask(task.value);
			uni.navigateTo({
				url: "/pages/index/index"
			});
		}
	};
	const back = () => uni.navigateTo({
		url: "/pages/index/index"
	});
	
</script>

<style scoped>

</style>
