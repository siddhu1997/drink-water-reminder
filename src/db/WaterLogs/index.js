const BaseDBA = require("../BaseDBA");
const model = require("./model");

class WaterLogs extends BaseDBA {
    constructor() {
        super(model);
    }
}

module.exports = WaterLogs;