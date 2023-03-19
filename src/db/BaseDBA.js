class BaseDBA {
    constructor(model) {
        if (!model) {
            throw new Error("Missing model parameter!");
        }
        this.model = model;
    }

    findOne(query, options = {}) {
        return this.model.findOne(query, options);
    }

    findOneAndUpdate(query, update, options = {}) {
        return this.model.findOneAndUpdate(query, update, options);
    }

    create(document) {
        return this.model.create(document);
    }
}

module.exports = BaseDBA;