const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var bookingSchema = new Schema({
    user_id: { type: String, required: true },
    driver_id: { type: String },
    driver_name: { type: String, required: true },
    pickup_location: {
        type: { type: String },
        coordinates: []
    },
    drop_location: {
        type: { type: String },
        coordinates: []
    },
}, { timestamps: true });

bookingSchema.index({ location: "2dsphere" });
module.exports = mongoose.model('mybooking', bookingSchema);