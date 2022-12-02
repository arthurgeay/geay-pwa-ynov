<template>
  <q-layout
    view="lHh lpr lFf"
    container
    style="height: 100vh"
    class="shadow-2 rounded-border"
  >
    <q-page-container>
      <q-page class="q-pa-md">
        <q-header class="bg-white text-dark">
          <q-toolbar>
            <q-icon
              name="arrow_back_ios"
              @click="$router.push(`/tasklists/${taskList._id}`)"
            />
            <q-toolbar-title>Mettre à jour une tâche</q-toolbar-title>
          </q-toolbar>
        </q-header>

        <q-form @submit="onSubmit" class="q-gutter-md">
          <q-input
            filled
            v-model="task.title"
            label="Titre de la tâche"
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 0) || 'Veuillez renseigner un titre',
            ]"
          />

          <q-input
            filled
            v-model="task.description"
            lazy-rules
            label="Description"
          />

          <q-select
            v-model="task.taskList"
            :options="taskLists"
            option-label="title"
            label="Déplacer la tâche dans une autre liste"
          />

          <div class="row">
            <q-btn
              class="full-width"
              label="Modifier"
              type="submit"
              color="primary"
            />
          </div>
        </q-form>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script setup>
import { computed } from "vue";
import { useTaskListsStore } from "stores/taskLists";
import { useTasksStore } from "src/stores/tasks";
import { useQuasar } from "quasar";
import { useRoute, useRouter } from "vue-router";

const taskListsStore = useTaskListsStore();
const tasksStore = useTasksStore();
const taskList = computed(() => taskListsStore.taskList);
const taskLists = computed(() => taskListsStore.taskLists);
const task = computed(() => tasksStore.task);

const $q = useQuasar();
const { push } = useRouter();
const { params } = useRoute();

const onSubmit = async () => {
  try {
    await tasksStore.update(task.value);
    push(`/tasklists/${params.taskListId}`);
  } catch (error) {
    $q.notify({
      message: "Une erreur est survenue lors de la mise à jour de la tâche",
      color: "negative",
      position: "top",
    });
  }
};
</script>
