var functions = require('../functions');
// var db = require('../config/db.config');
var cabSchema = require('../model/cab.model');
var bookingSchmea = require('../model/booking.model');

//book cab

exports.bookcab = async(req, res) => {
    try {
        const data = await cabSchema.find({
            location: {
                $near: {
                    $maxDistance: 5000,
                    $geometry: {
                        type: "Point",
                        coordinates: [req.body.lat1, req.body.long1]
                    }
                }
            }
        });

        if (!data.length) {
            res.json({ 'message': 'Cabs not found' })
        }
        console.log(data)

        var book = new bookingSchmea({
            user_id: req.session.user._id,
            driver_id: data[0]._id,
            driver_name: data[0].driver_name,
            pickup_location: {
                type: req.body.point,
                coordinates: [req.body.lat1, req.body.long2]
            },
            drop_location: {
                type: req.body.point,
                coordinates: [req.body.lat2, req.body.long2]
            }
        })
        console.log("::::::::", book)
        const mybooking = await book.save();
        return res.json({ 'messagem': 'cab booked successfully', 'data': mybooking })
        console.log(mybooking)

    } catch (err) {
        console.log(err)
        return res.json({ 'err': err })
    }
}

//dummy api for inserting cab detail

exports.cabdetail = async(req, res) => {
    try {
        var user = new cabSchema({
            driver_name: req.body.driver_name,
            location: {
                type: req.body.point,
                coordinates: [req.body.lat, req.body.long]
            }
        })

        var detail = await user.save();
        return res.json({ 'cab detail': detail, 'message': 'Insert successfully' })
    } catch (err) {
        console.log(err)
        req.message = err.message;
        // res.json({ 'message': err.message, 'err': err });
        return functions.sendErrorResponse(req, res, 400, req.message)
    }
}

//get booking details

exports.mybooking = async(req, res) => {
    try {

        const { _id } = req.session.user
        console.log(_id)
        const data = await bookingSchmea.find({ user_id: _id });

        if (!data.length) {

            return res.json({ 'message': 'Data not found' })
        }
        return res.json(data);

    } catch (err) {
        console.log(err)
        return res.json({ 'message': err.message, 'err': err })
    }
}

// get nearby cabs

exports.nearbycabs = async(req, res) => {
    try {
        const cabs = await cabSchema.find({
            location: {
                $near: {
                    $maxDistance: 5000,

                    $geometry: {
                        type: "Point",
                        coordinates: [req.params.lat, req.params.long]
                    }
                }
            }
        });

        if (!cabs.length) {
            return res.json({ 'message': 'Cabs not found' })
        }
        return res.json({ 'cabs': cabs });

    } catch (err) {
        return res.json({ 'err': err, 'message': err.message })
    }
}