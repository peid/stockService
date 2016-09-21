'use strict';
var bcrypt = require('bcrypt');

var hasher = function(config) {
    this.config = config;
};

hasher.prototype.hashAsync = function(plainText, cb) {
    bcrypt.genSalt(this.config.hashIterations, this.config.seedLength, function(err, salt) {
        if(err) return cb(err);
        bcrypt.hash(plainText, salt, cb);
    });
};

hasher.prototype.hashSync = function(plainText) {
    var salt = bcrypt.genSaltSync(this.config.hashIterations, this.config.seedLength);
    return bcrypt.hashSync(plainText, salt);
};

hasher.prototype.compare = function(plainText, hashText, cb) {
    return bcrypt.compare(plainText, hashText, cb);
};

module.exports = hasher;