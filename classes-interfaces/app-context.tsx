import { createContext, useContext } from "react";




export interface AppContextInterface{
    reservationData:Reservation
    setReservationData:React.Dispatch<React.SetStateAction<Reservation>>
    serverOfferings:Offering[]
    setServerOfferings:React.Dispatch<React.SetStateAction<Offering[]>>
    userOfferings:Offering[]
    setUserOfferings:React.Dispatch<React.SetStateAction<Offering[]>>

}


const dummyReservation:Reservation = {
    id: "",
    checkIn: 0,
    checkOut: 1,
    owner: "",
    room: ""
}

export const initContext: AppContextInterface = {
    reservationData: dummyReservation,
    setReservationData: () => { },
    serverOfferings: [],
    setServerOfferings: () => { },
    userOfferings: [],
    setUserOfferings: ()=>{}
}

export const appContext = createContext(initContext);