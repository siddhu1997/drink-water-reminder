const router = require('express').Router();
const controller = require('./controller');
const validator = require('./validator');

router.get('/fetchFormResponses', controller.fetchFormResponses);
router.get('/fetchForm', validator.retrieveFormValidator, controller.fetchForm)

module.exports = router;