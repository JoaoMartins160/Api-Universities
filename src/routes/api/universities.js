const express = require('express');
const router = express.Router();
const universitiesController = require('../../controllers/universities.controller');

router.route('/')
    .post(universitiesController.createNewuniversity)
    .put(universitiesController.updateUniversities)
    .delete(universitiesController.deleteUniversities);

router.route('/:id')
    .get(universitiesController.getUniversities);

module.exports = router;