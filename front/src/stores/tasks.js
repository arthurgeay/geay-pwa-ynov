import { defineStore } from "pinia";
import tasksService from "services/tasks";
import { useTaskListsStore } from "./taskLists";
import { Notify } from "quasar";

export const useTasksStore = defineStore("tasks", {
  state: () => ({
    tasks: [],
    task: null,
  }),

  actions: {
    async getCollection() {
      try {
        this.tasks = await tasksService.getTasks();
      } catch (e) {
        Notify.create({
          type: "negative",
          position: "top",
          message: "Une erreur est survenue lors du chargement des tâches",
        });
      }
    },
    async get(id) {
      try {
        this.task = await tasksService.getTask(id);
      } catch (e) {
        Notify.create({
          type: "negative",
          position: "top",
          message: "Une erreur est survenue lors du chargement de la tâche",
        });
      }
    },
    filteredTasks(taskListId) {
      return this.tasks.filter((task) => task.taskList._id === taskListId);
    },
    getUncompletedTasks(taskListId) {
      return this.tasks.filter(
        (task) => task.taskList._id === taskListId && !task.done
      );
    },
    getCompletedTasks(taskListId) {
      return this.tasks.filter(
        (task) => task.taskList._id === taskListId && task.done
      );
    },
    async create(title, description) {
      try {
        const taskListsStore = useTaskListsStore();

        await tasksService.createTask(
          title,
          description,
          taskListsStore.taskList._id
        );

        await this.getCollection();
      } catch (e) {
        Notify.create({
          type: "negative",
          position: "top",
          message: "Une erreur est survenue lors de la création de la tâche",
        });
      }
    },
    async update(task) {
      try {
        const updatedTask = await tasksService.updateTask(
          task._id,
          task.title,
          task.description ? task.description : " ",
          task.done,
          task.taskList._id
        );

        await this.getCollection();

        if (this.task && this.task._id === task._id) {
          this.task = updatedTask;
        }
      } catch (e) {
        Notify.create({
          type: "negative",
          position: "top",
          message:
            "Une erreur est survenue lors de la modification de la tâche",
        });
      }
    },
    async delete(id) {
      try {
        await tasksService.deleteTask(id);
        await this.getCollection();
      } catch (e) {
        Notify.create({
          type: "negative",
          position: "top",
          message: "Une erreur est survenue lors de la suppression de la tâche",
        });
      }
    },
  },
});
