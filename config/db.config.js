var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect(process.env.DB_CONN, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Successfully connected to the database");
        db.collection('cabs').createIndex({ location: "2dsphere" })
    }).catch(err => {
        console.log("Could not connect to database", err);
    })

var db = mongoose.connection;
module.exports = db;