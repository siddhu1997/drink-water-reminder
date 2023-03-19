const config = require('config');
const DPI = require('@DPI');
const jwt = require('jsonwebtoken');

class Google {
	constructor() {
		this.formId = config.get('GOOGLE_ONBOARDING_FORM_ID');
		this.scopes = config.get('GOOGLE_APIS.FORMS_SCOPES');
		this.clientEmail = DPI.get('Secrets').get('GOOGLE_APIS.CLIENT_EMAIL');
		this.privateKey = DPI.get('Secrets').get('GOOGLE_APIS.PRIVATE_KEY');
	}

	async getAccessToken() {
		try {
			const auth = await DPI.get(
				'AuthenticationManager'
			).fetchGoogleAccessToken();
			if (auth) {
				return auth.accessToken;
			}
            const payload = {
                iss: this.clientEmail,
                scope: this.scopes.join(' '),
                aud: 'https://oauth2.googleapis.com/token',
                exp: Math.floor(Date.now() / 1000) + 60 * 60,
                iat: Math.floor(Date.now() / 1000)
            }
            const token = jwt.sign(payload, this.privateKey, { algorithm: 'RS256' });
            const { data: credentials } = await DPI.get('Axios').postCall('https://oauth2.googleapis.com/token', {
                grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
                assertion: token
            });
            if (credentials) {
                await DPI.get('AuthenticationManager').storeGoogleAccessToken(credentials.access_token);
                return credentials.access_token;
            }
            return Promise.resolve();
		} catch (error) {
			console.error(error);
            return Promise.reject(error);
		}
	}

    async retrieveForm(formId) {
        try {
            const auth = await this.getAccessToken();
            if (auth) {
                const endpoint = `${config.get('GOOGLE_APIS.FORMS_BASE_URL')}/${formId}`;
                const apiResult = await DPI.get('Axios').getCall(endpoint, {
                    Authorization: `Bearer ${auth}`
                });
                return apiResult.data;
            }
            return Promise.resolve();
        } catch (error) {
            console.error(error);
            return Promise.reject(error);
        }
    }

	async retrieveAllFormResponses() {
		try {
			const auth = await this.getAccessToken();
			if (auth) {
				const endpoint = `${config.get('GOOGLE_APIS.FORMS_BASE_URL')}/${
					this.formId
				}/responses`;
				const apiResult = await DPI.get('Axios').getCall(endpoint, {
					Authorization: `Bearer ${auth}`
				});
				if (apiResult) {
                    return apiResult.data.responses;
				}
			}
            return [];
		} catch (error) {
			console.error(error);
            return Promise.reject(error);
		}
	}
}

module.exports = Google;
