'use strict';

let io = require('socket.io-client');
var ajax = require("node.ajax");

// class Network {
//     constructor() {

class Network {
    constructor(){

        this.serverAddress = "http://149.202.41.22:8080";
        this.routes = {
            login: "/api/user/login",
            register: "/api/user/register",
        };

        console.log(this.serverAddress + this.routes.login);
         this.socket = new io.connect(this.serverAddress, {
            reconnection: true,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 5000,
            reconnectionAttempts: 99999
        });
        this.socket.on('connect', () => { console.log('+ Client has connected to the server (149.202.41.22:8080).'); });
        this.token = "";
    }

    connect(userDatas){
        let res = ajax(this.serverAddress + this.routes["login"], "POST", 
        { username:userDatas.username, password:userDatas.password},
        {'Content-Type': 'application/x-www-form-urlencoded'},
        "utf8");
        if (res.success === true){
            this.token = res.data.token;
            console.log(this.token);
        }
    }

    register(RegisterDatas){
        let res = ajax(this.serverAddress + this.routes["register"], "POST", 
            {
                username: RegisterDatas.username, password: RegisterDatas.password, 
                email: RegisterDatas.email, firstName: RegisterDatas.firstname, lastName: RegisterDatas.lastName,
                birthDate: RegisterDatas.birthDate
            },
            {'Content-Type': 'application/x-www-form-urlencoded'},
            "utf8"
        );
        if (res.success === true){
            console.log("Registering success");
        }
        else
            console.log("Registering failed.");
    }

    OnControllerData(){
        this.socket.on('data', (data) => {
            console.log(data);
        })
    }
};
//socket.on('connect', () => { console.log('+ Client has connected to the server (149.202.41.22:8080).'); });
//socket.on('hi', () => { console.log('hi'); });
//socket.on('message', (data) => { console.log('  Client has received data from the server (149.202.41.22:8080): ', data); });
//socket.on('disconnect', () => { console.log('- Client has disconnected to the server (149.202.41.22:8080).'); });

 export default Network;
