import { useContext } from "react";
import { appContext } from "./app-context";
import LocalHandlerInterface from "./local-h-interface";
import LocalHandler from "./localhandler";

interface httphandlerInterface{
    getReservationByID: Promise<Reservation>
    getActivities : Promise<Function>
    getRoomOfferings: Promise<Function>
    getRoomServiceRequests: Promise<F

}

export default class httpHandler implements httpHandlerInterface{

    private useURL:string = "http://20.124.74.192:3000";
    private devMode:boolean = false;
    /////////////////////////////////////////////
    private context = useContext(appContext);
    private localHander: LocalHandlerInterface = new LocalHandler();

    constructor(dev:boolean = false){
        this.devMode=dev;
    }
} 


// GET /reservations/:id
// GET /activities
// GET /activities/:id
// GET /offerings => returns all available offering for room service
// GET /servicerequests
// GET /servicerequests/:id
// POST /servicerequests => adds a new service request