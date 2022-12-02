<template>
  <q-layout
    view="lHh lpr lFf"
    container
    style="height: 100vh"
    class="shadow-2 rounded-border"
  >
    <q-header class="bg-white text-dark">
      <q-toolbar>
        <q-icon
          name="arrow_back_ios"
          @click="$router.push(`/tasklists/${taskList._id}`)"
        />

        <q-toolbar-title>{{ tasksStore.task?.title }}</q-toolbar-title>

        <q-btn color="grey-7" round flat icon="more_horiz">
          <q-menu auto-close>
            <q-list>
              <q-item clickable>
                <q-item-section
                  @click="
                    $router.push(
                      `/tasklists/${taskList._id}/tasks/${task._id}/edit`
                    )
                  "
                  >Editer</q-item-section
                >
              </q-item>
              <q-item clickable @click="deleteTask(taskList._id, task)">
                <q-item-section class="text-negative">Supprimer</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page class="q-pa-md">
        <p class="text-grey-6 q-mb-none">Tâche</p>
        <p class="text-h4">{{ task?.title }}</p>

        <p class="text-grey-6 q-mb-none">Description</p>
        <p>{{ task?.description }}</p>

        <p class="text-grey-6 q-mb-none">Terminée</p>
        <p>{{ task?.done ? "Oui" : "Non" }}</p>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script setup>
import { onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useTaskListsStore } from "stores/taskLists";
import { useTasksStore } from "stores/tasks";
import { useQuasar } from "quasar";

const { params } = useRoute();
const { push } = useRouter();
const $q = useQuasar();
const taskListsStore = useTaskListsStore();
const tasksStore = useTasksStore();

const taskList = computed(() => taskListsStore.taskList);
const task = computed(() => tasksStore.task);

onMounted(async () => {
  await taskListsStore.get(params.taskListId);
  await tasksStore.get(params.taskId);
});

const deleteTask = (taskListId, task) => {
  $q.dialog({
    title: "Supprimer la tâche",
    message: `Vous êtes sur le point de supprimer cette tâche "${task.title}". Êtes vous sûr de vouloir faire ça ?`,
    cancel: "Annuler",
    ok: "Supprimer",
    persistent: true,
  })
    .onOk(async () => {
      try {
        await tasksStore.delete(task._id);
        push(`/tasklists/${taskListId}`);
      } catch (e) {
        console.log(e);
        $q.notify({
          type: "negative",
          position: "top",
          message: "Une erreur est survenue lors de la suppression de la tâche",
        });
      }
    })
    .onOk(() => {
      // console.log('>>>> second OK catcher')
    })
    .onCancel(() => {
      // console.log('>>>> Cancel')
    })
    .onDismiss(() => {
      // console.log('I am triggered on both OK and Cancel')
    });
};
</script>
