const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var cabSchema = new Schema({
    driver_name: { type: String, required: true },
    location: {
        type: { type: String, required: true },
        coordinates: []
    },
}, { timestamps: true });

cabSchema.index({ location: "2dsphere" });
module.exports = mongoose.model('cab', cabSchema);