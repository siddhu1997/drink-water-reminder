class Constants {
    constructor () {
        this.GREEN_WEBHOOK_TYPES = {
            INCOMING_MESSAGE_RECEIVED: "incomingMessageReceived",
        };

        this.GREEN_MESSAGE_TYPES = {
            TEXT: "textMessage",
            TEMPLATE_BUTTON_TEXT: "templateButtonsReplyMessage",
        };

        // activity levels constants
        this.ACTIVITY_LEVELS = {
            SEDENTARY: "sedentary",
            LIGHTLY_ACTIVE: "lightly active",
            MODERATELY_ACTIVE: "moderately active",
            VERY_ACTIVE: "very active",
        };

        // weight constants
        this.WEIGHT_UNITS = {
            KG: "kg",
            LB: "lb",
        };
    }
}

module.exports = Constants;