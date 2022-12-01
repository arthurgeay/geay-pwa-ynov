import { api } from "boot/axios";

const getTasks = async () => {
  const response = await api.get("/tasks");
  return response.data;
};

export { getTasks };
