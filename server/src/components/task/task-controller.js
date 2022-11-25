import Task from "#components/task/task-model.js";
import Joi from "joi";
import mongoose from "mongoose";

export const index = async (ctx) => {
  try {
    const tasks = await Task.find();
    ctx.ok(tasks);
  } catch (err) {
    ctx.badRequest({ message: err.message });
  }
};

export const show = async (ctx) => {
  try {
    if (!mongoose.isValidObjectId(ctx.params.id))
      return ctx.notFound({ message: "Not a valid id. Task not found." });

    const task = await Task.findById(ctx.params.id).populate("taskList");
    if (!task) {
      return ctx.notFound({ message: "Task not found" });
    }

    ctx.ok(task);
  } catch (e) {
    ctx.badRequest({ message: e.message });
  }
};

export const create = async (ctx) => {
  try {
    const taskSchemaValidation = Joi.object({
      title: Joi.string().required(),
      description: Joi.string(),
      status: Joi.string().valid("todo", "done").default("todo"),
      taskList: Joi.string().required(),
    });

    const { error, value } = taskSchemaValidation.validate(ctx.request.body);
    if (error) throw new Error(error.message);

    const task = await Task.create(value);
    ctx.ok(task);
  } catch (e) {
    ctx.badRequest({ message: e.message });
  }
};

export const update = async (ctx) => {
  try {
    if (!mongoose.isValidObjectId(ctx.params.id))
      return ctx.notFound({ message: "Not a valid id. Task not found." });

    const taskSchemaValidation = Joi.object({
      title: Joi.string().required(),
      description: Joi.string(),
      status: Joi.string().valid("todo", "done").required(),
      taskList: Joi.string().required(),
    });

    const { error, value } = taskSchemaValidation.validate(ctx.request.body);
    if (error) throw new Error(error.message);

    const task = await Task.findByIdAndUpdate(ctx.params.id, value, {
      runValidators: true,
      new: true,
    });
    if (!task) {
      return ctx.notFound({ message: "Task not found" });
    }

    ctx.ok(task);
  } catch (e) {
    ctx.badRequest({ message: e.message });
  }
};

export const destroy = async (ctx) => {
  try {
    if (!mongoose.isValidObjectId(ctx.params.id))
      return ctx.notFound({ message: "Not a valid id. Task not found." });

    const task = await Task.findByIdAndDelete(ctx.params.id);
    if (!task) {
      return ctx.notFound({ message: "Task not found" });
    }

    ctx.noContent();
  } catch (e) {
    ctx.badRequest({ message: e.message });
  }
};
