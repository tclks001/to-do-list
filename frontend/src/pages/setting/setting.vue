<template>
	<view class="cu-form-group">
		<input v-model="newTaskType" placeholder="新分类" class="cu-input" />
	</view>
	<!--图标选择区-->
	<view class="cu-form-group" @click="selectIconPopup">
		当前图标： <text :class="'cuIcon-' + selectedIcon"></text>
	</view>
	<button class="cu-btn bg-blue margin-tb-sm" @click="addNewTaskType">添加分类</button>
	<!-- 弹窗：图标选择 -->
	<view class="cu-modal" :class="{'show': iconPopRef}">
		<view class="cu-dialog">
			<view class="cu-bar bg-blue">
				<text class="action text-white">编辑图标</text>
				<text class="cuIcon-close" @click="iconPopRef = false"></text>
			</view>
			<view class="gird col-4">
				<button
					v-for="icon in taskIcons" 
					class="cu-btn round bg-grey iconbtn"
					:key="icon" 
					@click="selectIcon(icon)"
				>
					<text :class=" 'cuIcon-' + icon "></text>
				</button>
			</view>
		</view>
		
	</view>
	<view class="cu-form-group">
		<picker mode="selector" :range="taskTypeNames" @change="setRemovingType">
			<view class="picker">选择删除分类: {{ removingType || "未选择" }}</view>
		</picker>
	</view>
	<button class="cu-btn bg-red margin-tb-sm" @click="removeType">删除分类</button>
	
</template>

<script setup>
	import { defineStore } from "pinia";
	import { useTaskStore } from "../../store";
	import { computed, ref } from "vue";
	const store = useTaskStore();
	const newTaskType = ref("");
	const taskTypes = ref(store.taskTypes);
	const taskTypeNames = computed(() => taskTypes.value.map(type => type.name));
	const taskIcons = ["emoji", "phone", "taxi", "camera", "comment", "question", 
						"deliver", "pay", "send", "shop", "refund", "present", 
						"game", "copy", "baby", "clothes", "write", "moneybag"];
	const selectedIcon = ref("emoji");
	const iconPopRef = ref(false);
	const selectIconPopup = () => iconPopRef.value = true;
	const selectIcon = (icon) => {
		selectedIcon.value = icon;
		iconPopRef.value = false;
	};
	const addNewTaskType = () => {
		store.addTaskType(newTaskType.value, selectedIcon.value);
		newTaskType.value = "";
		selectedIcon.value = "emoji";
	};
	const removingType = ref("");
	const setRemovingType = (val) => {
		removingType.value = taskTypeNames.value[val.detail.value];
	};
	const removeType = () => {
		if(removingType.value === ""){
			return;
		}
		console.log(removingType.value);
		store.removeTaskType(removingType.value);
		removingType.value = "";
	};
</script>

<style scoped>

	button.iconbtn {
		font-size: 50rpx;
	}
</style>
