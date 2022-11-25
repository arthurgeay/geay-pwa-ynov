import TaskList from "#components/task-list/task-list-model.js";
import Joi from "joi";

export const index = async (ctx) => {
  try {
    const taskLists = await TaskList.find();
    ctx.ok(taskLists);
  } catch (err) {
    ctx.badRequest({ message: err.message });
  }
};

export const show = async (ctx) => {
  try {
    if (!mongoose.isValidObjectId(ctx.params.id))
      return ctx.notFound({ message: "Not a valid id. TaskList not found." });

    const taskList = await TaskList.findById(ctx.params.id);
    if (!taskList) {
      return ctx.notFound({ message: "TaskList not found" });
    }

    ctx.ok(taskList);
  } catch (e) {
    ctx.badRequest({ message: e.message });
  }
};

export const create = async (ctx) => {
  try {
    const taskListSchemaValidation = Joi.object({
      title: Joi.string().required(),
      favorite: Joi.boolean().default(false),
    });

    const { error, value } = taskListSchemaValidation.validate(
      ctx.request.body
    );
    if (error) throw new Error(error.message);

    const taskList = await TaskList.create(value);
    ctx.ok(taskList);
  } catch (e) {
    ctx.badRequest({ message: e.message });
  }
};

export const update = async (ctx) => {
  try {
    if (!mongoose.isValidObjectId(ctx.params.id))
      return ctx.notFound({ message: "Not a valid id. TaskList not found." });

    const taskListSchemaValidation = Joi.object({
      title: Joi.string().required(),
      favorite: Joi.boolean().default(false),
    });

    const { error, value } = taskListSchemaValidation.validate(
      ctx.request.body
    );
    if (error) throw new Error(error.message);

    const taskList = await TaskList.findByIdAndUpdate(ctx.params.id, value, {
      runValidators: true,
      new: true,
    });
    if (!taskList) {
      return ctx.notFound({ message: "TaskList not found" });
    }

    ctx.ok(taskList);
  } catch (e) {
    ctx.badRequest({ message: e.message });
  }
};

export const destroy = async (ctx) => {
  try {
    if (!mongoose.isValidObjectId(ctx.params.id))
      return ctx.notFound({ message: "Not a valid id. TaskList not found." });

    const taskList = await TaskList.findByIdAndDelete(ctx.params.id);
    if (!taskList) {
      return ctx.notFound({ message: "TaskList not found" });
    }

    ctx.noContent();
  } catch (e) {
    ctx.badRequest({ message: e.message });
  }
};
