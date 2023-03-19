const { Schema, model } = require('mongoose');

const AuthenticationSchema = new Schema(
	{
		accessToken: { type: String },
		expiresAt: { type: Date },
		type: { type: String }
	},
	{ timestamps: true }
);

AuthenticationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = model('authentication', AuthenticationSchema);
