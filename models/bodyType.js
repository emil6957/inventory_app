const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BodyTypeSchema = new Schema({
    type: { type: String, required: true }
});

BodyTypeSchema.virtual("url").get(function() {
    return `/bodyType/${this._id}`;
});

module.exports = mongoose.model("BodyType", BodyTypeSchema);
