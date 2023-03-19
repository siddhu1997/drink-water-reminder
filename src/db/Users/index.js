const BaseDBA = require("../BaseDBA");
const model = require("./model");

class Users extends BaseDBA {
    constructor() {
        super(model);
    }
}

module.exports = Users;