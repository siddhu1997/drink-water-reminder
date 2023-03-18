const BaseManager = require('../BaseManager');

class WhatsappWebhookManager extends BaseManager {
    constructor() {
        super();
        this.restAPI = this.DPI.get("Green").getRestAPIClient();
    }

    async processIncomingMessageText(data) {
        try {
            const { messageData, senderData } = data;
            const message = messageData.textMessageData.textMessage;
            if (message) {
                this.restAPI.message.sendMessage(senderData.sender, null, `Echoed:\n\n${message}`);
            }
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }
}

module.exports = WhatsappWebhookManager;