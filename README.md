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