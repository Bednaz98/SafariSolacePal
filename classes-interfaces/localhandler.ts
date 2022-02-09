import { useContext } from "react";
import { appContext } from "./app-context";
import LocalHandlerInterface from "./local-h-interface";
import Reservation from "./Reservation";
import { Offering } from "./room-service";


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

    getUserOfferings(): Offering[] {
        if(this.context.userOfferings) {return this.context.userOfferings}
        else return []
    }
    setUserOfferings(ServerOfferingData: Offering[]): boolean {
        this.context.setUserOfferings(ServerOfferingData)
        return true
    }
}