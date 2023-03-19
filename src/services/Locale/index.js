const i18next = require('i18next');

const resources = {};
const supportedLanguages = ['en-US'];

supportedLanguages.forEach((language) => {
	resources[language] = require(`./locales/${language}`);
});

i18next.init({
	lng: 'en-US',
	resources,
	ns: ['global', 'message'],
	supportedLngs: supportedLanguages,
	fallbackLng: 'en-US',
	fallbackNS: 'global',
	returnObjects: true
});

class Locale {
	constructor() {
		this.i18next = i18next;
		this.defaultLocale = 'en-US';
	}

	/**
	 * Validates if the current locale is supported or not, if not returns the default locale.
	 * @param {String} loc locale to be verified
	 * @returns {String} if the _locale is valid then returns the same else the default locale.
	 */
	validateLocale(loc) {
		if (supportedLanguages.includes(loc)) {
			return loc;
		}
		return this.defaultLocale;
	}

	/**
	 * Wrapper over i18next's translate function, validates/defaults incoming locale and returns the translated string
	 * @param {String} phrase text to be fetched
	 * @param {String} currLocale current locale
	 * @param {String} ns namespace
	 * @param {Object} params used for interpolation
	 * @returns {String} if the _locale is valid then returns the same else the default locale.
	 */
	translate(phrase, currLocale, ns, params = {}) {
		const lng = this.validateLocale(currLocale);
		return this.i18next.t(phrase, { lng, ns, ...params });
	}
}

module.exports = Locale;
