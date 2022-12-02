<template>
  <q-layout
    view="lHh lpr lFf"
    container
    style="height: 100vh"
    class="shadow-2 rounded-border"
  >
    <q-header class="bg-white text-dark">
      <q-toolbar>
        <q-icon name="arrow_back_ios" @click="$router.push(`/tasklists`)" />
        <q-toolbar-title>{{ taskList?.title }}</q-toolbar-title>

        <q-btn color="grey-7" round flat icon="more_horiz">
          <q-menu auto-close>
            <q-list>
              <q-item clickable @click="updateTaskList(taskList)">
                <q-item-section>Editer</q-item-section>
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
        <div
          class="column"
          v-if="taskList && tasksStore.filteredTasks(taskList._id).length > 0"
        >
          <p class="text-bold">
            Tâches à réaliser -
            {{ tasksStore.getUncompletedTasks(taskList._id).length }}
          </p>
          <div
            class="row justify-between"
            v-for="task in tasksStore.getUncompletedTasks(taskList._id)"
            :key="task._id"
          >
            <q-checkbox
              :label="task.title"
              v-model="task.done"
              @click.prevent="toggleStatus(task)"
            />
            <q-btn
              color="grey-7"
              round
              flat
              icon="visibility"
              @click="
                $router.push(`/tasklists/${taskList._id}/tasks/${task._id}`)
              "
            />
          </div>

          <p class="q-mt-md text-bold">
            Tâches terminées -
            {{ tasksStore.getCompletedTasks(taskList._id).length }}
          </p>
          <div
            class="row justify-between"
            v-for="task in tasksStore.getCompletedTasks(taskList._id)"
            :key="task._id"
          >
            <q-checkbox
              :label="task.title"
              v-model="task.done"
              @click.prevent="toggleStatus(task)"
            />
            <q-btn
              color="grey-7"
              round
              flat
              icon="visibility"
              @click="
                $router.push(`/tasklists/${taskList._id}/tasks/${task._id}`)
              "
            />
          </div>
        </div>

        <q-footer class="">
          <div class="row justify-center">
            <q-btn
              flat
              round
              dense
              icon="add"
              size="1.5em"
              @click="$router.push(`/tasklists/${taskList._id}/tasks/create`)"
            />
          </div>
        </q-footer>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useTaskListsStore } from "stores/taskLists";
import { useTasksStore } from "stores/tasks";
import { useQuasar } from "quasar";
import { onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const { params } = useRoute();
const { push } = useRouter();
const taskListsStore = useTaskListsStore();
const tasksStore = useTasksStore();
const $q = useQuasar();

const taskList = computed(() => taskListsStore.taskList);

onMounted(async () => {
  await taskListsStore.get(params.id);
});

const toggleStatus = async (task) => {
  await tasksStore.update(task._id, { done: !task.done, ...task });
};

const updateTaskList = (taskList) => {
  $q.dialog({
    title: "Modifier une liste",
    message: "Nom de la liste",
    prompt: {
      model: taskList.title,
      isValid: (v) => v && v.length > 0,
      type: "text", // optional
    },
    ok: "Modifier",
    cancel: "Annuler",
    maximized: true,
  })
    .onOk(async (data) => {
      try {
        await taskListsStore.update(taskList._id, data);
      } catch (e) {
        $q.notify({
          type: "negative",
          message:
            "Une erreur est survenue lors de la modification de la liste",
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

const deleteList = (taskList) => {
  $q.dialog({
    title: "Supprimer la liste",
    message: `Vous êtes sur le point de supprimer votre liste "${taskList.title}". Êtes vous sûr de vouloir faire ça ?`,
    cancel: "Annuler",
    ok: "Supprimer",
    persistent: true,
  })
    .onOk(async () => {
      try {
        await taskListsStore.delete(taskList._id);
        push("/tasklists");
      } catch (e) {
        console.log(e);
        $q.notify({
          type: "negative",
          position: "top",
          message: "Une erreur est survenue lors de la suppression de la liste",
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
