const BaseDBA = require("../BaseDBA");
const model = require("./model");

class Authentication extends BaseDBA {
    constructor() {
        super(model);
    }
}

module.exports = Authentication;