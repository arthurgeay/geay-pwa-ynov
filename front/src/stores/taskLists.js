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
      const task = await taskListService.createTaskList(data);
      this.taskLists.push(task);
    },
    async update(id, data) {
      const updatedTaskList = await taskListService.updateTaskList(id, data);
      const indexToUpdate = this.taskLists.findIndex(
        (taskList) => taskList._id === id
      );

      this.taskLists[indexToUpdate] = updatedTaskList;

      if (this.taskList && this.taskList._id === id) {
        this.taskList = updatedTaskList;
      }
    },
    async delete(id) {
      const tasksStore = useTasksStore();
      await taskListService.deleteTaskList(id);
      this.taskLists = this.taskLists.filter((taskList) => taskList._id !== id);
      tasksStore.tasks = tasksStore.tasks.filter(
        (task) => task.taskList !== id
      );
    },
  },
});
