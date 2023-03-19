const DPI = require('@DPI');

const list = ['Authentication', 'GoogleForms', 'Users', 'WaterLogs'];

try {
	let ModelDBA;
	list.forEach((name) => {
		ModelDBA = require(`./${name}`);
		DPI.factory(name, () => new ModelDBA());
	});
} catch (error) {
	console.error(error);
}
