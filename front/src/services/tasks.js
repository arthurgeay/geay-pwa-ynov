import { api } from "boot/axios";

const getTasks = async () => {
  const response = await api.get("/tasks");
  return response.data;
};

const getTask = async (id) => {
  const response = await api.get(`/tasks/${id}`);
  return response.data;
};

const createTask = async (title, description, taskList) => {
  const response = await api.post("/tasks", { title, description, taskList });
  return response.data;
};

const updateTask = async (taskId, title, description, done, taskList) => {
  const response = await api.put(`/tasks/${taskId}`, {
    title,
    description,
    done,
    taskList,
  });
  return response.data;
};

const deleteTask = async (id) => {
  const response = await api.delete(`/tasks/${id}`);
  return response.data;
};

export default { getTasks, getTask, createTask, updateTask, deleteTask };
