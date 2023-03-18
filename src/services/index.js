const DPI = require('@DPI');

const list = ["Green"];

try {
    let Service;
    list.forEach((name) => {
        Service = require(`./${name}`);
        DPI.factory(name, () => new Service());
    });
} catch (error) {
    console.error(error);
}