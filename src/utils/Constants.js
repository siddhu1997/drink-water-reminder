class Constants {
    constructor () {
        this.GREEN_WEBHOOK_TYPES = {
            INCOMING_MESSAGE_RECEIVED: "incomingMessageReceived",
        };

        this.GREEN_MESSAGE_TYPES = {
            TEXT: "textMessage",
            TEMPLATE_BUTTON_TEXT: "templateButtonsReplyMessage",
        };
    }
}

module.exports = Constants;