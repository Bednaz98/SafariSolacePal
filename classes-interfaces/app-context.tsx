import React, { createContext, useContext } from "react";
import { Activity } from "./activity";
import Reservation from "./Reservation";
import { Offering, ServiceRequest } from "./room-service";




export interface AppContextInterface{
    setPage:React.Dispatch<React.SetStateAction<number>>
    reservationData:Reservation
    setReservationData:React.Dispatch<React.SetStateAction<Reservation>>
    serverOfferings:Offering[]
    setServerOfferings:React.Dispatch<React.SetStateAction<Offering[]>>
    userOfferings:Offering[]
    setUserOfferings:React.Dispatch<React.SetStateAction<Offering[]>>
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
const dummyOffering : Offering[]=
[{
    desc: "pizza in bed",
    cost: 12
}]



export const initContext: AppContextInterface = {
    reservationData: dummyReservation,
    setReservationData: () => { },
    serverOfferings: [],
    setServerOfferings: () => { },
    userOfferings: dummyOffering,
    setUserOfferings: () => { },
    availableActivities: [],
    setAvailableActivities: () => { },
    setPage:()=>{}
}

export const appContext = createContext(initContext);