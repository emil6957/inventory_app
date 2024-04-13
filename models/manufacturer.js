const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ManufacturerSchema = new Schema({
    name: { type: String, required: true },
    yearFounded: { type: Number, required: true },
});

ManufacturerSchema.virtual("url").get(function() {
    return `/manufacturer/${this._id}`;
});

module.exports = mongoose.model(ManufacturerSchema);
