import { useContext } from "react";
import { appContext } from "./app-context";
import LocalHandlerInterface from "./local-h-interface";
import LocalHandler from "./localhandler";
import axios from "axios"

interface httphandlerInterface{

    /** Get all information for the user's reservation */
    getReservations(id: string): Promise<Reservation>

    /** See all activities which are available.
     * @param id If an optional ID is supplied, the acitivities for just the user will be fetched
     */
    getActivities(id?: string) : Promise<Activity | Activity[]>

    /** Get all room offerings */
    getRoomOfferings(id? : string): Promise<Offering[]>

    /** get all room service requests available 
     * @param id Will return only services that the user has requested
    */
    getRoomServiceRequests(id? : string): Promise<ServiceRequest[] | ServiceRequest>

    /** Create a new service request for this user */
    postServiceRequest(request: ServiceRequest): Promise<boolean>

    cancelServiceRequest(request: ServiceRequest): Promise<any> 

    syncApp() : Promise<boolean>
}

export default class httpHandler implements httphandlerInterface{

    private useURL:string = "http://20.124.74.192:3000";
    private devMode:boolean = false;
    /////////////////////////////////////////////
    private context = useContext(appContext);
    private localHander: LocalHandlerInterface = new LocalHandler();
    
    /**this function returns the URL to work with, if devMod is set to false, 
    * it will return the production URL, if true, it will return 'http//localhost:[port]'*/
    private getURL(){
        if(this.devMode){ return `https://c27c0348-eb0c-4ac0-afe2-101bc195d6a5.mock.pstmn.io`} //postman mock
        else {return  this.useURL}
    }

    //constructor
    constructor(dev:boolean = false){
        this.devMode=dev;
    }

    /** get a reservation by ID */
    async getReservations(id: string){
        const response = await axios.get(`${this.getURL()}/reservations/:${id}`);
        const data: Reservation = response.data;  
        this.localHander.setLocalReservation(data);                  
        return data;
    }

    /** Get all activities or a single activity by ID */
    async getActivities(id?: string): Promise<Activity | Activity[]> {
        let response: any
        if (id) {response = await axios.get(`${this.getURL()}/activities/:${id}`)} 
        else {response = await axios.get(`${this.getURL()}/activities`); }
  
        const data = response.data
        return data;
    }

    async getRoomOfferings(id? : string): Promise<Offering[]> {
        if (id !== null){
            const response = await this.getRoomServiceRequests(this.context.reservationData.id)
            //const userOfferings = response.requestedOfferings
        }
        const response = await axios.get(`${this.getURL()}/offerings`) 
        return response.data
    }

    async getRoomServiceRequests(id? : string): Promise<ServiceRequest[] | ServiceRequest> {
        let response: any
        if (id) {response = await axios.get(`${this.getURL()}/servicerequests/:${id}`)} 
        else {response = await axios.get(`${this.getURL()}/servicerequests`)} 
        const data: ServiceRequest[] = response.data
        return data
    }

    async getRoomServiceRequest(id : string): Promise<ServiceRequest> {
        const response = await axios.get(`${this.getURL()}/servicerequests/:${id}`)
        const data: ServiceRequest = response.data
        return data
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
        const response = 'derp'
        return (response)
    }

    /** Dual functionality: updates local states, but also updates backend */
    async syncApp(){
        // const localHandler: LocalHandlerInterface = new LocalHandler 
        
        // //get'n'set reservation by ID
        // localHandler.setLocalReservation(await this.getReservations(this.context.reservationData.id))
        // //localHandler.setLocalOfferings(await this.getRoomOfferings())
        // const serviceRequests = await this.getRoomServiceRequests(this.context.reservationData.id)
        // //localHandler.setUserOfferings(serviceRequests)
        
        // //const usersToSave: LocalEmployee[] = this.context.employeeList.filter(e => e.status === Status.add);
        // // usersToSave.forEach(async e => {
        // //     console.log(e.serverData);
        // //     console.log("Making post call for:", e.serverData)
        // //     const tempEmployee = {
        // //         isManager: e.serverData.isManager,
        // //         fname: e.serverData.fname,
        // //         lname: e.serverData.lname,
        // //         username: e.serverData.username,
        // //         password: e.serverData.password
        // //     };
        // //     const response = await axios.post(`${this.getURL()}/employees`, tempEmployee);
        // //     const currentEmployee: Employee = response.data; 
        // //     return(currentEmployee);
        // // });
        // // const serverEmployees = await this.getServerAllEmployees();
        // // this.localHander.syncEmployees(serverEmployees);
        // // this.context.setSync(true);
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