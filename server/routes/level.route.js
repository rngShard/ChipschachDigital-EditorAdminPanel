const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const levelCtrl = require('../controllers/level.controller');

const router = express.Router();
module.exports = router;

// router.use(passport.authenticate('jwt', { session: false }));

router.route('/').get(asyncHandler(getAllLevels));
router.route('/:id/:query').get(asyncHandler(updateLevel));


async function getAllLevels(req, res) {
  let levels = await levelCtrl.getAll();
  res.json(levels);
}
async function updateLevel(req, res) {
  let levelId = req.params.id;
  let mongoQuery = req.params.query;
  let updatedLevel = await levelCtrl.update(levelId, mongoQuery);
  res.json(updatedLevel);
}
