const dayjs = require('dayjs');
const BaseManager = require('../BaseManager');

class AuthenticationManager extends BaseManager {
    constructor() {
        super();
        this.db = this.DPI.get("Authentication");
    }

    async fetchGoogleAccessToken() {
        return this.db.findOne({ type: "google" });
    }

    async storeGoogleAccessToken(accessToken) {
        const data = {
            accessToken,
            expiresAt: dayjs().add(59, 'minutes').toISOString(),
            type: "google"
        }
        return this.db.create(data);
    }
}

module.exports = AuthenticationManager;