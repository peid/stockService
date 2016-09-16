'use strict';
var soajs = require('soajs');
var config = require('../config.js');
var utils = require('soajs/lib/').utils;


var Mongo = soajs.mongo;
var mongo;

var dbName = "stock";
var productsCollection = "products";
var usersCollection = "users";
var operationCollection = "operation";

function checkIfMongo(soajs) {
	if (!mongo) {
		mongo = new Mongo(soajs.registry.coreDB[dbName]);
	}
}

function validateId(id, cb) {
	try {
		return cb(null, mongo.ObjectId(id));
	}
	catch (e) {
		return cb(e);
	}
}


module.exports = {

	"login": function (soajs, cb) {
		checkIfMongo(soajs);
		var criteria = {'username': soajs.inputmaskData['username']};
		var pattern = soajs.validator.SchemaPatterns.email;
		if (pattern.test(soajs.inputmaskData['username'])) {
			delete criteria.username;
			criteria.email = soajs.inputmaskData['username'];
		}
		mongo.findOne(usersCollection, criteria, function (error, user) {
			if (error) {
				return cb(error);
			}
			if (!user) {
				return cb({"code": 409});
			}
			if (soajs.inputmaskData.password === user.password) {
				var condition = {};
				if (user.privilege === 1) {
					condition.uid = user._id.toString();
				}
				mongo.find(productsCollection, {}, function (error, products) {
					if (error) {
						return cb(error);
					}
					mongo.find(operationCollection, condition, function (error, operations) {
						if (error) {
							return cb(error);
						}
						mongo.find(usersCollection, {}, {"username": 1, "privilege": 1}, function (error, users) {
							if (error) {
								return cb(error);
							}
							var response = {
								"products": products,
								"operations": operations,
								"privilege": user.privilege,
								"uid": user._id.toString()
							};
							if (user.privilege === 0) {
								response.users = users;
							}
							return cb(null, response);
						});
					});
				});
			}
			else {
				return cb({"code": 408});
			}
		});
	}
};