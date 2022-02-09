import { useContext } from "react";
import { appContext } from "./app-context";
import LocalHandlerInterface from "./local-h-interface";
import LocalHandler from "./localhandler";
import axios from "axios"
import { Activity } from "./activity";
import Reservation from "./Reservation";
import { Offering, ServiceRequest } from "./room-service";

export interface httphandlerInterface{

    /** Get all information for the user's reservation by ID */
    getReservations(id: string): Promise<Reservation>

    /** See all activities which are available.
     * @param id If an optional ID is supplied, the acitivities for just the user will be fetched, otherwise all activities will be fetched
     */
    getActivities(id?: string) : Promise< Activity | Activity[] >

    /** Get all room offerings
     * @param id If included as an arguement, this will get offerings for only this user
     */
    getRoomOfferings(id? : string): Promise< Offering[] >

    /** get all room service requests available 
     * @param id Optional: Will return only services that the user has requested
    */
    getRoomServiceRequests(id? : string): Promise< ServiceRequest | ServiceRequest[] >

    /** Create or delete a service request for this user */
    postServiceRequest(request: ServiceRequest): Promise<boolean>
    cancelServiceRequest(request: ServiceRequest): Promise<any> 

    /** Sync front and backend by fetching backend data and updating local context */
    syncApp(id:string) : Promise<boolean>
}

export default class httpHandler implements httphandlerInterface{

    /////////////////////////////////////////////
    private useURL:string = "http://20.124.74.192:3000";
    private devMode:boolean = false;
    private context = useContext(appContext);
    private localHandler: LocalHandlerInterface = new LocalHandler();
    
    /**this function returns the URL to work with, if devMod is set to false, 
    * it will return the production URL, if true, it will return 'http//localhost:[port]'*/
    private getURL(){
        if(this.devMode){ return `https://dabbdf3a-3f8b-478f-9599-b3c951a5fb6e.mock.pstmn.io`} //postman mock
        else {return  this.useURL} 
    }

    //constructor
    constructor(dev:boolean = false){
        this.devMode=dev;
    }
    //////////////////////////////////////////////

    /** get a reservation by ID */
    async getReservations(id: string){
        const response = await axios.get(`${this.getURL()}/reservations/:${id}`);
        const data: Reservation = response.data;  
        //this.localHandler.setLocalReservation(data);                  
        return data;
    }

    async getActivities(id?: string): Promise< Activity | Activity[] > {
        let response: any
        if (id) {
            response = await axios.get(`${this.getURL()}/activities/:${id}`)
            let data = response.data as Activity
            return data
        } 
        else {
            response = await axios.get(`${this.getURL()}/activities`);
            let data = response.data as Activity[] 
            return data
        }
    }

    async getRoomOfferings(id? : string): Promise<Offering[]> {
        if (id){
            const serviceRequest = await this.getRoomServiceRequests(id)
            const offerings = serviceRequest as ServiceRequest
            return offerings.requestedOffering
        }
        else{
            const response = await axios.get(`${this.getURL()}/offerings`)
            const offerings = response.data as Offering[]
            return offerings
        } 
    }

    async getRoomServiceRequests(id? : string): Promise< ServiceRequest | ServiceRequest[] > {
        let response: any
        if (id) {
            response = await axios.get(`${this.getURL()}/servicerequests/:${id}`)
            const data = response.data as ServiceRequest; 
            return data;
        } 
        else {
            response = await axios.get(`${this.getURL()}/servicerequests`) 
            const data = response.data as ServiceRequest[]; 
            return data;
        }
    }

    async postServiceRequest(request: ServiceRequest): Promise<boolean> {
        try {
            await axios.post(`${this.getURL()}/servicerequests`, request)
            return true
        }
        catch {return false}   
    }

    async cancelServiceRequest(request: ServiceRequest): Promise<any> {
        //fetcher...
        await axios.post(`${this.getURL()}/servicerequests`, request)
        const response = 'derp'
        return (response)
    }

    async syncApp(id:string){

        //get-n-set
        this.localHandler.setLocalReservation(await this.getReservations(id))
        this.localHandler.setLocalOfferings(await this.getRoomOfferings())
        this.localHandler.setUserOfferings(await this.getRoomOfferings(id))
        return (true)
    }
} 


// GET /reservations/:id
// GET /activities
// GET /activities/:id
// GET /offerings => returns all available offering for room service
// GET /servicerequests
// GET /servicerequests/:id
// POST /servicerequests => adds a new service request