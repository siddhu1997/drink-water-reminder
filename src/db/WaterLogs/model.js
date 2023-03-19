const { Schema, model, Types} = require("mongoose");

const WaterLogSchema = new Schema(
{
    user: { type: Types.ObjectId, ref: "users" },
    intakeTime: { type: Date },
    liquidType: { type: String },
},
{ timestamps: true }
);

WaterLogSchema.index({ user: 1 });

module.exports = model("waterlog", WaterLogSchema);