import Reservation from "./Reservation";
import  { Offering,ServiceRequest } from "./room-service";



export default interface LocalHandlerInterface{
        /**used to get the reservation data saved locally*/
        getLocalReservation():Reservation
        /**used to save reservation data retrieved from the serer*/
        setLocalReservation(ServerReservationData:Reservation):boolean
        /**used to get the offering that have been locally retrieved from the serer*/
        getLocalOfferings():Offering[]
        /**used to set offering from the server locally*/
        setLocalOfferings(Offering : Offering[]):boolean
        /**used to get the locally saved offering the the user requested*/
        getUserOfferings(ServiceRequest: ServiceRequest):Offering[]
        /**used to set the user offering locally*/
        setUserOfferings(ServerOfferingData:ServiceRequest):boolean
}