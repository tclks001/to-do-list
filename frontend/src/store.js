import {defineStore} from "pinia";
import { types } from "sass";
import {ref,reactive,computed,watch} from "vue";


export const useTaskStore = defineStore("tasks_storage", () => {
	const tasks = ref(uni.getStorageSync("tasks") || []);
	watch(tasks, (newTasks) => {
		uni.setStorageSync("tasks", newTasks);
	}, {deep: true});
	const taskTypes = ref(uni.getStorageSync("taskTypes") || [
		{ "name": "未分类", "icon": "emoji" },
		{ "name": "工作", "icon": "phone" },
		{ "name": "生活", "icon": "present" }
	]);
	watch(taskTypes, (newTaskTypes) => {
		uni.setStorageSync("taskTypes", newTaskTypes);
	}, {deep: true});
	// 添加任务
	const addTask = (task) => {
		tasks.value.push(task);
	};
	// 删除任务（通过时间戳）
	const removeTask = (timestamp) => {
		const id = tasks.value.findIndex(task => task.timestamp === timestamp);
		try{
			tasks.value.splice(id, 1);
		}catch(e){
			console.log("删除错误！", e);
		}
	};
	// 修改任务（会保留时间戳不变）
	const updateTask = (timestamp, task) => {
		const id = tasks.value.findIndex(task => task.timestamp === timestamp);
		try{
			tasks.value[id] = task;
		}catch(e){
			console.log("修改错误！", e);
		}
	};
	// 完成任务
	const finishTask = (timestamp) => {
		const id = tasks.value.findIndex(task => task.timestamp === timestamp);
		try{
			tasks.value[id].state = "已完成";
		}catch(e){
			console.log("修改错误！", e);
		}
	};
	// 通过时间戳获取任务对象（响应）
	const getTaskByTimestamp = (timestamp) => computed(() => tasks.value.find(task => (task.timestamp === timestamp)));
	// 清空缓存数据
	const clearTasks = () => {
		tasks.value = [];
		uni.setStorageSync("tasks",[]);
		taskTypes.value = [];
		uni.setStorageSync("taskTypes",[]);
		console.log("tasks: ",tasks.value, "taskTypes: ", taskTypes.value);
	};
	// 添加新任务类型
	const addTaskType = (taskType, taskIcon) => {
		if(taskTypes.value.some(type => type.name === taskType)){
			console.log(taskType, "已存在！");
		}else{
			taskTypes.value.push({"name": taskType, "icon": taskIcon});
		}
	};
	// 删除任务类型
	const removeTaskType = (taskType) => {
		if(taskType === "未分类"){
			console.log("未分类不可删除！");
		}else{
			// 删除前把所有使用该类型的任务修改为"未分类"
			tasks.value.forEach(task => {
				if(task.type.name === taskType){
					task.type = { "name": "未分类", "icon": "emoji" };
				}
			});
			// 从任务类型列表中移除
			const id = taskTypes.value.findIndex(type => type.name === taskType);
			try{
				taskTypes.value.splice(id, 1);
			}catch(e){
				console.log("删除错误！", e);
			}
		}
		
	};
	return {tasks, addTask, removeTask, updateTask, getTaskByTimestamp, 
			clearTasks, finishTask, taskTypes, addTaskType, removeTaskType
	};
});
