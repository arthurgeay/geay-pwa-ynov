import { api } from "boot/axios";

const getTaskLists = async () => {
  const response = await api.get("/task-lists");
  return response.data;
};

const getTasksFromTaskList = async (taskListId) => {
  const response = await api.get(`/task-lists/${taskListId}/tasks`);
  return response.data;
};

const createTaskList = async (title) => {
  const response = await api.post("/task-lists", { title });
  return response.data;
};

const updateTaskList = async (taskListId, title) => {
  const response = await api.put(`/task-lists/${taskListId}`, { title });
  return response.data;
};

const deleteTaskList = async (taskListId) => {
  const response = await api.delete(`/task-lists/${taskListId}`);
  return response.data;
};

export default {
  getTaskLists,
  getTasksFromTaskList,
  createTaskList,
  updateTaskList,
  deleteTaskList,
};
