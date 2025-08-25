import coreJoi from "joi";
const Joi = coreJoi as typeof coreJoi;

export const userRegistrationSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required().required(),
  phone: Joi.string()
    .length(10)
    .pattern(/^\d{10}$/),
  address: Joi.string(),
});
export const productCreateSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  description: Joi.string(),
  category: Joi.string(),
  price: Joi.number().required(),
  stock: Joi.number().required(),
});
export const productUpdateSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  description: Joi.string(),
  category: Joi.string(),
  price: Joi.number(),
  stock: Joi.number(),
});

const itemSchema = Joi.object({
  productId: Joi.number().required(),
  quantityPurchased: Joi.number().required(),
});

export const createOrderSchema = Joi.object({
  customerId: Joi.number().required(),
  items: Joi.array().items(itemSchema),
});
