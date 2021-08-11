import Joi from "joi";

const emailSchema = Joi.string().email();
const imageSchema = Joi.string().uri();
const nameSchema = Joi.string().max(60);
const usernameSchema = Joi.string().max(30);

export const idSchema = Joi.string().regex(/^[0-9a-fA-F]{24}$/);

export const createUserSchema = Joi.object({
  email: emailSchema.required(),
  name: nameSchema.required(),
  userImage: imageSchema,
  username: usernameSchema.required(),
});
