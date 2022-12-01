import Router from "@koa/router";
import * as taskListController from "#components/task-list/task-list-controller.js";

const taskLists = new Router();

taskLists.get("/", taskListController.index);
taskLists.get("/:id", taskListController.show);
taskLists.post("/", taskListController.create);
taskLists.put("/:id", taskListController.update);
taskLists.delete("/:id", taskListController.destroy);

export default taskLists;
