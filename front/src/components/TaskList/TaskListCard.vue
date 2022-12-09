<template>
  <q-card bordered class="card q-mt-lg">
    <q-card-section class="bg-grey-2">
      <div class="row items-center no-wrap">
        <div class="col">
          <div class="text-h6 text-bold">{{ taskList.title }}</div>
        </div>

        <div class="col-auto">
          <q-btn color="grey-7" round flat icon="more_horiz">
            <q-menu auto-close>
              <q-list>
                <q-item clickable @click="updateTaskList(taskList)">
                  <q-item-section>Editer</q-item-section>
                </q-item>
                <q-item clickable @click="deleteList(taskList)">
                  <q-item-section class="text-negative"
                    >Supprimer</q-item-section
                  >
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </div>
    </q-card-section>

    <q-card-section>
      <div
        class="column"
        v-if="tasksStore.filteredTasks(taskList._id).length > 0"
      >
        <q-checkbox
          v-for="task in tasksStore.filteredTasks(taskList._id).slice(0, 2)"
          :class="task.done ? 'text-strike' : ''"
          :key="task._id"
          :label="task.title"
          v-model="task.done"
          color="positive"
          @click="toggleStatus(task)"
        />
      </div>

      <p v-else class="text-grey-6">
        Cette liste ne contient aucune tâches. Ajoutez en une depuis la liste.
      </p>
    </q-card-section>

    <q-separator />

    <q-card-actions class="row justify-center">
      <q-btn flat no-caps @click="$router.push(`/tasklists/${taskList._id}`)"
        >Voir la liste complète</q-btn
      >
    </q-card-actions>
  </q-card>
</template>

<script setup>
import { useQuasar } from "quasar";
import { useTaskListsStore } from "stores/taskLists";
import { useTasksStore } from "stores/tasks";

const $q = useQuasar();
const taskListsStore = useTaskListsStore();
const tasksStore = useTasksStore();

defineProps({
  taskList: {
    type: Object,
    required: true,
  },
});

const toggleStatus = async (task) => {
  await tasksStore.update(task);
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
      await taskListsStore.delete(taskList._id);
    })
    .onCancel(() => {
      // console.log('>>>> Cancel')
    })
    .onDismiss(() => {
      // console.log('I am triggered on both OK and Cancel')
    });
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
      await taskListsStore.update(taskList._id, data);
    })
    .onCancel(() => {
      // console.log('>>>> Cancel')
    })
    .onDismiss(() => {
      // console.log('I am triggered on both OK and Cancel')
    });
};
</script>

<style scoped>
.card {
  border-radius: 10px;
}
</style>
