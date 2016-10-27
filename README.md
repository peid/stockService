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

Let's start with the <b>login</b> API :

Uri: smb215.ddns.net:4999/login<br>
Header: Content-Type: application/json<br>
Body:<br>
{<br>
“username”:”string or email”,<br>
“password”:”string”<br>
}<br>
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
