const config = require('config');
const { Router } = require('express');
const controller = require('./controller');

const router = Router();

router.get('/health', (_req, res) => {
	res.status(200).json({ status: 'OK' });
});

router.post(config.get('GREEN_WEBHOOK_PATH'), controller.greenWebhookController);

router.use('/internal', require('./internal'));

module.exports = router;
