import { defineStore } from "pinia";
import { types } from "sass";
import { ref, reactive, computed, watch } from "vue";
import axios from "axios";

const taskUrl = "http://127.0.0.1:5000/api/task/";
const userUrl = "http://127.0.0.1:5000/api/user/";

export const useTaskStore = defineStore("tasks_storage", () => {
  const tasks = ref([]);
  const user = ref({});

  const user_register = async (username) => {
    try {
      const response = await axios.post(userUrl + "register", {
        username: username,
      });
      await fetch_data(username);
      console.log("register: ", user.value);
    } catch (e) {
      console.log("register error: ", e);
    }
  };

  const user_login = async (username) => {
    try {
      const response = await axios.post(userUrl + "login", {
        username: username,
      });
      await fetch_data(username);
      console.log("login: ", user.value);
    } catch (e) {
      console.log("login error: ", e);
    }
  };

  const user_logout = async (username) => {
    try {
      const response = await axios.post(userUrl + "logout", {
        username: username,
      });
      user.value = undefined;
      tasks.value = undefined;
      console.log("logout succeed");
    } catch (e) {
      console.log("logout error: ", e);
    }
  };

  const user_delete = async (username) => {
    try {
      const response = await axios.post(userUrl + "delete", {
        username: username,
      });
      user.value = undefined;
      tasks.value = undefined;
      console.log("delete succeed");
    } catch (e) {
      console.log("delete error: ", e);
    }
  };

  const fetch_data = async (username) => {
    try {
      const response = await axios.post(userUrl + "datafetch", {
        username: username,
      });
      user.value = response.data.user;
      tasks.value = response.data.tasks;
      console.log("fetch data: ", user.value, tasks.value);
    } catch (e) {
      console.log("fetch data error: ", e);
    }
  };

  const task_create = async (username, new_task) => {
    try {
      const response = await axios.post(taskUrl + "create", {
        username: username,
        title: new_task.title,
        description: new_task.description,
        type_of: new_task.type_of,
        type_icon: new_task.type_icon,
        start_date: new_task.start_date,
        due_date: new_task.due_date,
      });
      await fetch_data(username);
      console.log("create: ", new_task);
    } catch (e) {
      console.log("create error: ", e);
    }
  };

  const task_delete = async (username, task_id) => {
    try {
      const response = await axios.post(taskUrl + "delete", {
        username: username,
        id: task_id,
      });
      await fetch_data(username);
      console.log("delete: ", task_id);
    } catch (e) {
      console.log("delete error: ", e);
    }
  };

  const task_update = async (username, task_id, new_task) => {
    try {
      const resopnse = await axios.post(taskUrl + "update", {
        username: username,
        id: task_id,
        title: new_task.title,
        description: new_task.description,
        type_of: new_task.type_of,
        type_icon: new_task.type_icon,
        start_date: new_task.start_date,
        due_date: new_task.due_date,
      });
      await fetch_data(username);
      console.log("update: ", task_id, new_task);
    } catch (e) {
      console.log("update error: ", e);
    }
  };

  const task_type_create = async (username, type_name, type_icon) => {
    try {
      const response = await axios.post(userUrl + "type/create", {
        username: username,
        type_name: type_name,
        type_icon: type_icon,
      });
      await fetch_data(username);
      console.log("create type: ", type_name, type_icon);
    } catch (e) {
      console.log("create type error: ", e);
    }
  };

  const task_type_delete = async (username, type_name) => {
    try {
      const response = await axios.post(userUrl + "type/delete", {
        username: username,
        type_name: type_name,
      });
      await fetch_data(username);
      console.log("delete type: ", type_name);
    } catch (e) {
      console.log("delete type error: ", e);
    }
  };

  return {
    tasks,
    user,
    user_register,
    user_login,
    user_logout,
    user_delete,
    fetch_data,
    task_create,
    task_delete,
    task_update,
    task_type_create,
    task_type_delete,
  };
  /*
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
	};*/
});
