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
        return this.context.serverOfferings
    }
    setLocalOfferings(ServerOfferingData: Offering[]): boolean {
        this.context.setServerOfferings(ServerOfferingData)
        return true
    }

    getUserOfferings(): Offering[] {
        return this.context.userOfferings
    }
    setUserOfferings(ServerOfferingData: Offering[]): boolean {
        this.context.setUserOfferings(ServerOfferingData)
        return true
    }
}