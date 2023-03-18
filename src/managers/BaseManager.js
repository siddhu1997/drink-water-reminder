const DPI = require('@DPI');
const EventEmitter = require('events');

class BaseManager extends EventEmitter {
    constructor() {
        super();
        this.DPI = DPI;
    }
};

module.exports = BaseManager;