<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-white text-dark">
      <q-toolbar>
        <q-toolbar-title class="text-bold">Dashboard</q-toolbar-title>

        <q-btn flat round dense icon="account_circle" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="drawer" show-if-above bordered>
      <div class="q-pa-md">
        <h2 class="text-h4">Mes listes</h2>
        <q-btn
          no-caps
          color="primary"
          class="q-mb-md full-width text-bold"
          label="Créer une liste"
          @click="createTaskList"
        />
        <q-list>
          <div v-for="taskList in taskLists" :key="taskList._id">
            <q-item
              clickable
              v-ripple
              class="q-pa-none"
              @click="$router.push(`/tasklists/${taskList._id}`)"
            >
              <q-item-section>
                <q-item-label class="text-bold">
                  {{ taskList.title }}</q-item-label
                >
              </q-item-section>
            </q-item>
            <q-separator />
          </div>
        </q-list>
      </div>
    </q-drawer>

    <q-footer class="bg-white q-pa-md">
      <div class="row justify-around">
        <q-btn
          flat
          round
          dense
          icon="subject"
          color="grey"
          size="1.5em"
          @click="toggleDrawer"
        />
        <q-btn
          flat
          round
          dense
          icon="add"
          size="1.5em"
          class="add-btn"
          @click="createTaskList()"
        />
        <q-btn flat round dense icon="person" size="1.5em" color="grey" />
      </div>
    </q-footer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useQuasar } from "quasar";

import { useTaskListsStore } from "stores/taskLists";
import { useTasksStore } from "stores/tasks";

const taskListsStore = useTaskListsStore();
const tasksStore = useTasksStore();

onMounted(async () => {
  await taskListsStore.getCollection();
  await tasksStore.getCollection();
});

const taskLists = computed(() => taskListsStore.taskLists);

const drawer = ref(false);
const $q = useQuasar();

const toggleDrawer = () => {
  drawer.value = !drawer.value;
};

const createTaskList = () => {
  $q.dialog({
    classes: "toto",
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
        await taskListsStore.create(data);
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
</script>

<style scoped></style>
