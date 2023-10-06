import express = require("express");
import {Request,Response} from "express";

export default class Server{
    constructor(private port:number){}
    public start():void
    {
        const app=express();
        app.get('/', (req:Request, res:Response) => {
            res.send('TypeScript avec Express !');
    });
        app.listen(this.port,()=>{
        console.log("server started");

    });
}

}
