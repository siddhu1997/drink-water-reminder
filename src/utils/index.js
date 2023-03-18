/* eslint-disable */
const DPI = require('@DPI');
const list = ["Constants","Secrets"];

try {
    let Util;
    list.forEach((name) => {
        Util = require(`./${name}.js`);
        DPI.factory(name, () => new Util());
    });
} catch (error) {
    console.error(error);
}