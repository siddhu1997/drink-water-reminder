const { Schema, model } = require('mongoose');

const GFormsSchema = new Schema({
	formId: { type: String },
	title: { type: String },
	items: [
		{
			itemId: { type: String },
			questionItem: {
				title: { type: String },
				questionId: { type: String }
			}
		}
	]
});

GFormsSchema.index({ formId: 1 });
module.exports = model('gforms', GFormsSchema);
