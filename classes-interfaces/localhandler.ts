import { useContext } from "react";
import { appContext, AppContextInterface } from "./app-context";
import LocalHandlerInterface from "./local-h-interface";
import Reservation from "./Reservation";
import { Offering, ServiceRequest } from "./room-service";


export default class LocalHandler implements LocalHandlerInterface{
    private context = useContext(appContext)
    constructor(){}
    getLocalReservation(): Reservation {
        return this.context.reservationData
    }
    setLocalReservation(ServerReservationData: Reservation): boolean {
        this.context.setReservationData(ServerReservationData);
        return true;
    }
    getLocalOfferings(): Offering[] {
        if(this.context.serverOfferings){return this.context.serverOfferings}
        else return []
    }
    setLocalOfferings(ServerOfferingData: Offering[]): boolean {
        this.context.setServerOfferings(ServerOfferingData)
        return true
    }

    getUserOfferings(): ServiceRequest[] {
        const returnArray:ServiceRequest[] = this.context.userOfferings;
        if(returnArray != null ) {return returnArray}
        else return []
    }
    setUserOfferings(ServerOfferingData: ServiceRequest[]): boolean {
        this.context.setUserOfferings(ServerOfferingData)
        return true
    }
    deleteUserOffering(index: number): boolean {
        const deleteContext: Offering[] = this.context.userOfferings
        const newContext = deleteContext.slice(index, 1)
        this.context.setUserOfferings(newContext)
        return (true)
    }

}