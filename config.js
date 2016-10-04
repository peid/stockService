'use strict';


module.exports = {
	serviceName: "stock",
	serviceVersion: 1,
	servicePort: 4999,
	serviceGroup: "STOCK",
	extKeyRequired: false,
	type: "service",
	prerequisites: {
		cpu: '',
		memory: ''
	},
	"hashIterations": 1024,
	"seedLength": 32,
	"errors": {
		400: "Error Executing Operations!",
		401: "Error While login!",
		402: "Error Adding Entry!",
		403: "Error Deleting Entry!",
		405: "UserName Or Email Already Exists!",
		407: "Error Loading Model!",
		408: "Problem with the provided password.",
		409: "Unable to log in the user. User not found.",
		410: "Product Not For The Provided Id.",
		411: "Not Enough Qtt in Stock!"
	},
	"schema": {
		"commonFields": {
			"id": {
				"source": ['params.id'],
				"required": true,
				"validation": {
					"type": "string"
				}
			}
		},
		"post": {
			"/login": {
				"_apiInfo": {
					"l": "Login",
					"group": "Basic",
					"groupMain": true
				},
				"username": {
					"source": ['body.username'],
					"required": true,
					"validation": {
						"type": "string"
					}
				},
				"password": {
					"source": ['body.password'],
					"required": true,
					"validation": {
						"type": "string"
					}
				}
			},
			"/product": {
				"_apiInfo": {
					"l": "Add new Product",
					"group": "Basic",
					"groupMain": false
				},
				"product": {
					"source": ["body.product"],
					"required": true,
					"validation": {
						"type": "object"
					}
				}
			},
			"/operation": {
				"_apiInfo": {
					"l": "Add new operation",
					"group": "Basic",
					"groupMain": false
				},
				"operation": {
					"source": ["body.operation"],
					"required": true,
					"validation": {
						"type": "object"
					}
				}
			},
			"/user": {
				"_apiInfo": {
					"l": "Add new user",
					"group": "Basic",
					"groupMain": false
				},
				"user": {
					"source": ["body.user"],
					"required": true,
					"validation": {
						"type": "object",
						"properties": {
							"username": {
								"required": true,
								"type": "string"
							},
							"firstName": {
								"required": true,
								"type": "string"
							},
							"lastName": {
								"required": true,
								"type": "string"
							},
							"email": {
								"required": true,
								"type": "string", format: "email"
							},
							"password": {
								"required": true,
								"type": "string"
							}
						}
					}
				}
			}
		},
		"delete": {
			"/product/:id": {
				"_apiInfo": {
					"l": "Delete Product by ID",
					"group": "Basic",
					"groupMain": false
				},
				"commonFields": ["id"]
			},
			"/user/:id": {
				"_apiInfo": {
					"l": "Delete User by ID",
					"group": "Basic",
					"groupMain": false
				},
				"commonFields": ["id"]
			},
			"/operation/:id": {
				"_apiInfo": {
					"l": "Delete Operation by ID",
					"group": "Basic",
					"groupMain": false
				},
				"commonFields": ["id"]
			}
		}
	}
};