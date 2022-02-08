import { useContext } from "react";
import { appContext } from "./app-context";
import LocalHandlerInterface from "./local-h-interface";
import LocalHandler from "./localhandler";
import axios from "axios"

interface httphandlerInterface{
    getReservations(id: number): Promise<Reservation>
    // getActivities() : Promise<Activity>
    // getRoomOfferings(): Promise<Offering>
    // getRoomServiceRequests(): Promise<ServiceRequest>
    // postServiceRequest(): Promise<boolean>
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

    /**this function returns the URL to work with, if devMod is set to false, it will return the production URL, if true, it will return 'http//localhost:[port]'*/
    private getURL(){
        if(this.devMode){ return `https://c27c0348-eb0c-4ac0-afe2-101bc195d6a5.mock.pstmn.io`} //postman mock
        else {return  this.useURL}
    }

    async getReservations(id: number){
        const response = await axios.get(`${this.getURL()}/reservations/:${id}`);
        const data: Reservation = response.data;  
        this.localHander.setLocalReservation(data);                  
        return data;
    }

    // async getActivities(){return  }
    // async getRoomOfferings(): Promise<Offering>
    // async getRoomServiceRequests(): Promise<ServiceRequest>
    // async postServiceRequest(): Promise<boolean>
    // async syncApp() : Promise<boolean>



    // async syncApp() {
    //     const usersToSave: LocalEmployee[] = this.context.employeeList.filter(e => e.status === Status.add);
    //     usersToSave.forEach(async e => {
    //         console.log(e.serverData);
    //         console.log("Making post call for:", e.serverData)
    //         const tempEmployee = {
    //             isManager: e.serverData.isManager,
    //             fname: e.serverData.fname,
    //             lname: e.serverData.lname,
    //             username: e.serverData.username,
    //             password: e.serverData.password
    //         };
    //         const response = await axios.post(`${this.getURL()}/employees`, tempEmployee);
    //         const currentEmployee: Employee = response.data; 
    //         return(currentEmployee);
    //     });
    //     const serverEmployees = await this.getServerAllEmployees();
    //     this.localHander.syncEmployees(serverEmployees);
    //     this.context.setSync(true);
    // }


} 


// GET /reservations/:id
// GET /activities
// GET /activities/:id
// GET /offerings => returns all available offering for room service
// GET /servicerequests
// GET /servicerequests/:id
// POST /servicerequests => adds a new service request