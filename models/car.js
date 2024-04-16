const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CarSchema = new Schema({
    name: { type: String, required: true },
    productionStartYear: { type: Number, required: true },
    productionEndYear: { type: Number },
    bodyType: { type: Schema.Types.ObjectId, ref: "BodyType", required: true },
    manufacturer: { type: Schema.Types.ObjectId, ref: "Manufacturer", required: true },
    price: { type: Number, required: true },
    amntInStock: { type: Number, required: true },
});

CarSchema.virtual("url").get(function() {
    return `/car/${this._id}`;
});

CarSchema.virtual("productionLifespan").get(function() {
    let productionLifespan = "";
    if (this.productionStartYear && this.productionEndYear) {
        productionLifespan = this.productionEndYear - this.productionStartYear;
    }
    return productionLifespan;
});

module.exports = mongoose.model("Car", CarSchema);
