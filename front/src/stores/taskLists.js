import { defineStore } from "pinia";
import taskListService from "services/taskList";

export const useTaskListsStore = defineStore("taskLists", {
  state: () => ({
    taskLists: [],
  }),

  getters: {},

  actions: {
    async getCollection() {
      this.taskLists = await taskListService.getTaskLists();
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
    },
    async delete(id) {
      await taskListService.deleteTaskList(id);
      this.taskLists = this.taskLists.filter((taskList) => taskList._id !== id);
    },
  },
});
