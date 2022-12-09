<template>
  <q-layout
    view="lHh lpr lFf"
    container
    style="height: 100vh"
    class="shadow-2 rounded-border"
  >
    <ActionHeader>
      <q-icon
        class="back-btn"
        name="arrow_back_ios_new"
        @click="$router.push(`/tasklists/${taskList._id}`)"
      />
      <q-toolbar-title>Mettre à jour une tâche</q-toolbar-title>
      <q-btn
        flat
        no-caps
        label="Annuler"
        @click="$router.push(`/tasklists/${taskList._id}`)"
      />
    </ActionHeader>

    <q-page-container>
      <q-page class="q-pa-md">
        <q-form @submit="onSubmit" class="q-gutter-md q-mt-md">
          <p class="text-bold">Nom de la tâche</p>
          <q-input
            outlined
            v-model="task.title"
            placeholder="Titre de la tâche"
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 0) || 'Veuillez renseigner un titre',
            ]"
          />

          <p class="text-bold">Description</p>
          <q-input
            outlined
            v-model="task.description"
            lazy-rules
            placeholder="Description"
          />

          <p class="text-bold">Déplacer la tâche dans une autre liste</p>
          <q-select
            outlined
            v-model="task.taskList"
            :options="taskLists"
            option-label="title"
          />

          <div class="row">
            <q-btn
              no-caps
              class="full-width text-bold"
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
import ActionHeader from "../components/ActionHeader.vue";

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
