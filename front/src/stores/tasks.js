import { defineStore } from "pinia";
import tasksService from "services/tasks";

export const useTasksStore = defineStore("tasks", {
  state: () => ({
    tasks: [],
  }),

  actions: {
    async getCollection() {
      this.tasks = await tasksService.getTasks();
    },
    filteredTasks(taskListId) {
      return this.tasks.filter((task) => task.taskList === taskListId);
    },
  },
});
