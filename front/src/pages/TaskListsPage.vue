<template>
  <q-page class="q-pa-md">
    <h1 class="text-h4 text-bold q-mb-xl">
      Bonjour,<br />
      Tom Dupont ! 👋
    </h1>

    <TaskListCard
      v-for="taskList in taskLists"
      :key="taskList._id"
      :taskList="taskList"
    />
  </q-page>
</template>

<script setup>
import TaskListCard from "../components/TaskList/TaskListCard.vue";
import { useTaskListsStore } from "stores/taskLists";
import { computed } from "vue";

const taskListsStore = useTaskListsStore();
const taskLists = computed(() => taskListsStore.taskLists);
</script>
