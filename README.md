# Introduction
This Repository is offering a stock Web Service.

# Setup
After pulling the content of this repo, import the database copy to install & setup the needed core information so you can start the service.
But before importing the database and starting the service make sure that you have nodeJS and mongoDB installed and running.
```sh
$ cd /opt/soajs/smb215/node_modules/stockService/db
$ mongorestore
```

# Start The Service
```sh
$ export SOAJS_ENV=dev
$ export SOAJS_SRVIP=127.0.0.1
$ cd /opt/soajs/smb215/node_modules/stockService
$ npm install  //only for the first time you run the service.
$ node .
```
# Turning the application from static to dynamic

To make the application dynamic we used the following:

- An Ubunto Server Version 16.04 on a local PC that supports our application only.
- The services used are nodejs to reconfigure the server side to create a small HTTP server in a single command and Express Server line that offers basic features of the Web application, without obscuring the features of Node.js.
- Systemctl is used to launch the service, it serves to introspect and control "systemd", to examine the state of the system, manage the system and the services.
- SSH is used to access the server using a key because we stopped the authentication for some security reasons.

# Restful API's 

We created 7 API's that works on the login, on creating a user, an order, a product and on deleting a user or a user or a product.
Now we will take a look at the code of the API's with a CURL example, his response and errors.

#### 1- Let's start with the login API :

Uri: smb215.ddns.net:4999/login<br>
Header: Content-Type: application/json<br>
Body:<br>
{<br>
“username”:”string or email”,<br>
“password”:”string”<br>
}

- CURL example:

curl -X POST -H "Content-Type: application/json -d '{<br>
"username":"test",<br>
"password":"test"<br>
}<br>
' http://smb215.ddns.net:4999/login<br>

- Valid Response:

{<br>
"result": true,<br>
"data": {<br>
"products": [<br>
{<br>
"_id": "57d99776ad149a0a2ce892e8",<br>
"name": "book",<br>
"barcode": "5283007434152",<br>
"productimage": "",<br>
"stock": 6782<br>
},<br>
//…<br>
],<br>
"operations": [<br>
{<br>
"_id": "57f53c68feb7e34a04067466",<br>
"type": "1",<br>
"qtt": "1",<br>
"uid": "57d99580ad149a0a2ce892e6",<br>
"pid": "57f5357ffeb7e34a04067463",<br>
"productDetails": {<br>
"name": "Pen",<br>
"barcode": "5283007434152",<br>
"productimage": "",<br>
"stock": 276<br>
}<br>
}<br>
],<br>
"privilege": 1,<br>
"uid": "57d99580ad149a0a2ce892e6"<br>
}<br>
}<br>

- Error Response:

{<br>
"result": false,<br>
"errors": {<br>
"codes":409],<br>
"details": [<br>
{<br>
"code": 409,<br>
"message": "Unable to log in the user. User not found."<br>
}<br>
]<br>
}<br>
}<br>

#### 2- We will advance to the Product API :<br>

Uri: smb215.ddns.net:4999/product<br>
Method: post<br>
Header: Content-Type: application/json<br>
Body:<br>
{<br>
“product”: {<br>
“name”:”string”,<br>
“stock”: “number or string”,<br>
“barcode”:”string”,<br>
“productimage”:”url”<br>
}<br>
}

- CURL example:<br>

curl -X POST -H "Content-Type: application/json” -d '{<br>
"product":{<br>
"name":"laptop",<br>
"stock": "100",<br>
"barcode":"1234567890",<br>
"productimage":"http://ssl-product-images.www8-<br>
hp.com/digmedialib/prodimg/lowres/c05089529.png"<br>
}}' http://smb215.ddns.net:4999/product<br>

- Valid Response:<br>

{<br>
"result": true,<br>
"data": {<br>
"name": "laptop",<br>
"stock": "100",<br>
"barcode": "1234567890",<br>
"productimage": "http://ssl-product-images.www8-hp.com/digmedialib/prodimg/lowres/c05089529.png",<br>
"_id": "5805281911c3d9301717a7f9"<br>
}<br>
}<br>

- Error Response:<br>

{<br>
"result": false,<br>
"errors": {<br>
"codes": [172 ],<br>
"details": [{"code": 172,<br>
"message": "Missing required field: product"}]}<br>
}<br>

#### 3- This is the API of the user<br>
Uri: smb215.ddns.net:4999/user<br>
Method: post<br>
Header: Content-Type: application/json<br>
Body:<br>
{<br>
“user”:{<br>
“username”:”string”,<br>
“firstName”:”string”,<br>
“lastName”:”string”,<br>
“email”:”string format email”,<br>
“password”:”string”<br>
}<br>
}

- CURL example:

curl -X POST -H "Content-Type: application/json" -d '{<br>
"user":{<br>
"username":"peter_eid",<br>
"password":"password",<br>
"firstName":"peter",<br>
"lastName":"eid",<br>
"email":"peter.eid@isae.edu.lb"<br>
}<br>
}<br>
' http://smb215.ddns.net:4999/user<br>

- Valid Response:<br>

{<br>
"result": true,<br>
"data": {<br>
"username": "peter_eid",<br>
"firstName": "peter",<br>
"lastName": "eid",<br>
"email": "peter.eid@isae.edu.lb",<br>
"privilege": 1,<br>
"_id": "58052b6d11c3d9301717a7fc"<br>
}<br>
}<br>

- Error Response:

{<br>
"result": false,<br>
"errors": {<br>
"codes": [405],<br>
"details": [{"code": [405],<br>
"message": "UserName Or Email Already Exists!" }]}<br>
}<br>

#### 4- The Operation API <br>

Uri: smb215.ddns.net:4999/operation<br>
Method: post<br>
Header: Content-Type: application/json<br>
Body:<br>
{<br>
“operation”: {<br>
“uid”:”string”,<br>
“pid”:”string”,<br>
“qtt”:”integer”,<br>
“type”:”0 or 1”<br>
}<br>
}<br>

- CURL example:<br>

curl -X POST -H "Content-Type: application/json" -d '{<br>
"operation":{<br>
"uid":"57d986acad149a0a2ce892e3",<br>
"pid": "57ebff816c96c00403d8b644",<br>
"qtt": "1",<br>
"type":"1"<br>
}<br>
}<br>
' http://smb215.ddns.net:4999/operation<br>

- Valid Response:<br>

{<br>
"result": true,<br>
"data": {<br>
"uid": "57d986acad149a0a2ce892e3",<br>
"pid": "57ebff816c96c00403d8b644",<br>
"qtt": "1",<br>
"type": "1",<br>
"productDetails": {<br>
"name": "laptop",<br>
"stock": 97,<br>
"barcode": "1234567890",<br>
"productimage": "http://ssl-product-images.www8-hp.com/digmedialib/prodimg/lowres/c05089529.png"<br>
},<br>
"_id": "58052ca311c3d9301717a7fd"<br>
}<br>
}<br>

- Error Response:<br>	

{<br>
"result": false,<br>
"errors": {<br>
"codes": [172],<br>
"details": [<br>
{<br>
"code": 172,<br>
"message": "Missing required field: operation"}<br>
] }<br>
}<br>

#### 5- The delete API's<br>

Uri: smb215.ddns.net:4999/product/:id<br>
Method: delete<br>
Uri: smb215.ddns.net:4999/user/:id<br>
Method: delete<br>
Uri: smb215.ddns.net:4999/operation/:id<br>
Method: delete<br>
Replace :id by the (product, user, operation id that you want to delete)<br>

- CURL example:<br>

curl -X DELETE -d '' http://smb215.ddns.net:4999/operation/58052ca311c3d9301717a7fd<br>

- Valid Response:<br>

{<br>
"result": true,<br>
"data": true<br>
}<br>

- Error Response:<br>

{<br>
"result": false,<br>
"errors": {<br>
"codes": [403],<br>
"details": [<br>
{<br>
"code": 403,<br>
"message": "Error Deleting Entry!"<br>
}<br>
]<br>
}<br>
}<br>
