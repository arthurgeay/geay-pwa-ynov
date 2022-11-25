import Router from "@koa/router";
import * as taskController from "#components/task/task-controller.js";

const tasks = new Router();

tasks.get("/", taskController.index);
tasks.get("/:id", taskController.show);
tasks.post("/", taskController.create);
tasks.put("/:id", taskController.update);
tasks.delete("/:id", taskController.destroy);

export default tasks;
