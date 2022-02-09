import Reservation from "./Reservation";
import { Offering } from "./room-service";



export default interface LocalHandlerInterface{
    /**used to get the reservation data saved locally*/
    getLocalReservation():Reservation
    /**used to save reservation data retrieved from the serer*/
    setLocalReservation(ServerReservationData:Reservation):boolean
    /**used to get the offering that have been locally retrieved from the serer*/
    getLocalOfferings():Offering[]
    /**used to set offering from the server locally*/
    setLocalOfferings(ServerOfferingData:Offering[]):boolean
    /**used to get the locally saved offering the the user requested*/
    getUserOfferings():Offering[]
    /**used to set the user offering locally*/
    setUserOfferings(ServerOfferingData:Offering[]):boolean
}