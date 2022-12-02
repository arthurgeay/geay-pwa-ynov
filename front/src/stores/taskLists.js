import { defineStore } from "pinia";
import taskListService from "services/taskList";
import { useTasksStore } from "./tasks";

export const useTaskListsStore = defineStore("taskLists", {
  state: () => ({
    taskLists: [],
    taskList: null,
  }),

  getters: {},

  actions: {
    async getCollection() {
      this.taskLists = await taskListService.getTaskLists();
    },
    async get(id) {
      this.taskList = await taskListService.getTaskList(id);
    },
    async create(data) {
      await taskListService.createTaskList(data);
      await this.getCollection();
    },
    async update(id, data) {
      const updatedTaskList = await taskListService.updateTaskList(id, data);
      await this.getCollection();

      if (this.taskList && this.taskList._id === id) {
        this.taskList = updatedTaskList;
      }
    },
    async delete(id) {
      const tasksStore = useTasksStore();
      await taskListService.deleteTaskList(id);

      await this.getCollection();
      await tasksStore.getCollection();
    },
  },
});
