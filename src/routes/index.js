const config = require('config');
const DPI = require('@DPI');
const { Router } = require('express');

const router = Router();

router.get('/health', (_req, res) => {
    res.status(200).json({ status: 'OK' });
});

router.post(config.get("GREEN_WEBHOOK_PATH"), async (req, res) => {
    try {
        const { body } = req;
        console.log(body);
        const { GREEN_WEBHOOK_TYPES, GREEN_MESSAGE_TYPES } = DPI.get("Constants");
        if (body.typeWebhook === GREEN_WEBHOOK_TYPES.INCOMING_MESSAGE_RECEIVED) {
                if(body.messageData.typeMessage === GREEN_MESSAGE_TYPES.TEXT) {
                    DPI.get("WhatsappWebhookManager").processIncomingMessageText(body);
                } else if(body.messageData.typeMessage === GREEN_MESSAGE_TYPES.TEMPLATE_BUTTON_TEXT) {
                    DPI.get("WhatsappWebhookManager").processIncomingMessageTemplateButtonText(body);
                }
        }
        res.send();
    } catch(error) {
        console.error(error);
    }
});

module.exports = router;