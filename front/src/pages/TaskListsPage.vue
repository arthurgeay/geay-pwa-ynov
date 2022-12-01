<template>
  <q-layout
    view="lHh lpr lFf"
    container
    style="height: 100vh"
    class="shadow-2 rounded-border"
  >
    <q-header class="bg-white text-dark">
      <q-toolbar>
        <q-toolbar-title>Dashboard</q-toolbar-title>

        <q-btn flat round dense icon="account_circle" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page class="q-pa-md">
        <h1 class="text-h4">
          Bonjour,<br />
          Tom Dupont ! 👋
        </h1>

        <TaskListCard
          v-for="taskList in taskListsStore.taskLists"
          :key="taskList._id"
          :taskList="taskList"
        />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import TaskListCard from "../components/TaskList/TaskListCard.vue";
import { useTaskListsStore } from "stores/taskLists";

const taskListsStore = useTaskListsStore();
</script>
