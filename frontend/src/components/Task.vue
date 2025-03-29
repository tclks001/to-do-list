<template>
  <view class="cu-item bg-white shadow" @click="openRef">
    <view
      class="cu-avatar round lg"
      :class="{
        'bg-red': task.state === '未完成',
        'bg-green': task.state === '已完成',
        'bg-gray': task.state === '已搁置',
      }"
    >
      <text :class="'cuIcon-' + task.type.icon"></text>
    </view>
    <view class="content">
      <text class="text-bold">{{ task.text }}</text>
	  <br />
      <text class="text-gray"
        >{{ task.begin || "无起始" }} ~ {{ task.end || "无终止" }}</text
      >
    </view>
  </view>

  <!-- 弹窗 -->
  <view class="cu-modal" :class="{ show: popupRef }">
    <view class="cu-dialog">
      <view class="cu-bar bg-blue">
        <text class="action text-white">编辑任务</text>
        <text class="cuIcon-close" @click="closeRef"></text>
      </view>
      <view class="cu-form-group">
        <input v-model="task.text" placeholder="任务名" class="cu-input" />
      </view>
      <view class="cu-form-group">
        <picker mode="selector" :range="taskTypeNames" @change="updateType">
          <view class="picker">{{ task.type.name }}</view>
        </picker>
      </view>
      <view class="cu-bar">
        <button class="cu-btn bg-blue" @click="recover">恢复</button>
        <button class="cu-btn bg-orange" @click="suspend">搁置</button>
        <button class="cu-btn bg-green" @click="finish">完成</button>
        <button class="cu-btn bg-red" @click="remove">删除</button>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from "vue";
import { useTaskStore } from "../store";
const props = defineProps({
  timestamp: Number,
});
const store = useTaskStore();
const task = store.getTaskByTimestamp(props.timestamp);
const popupRef = ref(false);
const taskTypes = ref(store.taskTypes);
const taskTypeNames = computed(() => taskTypes.value.map((task) => task.name));
// 弹窗相关
const openRef = () => (popupRef.value = true);
const closeRef = () => (popupRef.value = false);
// 修改任务分类为新分类
const updateType = (val) => {
  const newTask = task.value;
  newTask.type = taskTypes.value[val.detail.value];
  store.updateTask(props.timestamp, newTask);
};
// 修改任务状态为"未完成"
const recover = () => {
  const newTask = task.value;
  newTask.state = "未完成";
  store.updateTask(props.timestamp, newTask);
};
// 修改任务状态为"已搁置"
const suspend = () => {
  const newTask = task.value;
  newTask.state = "已搁置";
  store.updateTask(props.timestamp, newTask);
};
const remove = () => store.removeTask(props.timestamp);
const finish = () => {
  const newTask = task.value;
  newTask.state = "已完成";
  store.updateTask(props.timestamp, newTask);
};
// const finish = () => store.finishTask(props.timestamp);
</script>

<style scoped>
.cu-item {
  display: flex;
  align-items: center;
  padding: 20rpx;
  margin: 10rpx;
  border-radius: 12rpx;
}
.content {
  flex: 1;
  padding-left: 20rpx;
}
.picker {
  padding: 10rpx;
  background: #f5f5f5;
  border-radius: 8rpx;
}
</style>
