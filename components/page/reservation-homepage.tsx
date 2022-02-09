import React, { useContext, useEffect } from "react";
import { View } from "react-native";
import { appContext } from "../../classes-interfaces/app-context";
import BasicText from "../../SafariSolaceStyleTools/basictext";


export default function ReservationHomePage(){
    const context = useContext(appContext);
    console.log("🚀 ~ file: reservation-homepage.tsx ~ line 9 ~ ReservationHomePage ~ context", context)

    function GetRoomName(){
        const context = useContext(appContext);
        return(
        <View style={{flexDirection:"row"}}>
            <BasicText text={"Room Name: "}/>
            <BasicText text={context.reservationData?.room ?? 'example'}/>
        </View>)
    }
    function GetCheckingInTime(){
        const context = useContext(appContext);
        return(
            <View style={{flexDirection:"row"}}>
                <BasicText text={"Check In Time: "}/>
                <BasicText text={(`${ (new Date(context.reservationData.checkIn)) .toDateString()} At: ${(new Date(context.reservationData.checkIn)).toLocaleTimeString() }`)}/>
            </View>)
    }
    function GetCheckingOutTime(){
        const context = useContext(appContext);
        return(
            <View style={{flexDirection:"row"}}>
                <BasicText text={"Check Out Time: "}/>
                <BasicText text={(`${(new Date(context.reservationData.checkOut)).toDateString()} At: ${(new Date(context.reservationData.checkOut)).toLocaleTimeString() }`)}/>
            </View>)
    }
    function GetReservationID(){
        const context = useContext(appContext);
        return(
            <View style={{flexDirection:"row"}}>
                <BasicText text={"Reservation ID:  "}/>
                <BasicText text={(context.reservationData?.id ?? 'EXAMPLE')}/>
            </View>)
    }

    return(
    <View>
        <GetRoomName />
        <GetReservationID/>
        <GetCheckingInTime/>
        <GetCheckingOutTime/>
    </View>)

    
}