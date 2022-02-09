import React, { createContext, useContext } from "react";
import { Activity } from "./activity";
import Reservation from "./Reservation";
import { Offering, ServiceRequest } from "./room-service";




export interface AppContextInterface{
    reservationData:Reservation
    setReservationData:React.Dispatch<React.SetStateAction<Reservation>>
    serverOfferings:Offering[]
    setServerOfferings:React.Dispatch<React.SetStateAction<Offering[]>>
    userOfferings:ServiceRequest
    setUserOfferings:React.Dispatch<React.SetStateAction<ServiceRequest>>
    availableActivities:Activity[]
    setAvailableActivities:React.Dispatch<React.SetStateAction<Activity[]>>
}


const dummyReservation:Reservation = {
    id: "",
    checkIn: 0,
    checkOut: 1,
    owner: "",
    room: ""
}
const dummyOffering:ServiceRequest={
    id: "",
    room: "",
    created: 0,
    status: "Ordered",
    requestedOffering: []
}

export const initContext: AppContextInterface = {
    reservationData: dummyReservation,
    setReservationData: () => { },
    serverOfferings: [],
    setServerOfferings: () => { },
    userOfferings:dummyOffering,
    setUserOfferings: ()=>{},
    availableActivities: [],
    setAvailableActivities: ()=>{}
}

export const appContext = createContext(initContext);