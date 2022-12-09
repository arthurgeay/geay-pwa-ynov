import { defineStore } from "pinia";
import taskListService from "services/taskList";
import { useTasksStore } from "./tasks";
import { Notify } from "quasar";

export const useTaskListsStore = defineStore("taskLists", {
  state: () => ({
    taskLists: [],
    taskList: null,
  }),

  getters: {},

  actions: {
    async getCollection() {
      try {
        this.taskLists = await taskListService.getTaskLists();
      } catch (e) {
        Notify.create({
          type: "negative",
          position: "top",
          message:
            "Une erreur est survenue lors du chargement des listes de tâches",
        });
      }
    },
    async get(id) {
      try {
        this.taskList = await taskListService.getTaskList(id);
      } catch (e) {
        Notify.create({
          type: "negative",
          position: "top",
          message:
            "Une erreur est survenue lors du chargement de la liste de tâches",
        });
      }
    },
    async create(data) {
      try {
        await taskListService.createTaskList(data);
        await this.getCollection();
      } catch (e) {
        Notify.create({
          type: "negative",
          position: "top",
          message:
            "Une erreur est survenue lors de la création de la liste de tâches",
        });
      }
    },
    async update(id, data) {
      try {
        const updatedTaskList = await taskListService.updateTaskList(id, data);
        await this.getCollection();

        if (this.taskList && this.taskList._id === id) {
          this.taskList = updatedTaskList;
        }
      } catch (e) {
        Notify.create({
          type: "negative",
          position: "top",
          message:
            "Une erreur est survenue lors de la mise à jour de la liste de tâches",
        });
      }
    },
    async delete(id) {
      try {
        const tasksStore = useTasksStore();
        await taskListService.deleteTaskList(id);

        await this.getCollection();
        await tasksStore.getCollection();
      } catch (e) {
        Notify.create({
          type: "negative",
          position: "top",
          message:
            "Une erreur est survenue lors de la suppression de la liste de tâches",
        });
      }
    },
  },
});
