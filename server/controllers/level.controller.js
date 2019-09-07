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
  getAll,
  update
}

async function getAll() {
  return await Level.find();
}

async function update(id, query) {
  let mongoQueryObject = JSON.parse(query);
  console.log(`{_id: ${id}},${mongoQueryObject}`);
  // return;
  return await Level.updateOne({_id: id}, mongoQueryObject);
}
