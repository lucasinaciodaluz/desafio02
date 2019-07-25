const Joi = require('joi');

module.exports = {
  body: {
    description: Joi.string().required(),
    price: Joi.number().required(),
    quantity: Joi.number().required(),
  },
};
