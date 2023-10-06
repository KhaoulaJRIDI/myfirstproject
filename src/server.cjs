"use strict";
exports.__esModule = true;
var express = require("express");
var Server = /** @class */ (function () {
    function Server(port) {
        this.port = port;
    }
    Server.prototype.start = function () {
        var app = express();
        app.get('/', function (req, res) {
            res.send('TypeScript avec Express !');
        });
        app.listen(this.port, function () {
            console.log("server started");
        });
    };
    return Server;
}());
exports["default"] = Server;
