const mongoose = require('mongoose');

const LevelSchema = new mongoose.Schema({
  _id: String,
  type: String,
  name: {
      de: String,
      en: String
  },
  description: {
      de: String,
      en: String
  }
}, {
  versionKey: false
});


module.exports = mongoose.model('Level', LevelSchema);
