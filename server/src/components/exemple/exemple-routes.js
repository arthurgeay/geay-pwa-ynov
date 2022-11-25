import Router from "@koa/router";
import * as exempleController from "#components/exemple/exemple-controller.js";

const exemples = new Router();

exemples.get("/", exempleController.index);
exemples.get("/:id", exempleController.show);
exemples.post("/", exempleController.create);

export default exemples;
