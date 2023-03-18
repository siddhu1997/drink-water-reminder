const DPI = require('@DPI');
const config = require('config');
const client = require("@green-api/whatsapp-api-client");

class WhatsappService {
    constructor () {
        this.restAPI = client.restAPI({
            idInstance: DPI.get('Secrets').get("GREEN_ID_INSTANCE"),
            apiTokenInstance: DPI.get('Secrets').get("GREEN_API_TOKEN_INSTANCE")
        });
        this.setWebhookSettings();
        this.webhookAPI = null;
    }

    async setWebhookSettings() {
        await this.restAPI.settings.setSettings({
            webhookUrl: `${DPI.get("Secrets").get("BASE_URL")}${config.get("GREEN_WEBHOOK_PATH")}`,
        })
    }

    getRestAPIClient() {
        return this.restAPI;
    }

    initializeWebHookClient(app) {
        if (!app) {
            throw new Error("Express app missing!");
        }
        this.webhookAPI = client.webhookAPI(app, config.get("GREEN_WEBHOOK_PATH"));
    }

    getWebhookAPIClient() {
        return this.webhookAPI;
    }
}

module.exports = WhatsappService;