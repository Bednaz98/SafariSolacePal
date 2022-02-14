import React, { useContext, useEffect } from "react";
import { View } from "react-native";
import { appContext, AppContextInterface } from "../../classes-interfaces/app-context";
import BasicText from "../../SafariSolaceStyleTools/basictext";


export default function ReservationHomePage(){

    const context = useContext(appContext);
    console.log("🚀 ~ file: reservation-homepage.tsx ~ line 9 ~ ReservationHomePage ~ context", context)
    console.log("🚀 ~ file: reservation-homepage.tsx ~ line 9 ~ ReservationHomePage ~ context.reservationdata ID", context.reservationData.id)
    console.log("🚀 ~ file: reservation-homepage.tsx ~ line 9 ~ ReservationHomePage ~ context offerings by id", context.userOfferings)

    function GetRoomName(){
        //const context = useContext(appContext);
        //console.log("🚀 ~ file: reservation-homepage.tsx ~ line 15 ~ GetRoomName ~ context", context.reservationData.Reservation.room)
        return(
        <View style={{flexDirection:"row"}}>
            <BasicText text={"Room Name: "}/>
            <BasicText text={context.reservationData.room ?? 'N/A'}/>
        </View>)
    }
    function GetCheckingInTime(){
        //const context = useContext(appContext);
        return(
            <View style={{flexDirection:"row"}}>
                <BasicText text={"Check In Time: "}/>
                <BasicText text={(`${ (new Date(context.reservationData.checkIn ?? 'N/A')) .toDateString()} At: ${(new Date(context.reservationData.checkIn ?? 'N/A')).toLocaleTimeString() }`)}/>
            </View>)
    }
    function GetCheckingOutTime(){
        //const context = useContext(appContext);
        return(
            <View style={{flexDirection:"row"}}>
                <BasicText text={"Check Out Time: "}/>
                <BasicText text={(`${(new Date(context.reservationData.checkOut ?? 'N/A')).toDateString()} At: ${(new Date(context.reservationData.checkOut ?? "N/A")).toLocaleTimeString() }`)}/>
            </View>)
    }
    function GetReservationID(){
        //const context = useContext(appContext);
        return(
            <View style={{flexDirection:"row"}}>
                <BasicText text={"Reservation ID:  "}/>
                <BasicText text={(context.reservationData.id ?? 'N/A')}/>
            </View>)
    }
    return(
    <View>
        <GetRoomName/>
        <GetReservationID/>
        <GetCheckingInTime/>
        <GetCheckingOutTime/>
    </View>)

}