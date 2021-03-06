'use strict';
var fs = require('fs');

module.exports = {
	"init": function (modelName, cb) {
		var modelPath;
		
		if (modelName) {
			modelPath = __dirname + "/../model/" + modelName + ".js";
			return requireModel(modelPath, cb);
		}
		
		modelPath = __dirname + "/../model/memory.js";
		return requireModel(modelPath, cb);
		
		/**
		 * checks if model file exists, requires it and returns it.
		 * @param filePath
		 * @param cb
		 */
		function requireModel(filePath, cb) {
			//check if file exist. if not return error
			fs.exists(filePath, function (exists) {
				if (!exists) {
					return cb(new Error("Requested Model Not Found!"));
				}
				
				stockModule.model = require(filePath);
				return cb(null, stockModule);
			});
		}
	}
};

function buildResponse(soajs, opts, cb) {
	if (opts.error) {
		if (typeof(opts.error) === 'object') {
			if (opts.error.code && opts.config.errors[opts.error.code]) {
				opts.code = opts.error.code;
			}
		}
		soajs.log.error(opts.error);
		return cb({"code": opts.code, "msg": opts.config.errors[opts.code]});
	}
	return cb(null, opts.data);
}

var stockModule = {

	model: null,

	"login": function (config, soajs, cb) {
		stockModule.model.login(soajs, function (error, data) {
			var opts = {
				error: error,
				code: 401,
				config: config,
				data: data
			};
			return buildResponse(soajs, opts, cb);
		});
	},

	"addUser": function (config, soajs, cb) {
	stockModule.model.addUser(soajs, function (error, data) {
		var opts = {
			error: error,
			code: 402,
			config: config,
			data: data
		};
		return buildResponse(soajs, opts, cb);
	});
	},

	"addProduct": function (config, soajs, cb) {
	stockModule.model.addProduct(soajs, function (error, data) {
		var opts = {
			error: error,
			code: 402,
			config: config,
			data: data
		};
		return buildResponse(soajs, opts, cb);
	});
    },

    "addOperation": function (config, soajs, cb) {
        stockModule.model.addOperation(soajs, function (error, data) {
            var opts = {
                error: error,
                code: 402,
                config: config,
                data: data
            };
            return buildResponse(soajs, opts, cb);
        });
    },

    "deleteUser": function (config, soajs, cb) {
        stockModule.model.deleteUser(soajs, function (error, data) {
            var opts = {
                error: error,
                code: 403,
                config: config,
                data: data
            };
            return buildResponse(soajs, opts, cb);
        });
    },

    "deleteProduct": function (config, soajs, cb) {
        stockModule.model.deleteProduct(soajs, function (error, data) {
            var opts = {
                error: error,
                code: 403,
                config: config,
                data: data
            };
            return buildResponse(soajs, opts, cb);
        });
    },

    "deleteOperation": function (config, soajs, cb) {
        stockModule.model.deleteOperation(soajs, function (error, data) {
            var opts = {
                error: error,
                code: 403,
                config: config,
                data: data
            };
            return buildResponse(soajs, opts, cb);
        });
    }
};