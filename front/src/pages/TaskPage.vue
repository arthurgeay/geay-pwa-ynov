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
              <q-item clickable @click="deleteList(taskList)">
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
import { useRoute } from "vue-router";
import { useTaskListsStore } from "stores/taskLists";
import { useTasksStore } from "stores/tasks";

const { params } = useRoute();
const taskListsStore = useTaskListsStore();
const tasksStore = useTasksStore();

const taskList = computed(() => taskListsStore.taskList);
const task = computed(() => tasksStore.task);

onMounted(async () => {
  await taskListsStore.get(params.taskListId);
  await tasksStore.get(params.taskId);
});
</script>
