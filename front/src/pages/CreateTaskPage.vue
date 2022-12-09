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
      <q-toolbar-title>Créer une tâche</q-toolbar-title>
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
            dense
            v-model="title"
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
            autogrow
            v-model="description"
            lazy-rules
            placeholder="Description"
          />

          <div class="row">
            <q-btn
              no-caps
              class="full-width text-bold"
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
import { ref, onMounted, computed } from "vue";
import { useTaskListsStore } from "stores/taskLists";
import { useTasksStore } from "src/stores/tasks";
import { useQuasar } from "quasar";
import { useRoute, useRouter } from "vue-router";
import ActionHeader from "../components/ActionHeader.vue";

const title = ref("");
const description = ref(" ");

const taskListsStore = useTaskListsStore();
const tasksStore = useTasksStore();

const $q = useQuasar();
const { push } = useRouter();
const { params } = useRoute();

const taskList = computed(() => taskListsStore.taskList);

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
