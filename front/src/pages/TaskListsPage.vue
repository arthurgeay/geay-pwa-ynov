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

    <q-drawer v-model="drawer" show-if-above bordered>
      <div class="q-pa-md">
        <h2 class="text-h4">Mes listes</h2>
        <q-btn
          color="primary"
          class="q-mb-md full-width"
          label="Créer une liste"
          @click="createTaskList"
        />
        <q-list>
          <div v-for="taskList in (index, taskLists)" :key="taskList._id">
            <q-item clickable v-ripple class="q-pa-none">
              <q-item-section>
                <q-item-label> {{ taskList.title }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-separator />
          </div>
        </q-list>
      </div>
    </q-drawer>

    <q-footer>
      <div class="row justify-around">
        <q-btn
          flat
          round
          dense
          icon="subject"
          size="1.5em"
          @click="toggleDrawer"
        />
        <q-btn
          flat
          round
          dense
          icon="add"
          size="1.5em"
          @click="createTaskList()"
        />
        <q-btn flat round dense icon="person" size="1.5em" />
      </div>
    </q-footer>

    <q-page-container>
      <q-page class="q-pa-md">
        <h1 class="text-h4">
          Bonjour,<br />
          Tom Dupont ! 👋
        </h1>

        <TaskListCard
          v-for="taskList in taskLists"
          :key="taskList._id"
          :taskList="taskList"
          @update="getTaskLists"
          @delete="getTaskLists"
        />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import TaskListCard from "../components/TaskList/TaskListCard.vue";

import taskListService from "services/taskList";
import { ref } from "vue";
import { useQuasar } from "quasar";

const taskLists = ref([]);
const drawer = ref(false);
const $q = useQuasar();

const getTaskLists = async () => {
  const result = await taskListService.getTaskLists();
  taskLists.value = result;
};

(async () => {
  await getTaskLists();
})();

const createTaskList = () => {
  $q.dialog({
    title: "Créer une nouvelle liste",
    message: "Nom de la liste",
    prompt: {
      model: "",
      isValid: (v) => v && v.length > 0,
      type: "text", // optional
    },
    ok: "Créer",
    cancel: "Annuler",
  })
    .onOk(async (data) => {
      try {
        await taskListService.createTaskList(data);
        taskLists.value = await taskListService.getTaskLists();
      } catch (e) {
        $q.notify({
          type: "negative",
          message: "Une erreur est survenue lors de la création de la liste",
          position: "top",
        });
      }
    })
    .onCancel(() => {
      // console.log('>>>> Cancel')
    })
    .onDismiss(() => {
      // console.log('I am triggered on both OK and Cancel')
    });
};

const toggleDrawer = () => {
  drawer.value = !drawer.value;
};
</script>
