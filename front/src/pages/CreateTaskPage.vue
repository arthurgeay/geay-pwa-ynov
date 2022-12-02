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
            <q-toolbar-title>Créer une tâche</q-toolbar-title>
          </q-toolbar>
        </q-header>

        <q-form @submit="onSubmit" class="q-gutter-md">
          <q-input
            filled
            v-model="title"
            label="Titre de la tâche"
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 0) || 'Veuillez renseigner un titre',
            ]"
          />

          <q-input
            filled
            v-model="description"
            lazy-rules
            label="Description"
          />

          <div class="row">
            <q-btn
              class="full-width"
              label="Créer"
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
import { ref, onMounted } from "vue";
import { useTaskListsStore } from "stores/taskLists";
import { useTasksStore } from "src/stores/tasks";
import { useQuasar } from "quasar";
import { storeToRefs } from "pinia";
import { useRoute, useRouter } from "vue-router";

const title = ref("");
const description = ref(" ");

const taskListsStore = useTaskListsStore();
const tasksStore = useTasksStore();

const $q = useQuasar();
const { push } = useRouter();
const { params } = useRoute();

const { taskList } = storeToRefs(taskListsStore);

onMounted(async () => {
  await taskListsStore.get(params.id);
});

const onSubmit = async () => {
  try {
    await tasksStore.create(title.value, description.value);
    push(`/tasklists/${params.id}`);
  } catch (error) {
    console.log(error);
    $q.notify({
      message: "Une erreur est survenue lors de la création de la tâche",
      color: "negative",
      position: "top",
    });
  }
};
</script>
