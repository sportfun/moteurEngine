'use strict';

let io = require('socket.io-client');
var ajax = require("node.ajax");

// Class Network used to send and receive data from User input controller and RPM from Hardware

class Network {
    constructor(){
        this.serverAddress = "http://api.sportsfun.shr.ovh:8080";
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

    //connect method
    //param : userData object {username: string, password: string}
    // method who try to log in the current user with his identifiant in order to get his information
    connect(userDatas){
        let res = ajax(this.serverAddress + this.routes["login"], "POST", 
        { username:userDatas.username, password:userDatas.password},
        {'Content-Type': 'application/x-www-form-urlencoded'},
        "utf8");
        if (res.success === true){
            this.token = res.data.token;
            console.log(this.token);
        }
        else{
            console.error("Connection failed error :" + res.error);
        }
    }

    // register method
    // param RegisterDatas object {username: string, password: string, email: string, firstName: string, lastName: string, birthDate: date}
    // method to register an user (dev only)
    register(RegisterDatas){
        let res = ajax(this.serverAddress + this.routes["register"], "POST", 
            {
                username: RegisterDatas.username, password: RegisterDatas.password, 
                email: RegisterDatas.email, firstName: RegisterDatas.firstname, lastName: RegisterDatas.lastName,
                birthDate: RegisterDatas.birthDate
            },
            {'Content-Type': 'application/x-www-form-urlencoded'},
            "utf8");
        if (res.success === true){
            console.log("Registering success");
        }
        else
            console.log("Registering failed.");
    }

    // OnControllerData method
    // param: none
    // Method listener 'data' event to get all controllerInput sent from server
    OnControllerData(){
        this.socket.on('data', (controllerInput) => {
            console.log(controllerInput);
        })
    }

    // OnRpm method
    // param: none
    // method listener 'rpm' event to get all Rpm sent from server
    OnRpm(){
        this.socket.on('rpm', (rpm) => {
            console.log(rpm)
        });
    }

};
 export default Network;
