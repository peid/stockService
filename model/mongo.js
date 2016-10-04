'use strict';
var soajs = require('soajs');
var config = require('../config.js');
var Hasher = require("../hasher.js");


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

function encryptPwd(pwd, config) {
	var hashConfig = {
		"hashIterations": config.hashIterations,
		"seedLength": config.seedLength
	};
	var hasher = new Hasher(hashConfig);
	return hasher.hashSync(pwd);
}

function comparePwd(pwd, cypher, config, cb) {
	var hashConfig = {
		"hashIterations": config.hashIterations,
		"seedLength": config.seedLength
	};
	var hasher = new Hasher(hashConfig);
	hasher.compare(pwd, cypher, cb);
}

module.exports = {

	"addUser": function (soajs, cb) {
		checkIfMongo(soajs);
		var privilege = 0;
		mongo.findOne(usersCollection, {"privilege": privilege}, function (error, response) {
			if (error) {
				return cb(error);
			}
			if (response) {
				privilege = 1;
			}
			soajs.inputmaskData.user.privilege = privilege;
			var cond = {
				$or: [
					{'username': soajs.inputmaskData.user['username']},
					{'email': soajs.inputmaskData.user['email']}
				]
			};
			mongo.findOne(usersCollection, cond, function (error, response) {
				if (error) {
					return cb(error);
				}
				if (response) {
					return cb({"code": 405});
				}
				soajs.inputmaskData.user.password = encryptPwd(soajs.inputmaskData.user.password, config);
				mongo.insert(usersCollection, soajs.inputmaskData.user, function (error, response) {
					if (Array.isArray(response) && response.length === 1) {
						if(response[0].password){
							delete response[0].password;
						}
						return cb(error, response[0]);
					}
					return cb(error, true);
				});
			});
		});
	},

	"deleteUser": function (soajs, cb) {
		checkIfMongo(soajs);
		validateId(soajs.inputmaskData.id, function (error, id) {
			if (error) {
				return cb(error);
			}
			mongo.count(usersCollection, {"_id": id}, function (error, count) {
				if (error) {
					return cb(error);
				}
				if (!count) {
					return cb(new Error("No entry found for id ", id));
				}
				mongo.remove(usersCollection, {"_id": id}, function (error) {
					return cb(error, true);
				});
			});
		});
	},

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
			comparePwd(soajs.inputmaskData.password, user.password, config, function (err, response) {
				if (err || !response) {
					return cb({"code": 408});
				}
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
			});
		});
	},

	"addProduct": function (soajs, cb) {
		checkIfMongo(soajs);
		mongo.insert(productsCollection, soajs.inputmaskData.product, function (error, response) {
			if (Array.isArray(response) && response.length === 1) {
				return cb(error, response[0]);
			}
			return cb(error, true);
		});
	},

	"deleteProduct": function (soajs, cb) {
		checkIfMongo(soajs);
		validateId(soajs.inputmaskData.id, function (error, id) {
			if (error) {
				return cb(error);
			}
			mongo.count(productsCollection, {"_id": id}, function (error, count) {
				if (error) {
					return cb(error);
				}
				if (!count) {
					return cb(new Error("No entry found for id ", id));
				}
				mongo.remove(productsCollection, {"_id": id}, function (error) {
					if (error) {
						return cb(error);
					}
					mongo.remove(operationCollection, {"pid": soajs.inputmaskData.id}, function (error) {
						return cb(error, true);
					});
				});
			});
		});
	},

	"addOperation": function (soajs, cb) {
		checkIfMongo(soajs);
		validateId(soajs.inputmaskData.operation.pid, function (error, id) {
			if (error) {
				return cb(error);
			}
			mongo.findOne(productsCollection, {"_id": id}, function (error, response) {
				if (error) {
					return cb(error);
				}
				if (!response) {
					return cb({"code": 410});
				}
				if (response.stock && response.stock >= soajs.inputmaskData.operation.qtt) {
					response.stock = response.stock - soajs.inputmaskData.operation.qtt;
					mongo.save(productsCollection, response, function (err) {
						if(err){
							return cb(err);
						}
						var product = utils.cloneObj(response);
						delete product._id;
						soajs.inputmaskData.operation.productDetails = product;
						mongo.insert(operationCollection, soajs.inputmaskData.operation, function (error, operation) {
							if (error) {
								response.stock = response.stock + soajs.inputmaskData.operation.qtt;
								mongo.save(productsCollection, response, function (err) {
									if(err){
										return cb(err);
									}
									return cb(error);
								});
							}
							if (Array.isArray(operation) && operation.length === 1) {
								return cb(error, operation[0]);
							}
							return cb(error, true);
						});
					});
				}
				else {
					return cb({"code": 411});
				}
			});
		});
	},

	"deleteOperation": function (soajs, cb) {
		checkIfMongo(soajs);
		validateId(soajs.inputmaskData.id, function (error, id) {
			if (error) {
				return cb(error);
			}
			mongo.findOne(operationCollection, {"_id": id}, function (error, response) {
				if (error) {
					return cb(error);
				}
				if (!response) {
					return cb(new Error("No entry found for id ", id));
				}
				mongo.remove(operationCollection, {"_id": id}, function (error) {
					return cb(error, true);
				});
			});
		});
	}

};