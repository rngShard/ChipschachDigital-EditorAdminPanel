const bcrypt = require('bcrypt');
const Joi = require('joi');
const Level = require('../models/level.model');

// const levelSchema = Joi.object({
//   _id: Joi.string().required(),
//   type: Joi.string().required(),
//   name: {
//       de: Joi.string().required(),
//       en: Joi.string().required(),
//   },
//   description: {
//       de: Joi.string().required(),
//       en: Joi.string().required()
//   }
// });


module.exports = {
  getAll
}

// async function insert(user) {
//   user = await Joi.validate(user, userSchema, { abortEarly: false });
//   user.hashedPassword = bcrypt.hashSync(user.password, 10);
//   delete user.password;
//   return await new User(user).save();
// }

async function getAll() {
  return await Level.find();
}
