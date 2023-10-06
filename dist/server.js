"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
class Server {
    constructor(port) {
        this.port = port;
    }
    start() {
        const app = express();
        app.get('/', (req, res) => {
            res.send('TypeScript avec Express !');
        });
        app.listen(this.port, () => {
            console.log("server started");
        });
    }
}
exports.default = Server;
