<template>
  <q-layout view="lHh Lpr lFf">
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
          <div v-for="taskList in taskLists" :key="taskList._id">
            <q-item
              clickable
              v-ripple
              class="q-pa-none"
              @click="$router.push(`/tasklists/${taskList._id}`)"
            >
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
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useQuasar } from "quasar";

import { useTaskListsStore } from "stores/taskLists";
import { useTasksStore } from "stores/tasks";
import { storeToRefs } from "pinia";

const taskListsStore = useTaskListsStore();
const tasksStore = useTasksStore();

onMounted(async () => {
  await taskListsStore.getCollection();
  await tasksStore.getCollection();
});

const { taskLists } = storeToRefs(taskListsStore);

const drawer = ref(false);
const $q = useQuasar();

const toggleDrawer = () => {
  drawer.value = !drawer.value;
};

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
