import { defineStore } from "pinia";
import tasksService from "services/tasks";
import { useTaskListsStore } from "./taskLists";

export const useTasksStore = defineStore("tasks", {
  state: () => ({
    tasks: [],
    task: null,
  }),

  actions: {
    async getCollection() {
      this.tasks = await tasksService.getTasks();
    },
    async get(id) {
      this.task = await tasksService.getTask(id);
    },
    filteredTasks(taskListId) {
      return this.tasks.filter((task) => task.taskList === taskListId);
    },
    getUncompletedTasks(taskListId) {
      return this.tasks.filter(
        (task) => task.taskList === taskListId && !task.done
      );
    },
    getCompletedTasks(taskListId) {
      return this.tasks.filter(
        (task) => task.taskList === taskListId && task.done
      );
    },
    async create(title, description) {
      const taskListsStore = useTaskListsStore();

      await tasksService.createTask(
        title,
        description,
        taskListsStore.taskList._id
      );

      await this.getCollection();
    },
    async update(task) {
      await tasksService.updateTask(
        task._id,
        task.title,
        task.description ? task.description : " ",
        task.done,
        task.taskList._id
      );

      await this.getCollection();
    },
    async delete(id) {
      await tasksService.deleteTask(id);
      await this.getCollection();
    },
  },
});
