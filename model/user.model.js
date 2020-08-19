const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var userSchema = new Schema({
    email: { type: String, trim: true, lowercase: true, unique: true, required: 'Email address is required', match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'] },
    password: { type: String, minlength: 4, required: true },
    mobile: { type: Number, required: true },
    username: { type: String },
}, { timestamps: true });

userSchema.pre('save', function(next) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));
    next();
});

// Comparing Passwords
userSchema.methods.comparePassword = function(password, hash) {
    return bcrypt.compareSync(password, hash);
}

module.exports = mongoose.model('Detail', userSchema);