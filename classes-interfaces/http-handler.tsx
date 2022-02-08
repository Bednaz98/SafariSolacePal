import { useContext } from "react";
import { appContext } from "./app-context";
import LocalHandlerInterface from "./local-h-interface";
import LocalHandler from "./localhandler";
import axios from "axios"

interface httphandlerInterface{
    getReservations(id: string): Promise<Reservation>
    getActivities(id?: string) : Promise<Activity[]>
    getRoomOfferings(): Promise<Offering>
    getRoomServiceRequests(): Promise<ServiceRequest[] | ServiceRequest>
    postServiceRequest(request: ServiceRequest): Promise<boolean>
    // syncApp() : Promise<boolean>
}

export default class httpHandler implements httphandlerInterface{

    private useURL:string = "http://20.124.74.192:3000";
    private devMode:boolean = false;
    /////////////////////////////////////////////
    private context = useContext(appContext);
    private localHander: LocalHandlerInterface = new LocalHandler();

    constructor(dev:boolean = false){
        this.devMode=dev;
    }

    /**this function returns the URL to work with, if devMod is set to false, 
     * it will return the production URL, if true, it will return 'http//localhost:[port]'*/
    private getURL(){
        if(this.devMode){ return `https://c27c0348-eb0c-4ac0-afe2-101bc195d6a5.mock.pstmn.io`} //postman mock
        else {return  this.useURL}
    }

    async getReservations(id: string){
        const response = await axios.get(`${this.getURL()}/reservations/:${id}`);
        const data: Reservation = response.data;  
        this.localHander.setLocalReservation(data);                  
        return data;
    }

    async getActivities(id?: string): Promise<Activity[]> {
        let response: any
        if (id) {response = await axios.get(`${this.getURL()}/activities/:${id}`)} 
        else {response = await axios.get(`${this.getURL()}/activities`); }
  
        const data: Activity[] = response.data
        return data;
    }

    async getRoomOfferings(): Promise<Offering> {
        const response = await axios.get(`${this.getURL()}/offerings`) 
        return response.data
    }

    async getRoomServiceRequests(id? : string): Promise<ServiceRequest[] | ServiceRequest> {
        let response: any
        if (id) {response = await axios.get(`${this.getURL()}/servicerequests/:${id}`)} 
        else {response = await axios.get(`${this.getURL()}/servicerequests`); }
  
        const data: ServiceRequest | ServiceRequest[] = response.data
        return data;
    }

    async postServiceRequest(request: ServiceRequest): Promise<boolean> {
        try {
            await axios.post(`${this.getURL()}/servicerequests`, request)
            return true
        }
        catch {return false}   
    }


} 


// GET /reservations/:id
// GET /activities
// GET /activities/:id
// GET /offerings => returns all available offering for room service
// GET /servicerequests
// GET /servicerequests/:id
// POST /servicerequests => adds a new service request