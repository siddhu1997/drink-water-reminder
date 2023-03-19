const DPI = require("@DPI");
const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
{
    name: { type: String },
    whatsappId: { type: String },
    intro: { type: Boolean, default: false },
    physicalAttributes: {
        weight: { type: Number },
        weightUnit: { type: String, enum: Object.values(DPI.get("Constants").WEIGHT_UNITS) },
        activityLevel: { type: String, enum: Object.values(DPI.get("Constants").ACTIVITY_LEVELS) },
    },
    dob: { type: Date },
    recommendedWaterIntake: { type: Number },
    locale: { type: String, default: "en-US" },
},
{ timestamps: true }
);

UserSchema.index({ whatsappId: 1 });

module.exports = model("user", UserSchema);