<template>
  <view class="cu-form-group">
    <picker mode="selector" :range="taskTypeNames" @change="selectType">
      <view class="picker">筛选分类: {{ selectedType || "未选择" }}</view>
    </picker>
  </view>
  <view class="cu-form-group">
    <picker mode="selector" :range="taskStates" @change="selectState">
      <view class="picker">筛选状态: {{ selectedState || "未选择" }}</view>
    </picker>
  </view>
  <view class="cu-list">
    <Task
      v-for="task in selectedTasks"
      :key="task.timestamp"
      :timestamp="task.timestamp"
    />
  </view>
</template>

<script setup>
import { ref, computed } from "vue";
import { useTaskStore } from "../../store";
import Task from "../../components/Task.vue";
const store = useTaskStore();
const taskTypes = ref(store.taskTypes);
const taskTypeNames = computed(() => [
  "全部分类",
  ...taskTypes.value.map((type) => type.name),
]);
const selectedType = ref("全部分类");
const selectType = (val) => {
  selectedType.value = taskTypeNames.value[val.detail.value];
};
const taskStates = ["全部状态", "未完成", "已完成", "已搁置"];
const selectedState = ref("全部状态");
const selectState = (val) => {
  selectedState.value = taskStates[val.detail.value];
};
const selectedTasks = computed(() => {
  let tasks = store.tasks || []; // 避免无任务时出现undefined错误
  if (selectedType.value !== "全部分类") {
    tasks = tasks.filter((task) => task.type.name === selectedType.value);
  }
  if (selectedState.value !== "全部状态") {
    tasks = tasks.filter((task) => task.state === selectedState.value);
  }
  return tasks;
});
</script>
