const axios = require('axios');

class Axios {
	constructor() {
		this.axios = axios.create({
			headers: {
				'Content-Type': 'application/json'
			}
		});
		this.axios.interceptors.response.use(
			(response) => response,
			(error) => {
			  if (error.response) {
				if (error.response.status >= 500) {
				  console.error(
					error,
					"Failed to create axios post api call with 5xx status code",
					"services/Axios.js"
				  );
				} else if (error.response.status >= 400) {
				  console.error(
					error,
					"Failed to create axios post api call with 4xx status code",
					"services/Axios.js"
				  );
				}
			  }
			  return Promise.reject(error);
			}
		  );
	}

	/**
	 * Makes a POST request using the axios library
	 * @param {string} url - The URL to make the request to
	 * @param {object} body - Request body
	 * @param {object} [headers={}] - Optional headers to send with the request
	 * @returns {Promise<object>} - The response from the server
	 */
	async postCall(url, body, headers = {}) {
		try {
			const response = await this.axios.post(url, body, {
				headers: {
					...this.axios.defaults.headers,
					...headers
				}
			});
			return response;
		} catch (error) {
			console.error(error);
			return Promise.reject(error);
		}
	}

	/**
	 * 
	 * @param {String} url - The url to make request to
	 * @param {object} [headers={}] - Optional headers to send with the request
	 * @returns {Promise<object>} - The response from the server
	 */
	async getCall(url, headers = {}) {
		try {
			const response = await this.axios.get(url, {
				headers
			});
			return response;
		} catch (error) {
			console.error(error);
			return Promise.reject(error);
		}
	}
}

module.exports = Axios;
