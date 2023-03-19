const DPI = require('@DPI');

const list = ['Axios', 'Google', 'Green', 'Locale'];

try {
	let Service;
	list.forEach((name) => {
		Service = require(`./${name}`);
		DPI.factory(name, () => new Service());
	});
} catch (error) {
	console.error(error);
}
