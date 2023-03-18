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
                this.restAPI.message.sendTemplateButtons(senderData.sender, `From Bot:\n\n${message}`,"Give rating?", [
                    {index: 0, quickReplyButton: {displayText: "1", "id": "1"}},
                    {index: 1, quickReplyButton: {displayText: "2", "id": "2"}},
                    {index: 2, quickReplyButton: {displayText: "3", "id": "3"}}
                ])
                // this.restAPI.message.sendMessage(senderData.sender, null, `Echo:\n\n${message}`);
            }
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    async processIncomingMessageTemplateButtonText(data) {
        try {
            const { messageData, senderData } = data;
            const { stanzaId, selectedId } = messageData.templateButtonReplyMessage;
            console.log(stanzaId, selectedId);
            if (selectedId) {
                this.restAPI.message.sendMessage(senderData.sender, null, `Recorded ${selectedId} rating`);
            }
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }
}

module.exports = WhatsappWebhookManager;