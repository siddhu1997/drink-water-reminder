const BaseDBA = require('../BaseDBA');
const model = require('./model');

class GoogleFormsDBA extends BaseDBA {
    constructor() {
        super(model);
    }
}

module.exports = GoogleFormsDBA;