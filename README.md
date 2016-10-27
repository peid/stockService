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
