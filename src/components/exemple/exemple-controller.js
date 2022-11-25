import Exemple from "#components/exemple/exemple-model.js";
import Joi from "joi";

export const index = async (ctx) => {
  try {
    const exemples = await Exemple.find();
    ctx.ok(exemples);
  } catch (err) {
    ctx.badRequest({ message: err.message });
  }
};

export const show = async (ctx) => {
  // ctx.query (?)
  // ctx.params (/:id)
  ctx.ok({ id: ctx.params.id });
};

export const create = async (ctx) => {
  try {
    const exempleValidationSchema = Joi.object({
      firstname: Joi.string().required(),
      lastname: Joi.string().required(),
      birthdate: Joi.date(),
    });

    const { error, value } = exempleValidationSchema.validate(ctx.request.body);

    if (error) {
      throw new Error(error);
    }

    const newExemple = await Exemple.create(value);
    ctx.ok(newExemple);
  } catch (err) {
    ctx.badRequest({ message: err.message });
  }
};
