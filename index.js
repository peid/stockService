'use strict';
var soajs = require('soajs');
var config = require('./config.js');
var BLModule = require("./lib/index");

var service = new soajs.server.service(config);

function initBLModel(req, res, cb) {
	var modelName = "mongo";
	BLModule.init(modelName, function (error, BL) {
		if (error) {
			req.soajs.log.error(error);
			return res.json(req.soajs.buildResponse({"code": 407, "msg": config.errors[407]}));
		}
		else {
			return cb(BL);
		}
	});
}

service.init(function () {
	
	service.post("/login", function (req, res) {
		initBLModel(req, res, function (BL) {
			BL.login(config, req.soajs, function (error, response) {
				return res.json(req.soajs.buildResponse(error, response));
			});
		});
	});

	service.post("/product", function (req, res) {
		initBLModel(req, res, function (BL) {
			BL.addProduct(config, req.soajs, function (error, response) {
				return res.json(req.soajs.buildResponse(error, response));
			});
		});
	});

	service.post("/operation", function (req, res) {
		initBLModel(req, res, function (BL) {
			BL.addOperation(config, req.soajs, function (error, response) {
				return res.json(req.soajs.buildResponse(error, response));
			});
		});
	});

	service.post("/user", function (req, res) {
		initBLModel(req, res, function (BL) {
			BL.addUser(config, req.soajs, function (error, response) {
				return res.json(req.soajs.buildResponse(error, response));
			});
		});
	});

	service.delete("/user/:id", function (req, res) {
		initBLModel(req, res, function (BL) {
			BL.deleteUser(config, req.soajs, function (error, response) {
				return res.json(req.soajs.buildResponse(error, response));
			});
		});
	});

	service.delete("/product/:id", function (req, res) {
		initBLModel(req, res, function (BL) {
			BL.deleteProduct(config, req.soajs, function (error, response) {
				return res.json(req.soajs.buildResponse(error, response));
			});
		});
	});

	service.delete("/operation/:id", function (req, res) {
		initBLModel(req, res, function (BL) {
			BL.deleteOperation(config, req.soajs, function (error, response) {
				return res.json(req.soajs.buildResponse(error, response));
			});
		});
	});

	service.start();
});