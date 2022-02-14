import { useContext } from "react";
import { appContext } from "./app-context";
import LocalHandlerInterface from "./local-h-interface";
import LocalHandler from "./localhandler";
import axios from "axios"
import { Activity } from "./activity";
import Reservation from "./Reservation";
import { Offering, ServiceRequest } from "./room-service";

export interface httphandlerInterface{

    /** Get all information for the user's reservation by RESERVATION id */
    getReservations(id: string): Promise<Reservation>

    /** See all activities which are available.
     * @param id If an optional ID is supplied, the acitivities for just the user will be fetched, otherwise all activities will be fetched
     */
    getActivities(id?: string) : Promise< Activity | Activity[] >

    /** Get all room offerings
     * @param id ID of the SERVICE REQUEST. If included as an arguement, this will get offerings for only this user
     */
    getRoomOfferings(id? : string): Promise< Offering[] | ServiceRequest>

    /** get all room service requests available 
     * @param id Optional: Will return only services that the user has requested
    */
    getRoomServiceRequests(id? : string): Promise<ServiceRequest >

    /** Create or delete a service request for this user */
    postServiceRequest(request: ServiceRequest): Promise<boolean>
    cancelServiceRequest(request: ServiceRequest): Promise<any> 

    /** Sync front and backend by fetching backend data and updating local context */
    syncApp(id:string) : Promise<boolean>
}

export default class httpHandler implements httphandlerInterface{

    /////////////////////////////////////////////
    private useURL:string = "http://20.124.74.192:3000";
    private mockURL: string = "https://319a8c0f-ef79-4712-9143-a05d5c7a379c.mock.pstmn.io"
    private devMode:boolean;
    private localHandler: LocalHandlerInterface = new LocalHandler();
    
    /**this function returns the URL to work with, if devMod is set to false, 
    * it will return the production URL, if true, it will return 'http//localhost:[port]'*/
    private getURL(){
        if(this.devMode){ return this.mockURL} //postman mock
        else {return   this.mockURL} 
    }

    //constructor
    constructor(dev:boolean){
        this.devMode=dev;
        console.log("🚀 ~ file: http-handler.ts ~ line 56 ~ httpHandler ~ constructor ~ this.devMode", this.devMode)
        
    }
    //////////////////////////////////////////////

    /** get a reservation by ID */
    async getReservations(id: string){
        const response = await axios.get(`${this.getURL()}/reservations/:${id}`);
        const data: Reservation = response.data; //doing this will not actually enforce a type. The actual response type could be different
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

    async getRoomOfferings(): Promise<Offering[]> {
        const response = await axios.get(`${this.getURL()}/offerings`)
        const data = response.data as Offering[]
        console.log("adfipuabsf", data)
        return data;
    }

    async getRoomServiceRequests(id : string): Promise< ServiceRequest> {
        let response: any
            response = (await axios.get(`${this.getURL()}/servicerequests/${id}`)).data
            console.log('reseervation data', response)
            let data = response  as ServiceRequest
            return data
    }

    /** The arguement 'request' taken here must be the service request with the requestedOfferings property ALREADY altered */
    async postServiceRequest(request: ServiceRequest): Promise<boolean> {
        try {
            await axios.post(`${this.getURL()}/servicerequests`, request)
            return true
        }
        catch {return false}   
    }

    async cancelServiceRequest(request: ServiceRequest): Promise<any> {
        //fetcher...
        const response = await axios.patch(`${this.getURL()}/servicerequests`, request)
        const data = response.data 
        this.localHandler.setUserOfferings(data)
        return (response)
    }


    async syncApp(id:string){
        //get-n-set
        const reservation= await this.getReservations(id);
        const serverServiceRequests= await this.getRoomServiceRequests(reservation.room)
        const serverOfferings= await this.getRoomOfferings()

        if(Boolean(reservation) && Boolean(serverOfferings) && Boolean(serverServiceRequests)){
            this.localHandler.setLocalReservation(reservation)
            this.localHandler.setLocalOfferings(serverOfferings)
            this.localHandler.setUserOfferings(serverServiceRequests)
        }
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