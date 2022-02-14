import React, { useContext, useEffect } from "react";
import { View } from "react-native";
import { appContext, AppContextInterface } from "../../classes-interfaces/app-context";
import BasicText from "../../SafariSolaceStyleTools/basictext";
import GetStyle from "../../SafariSolaceStyleTools/get-style";


export default function ReservationHomePage(){

    const context = useContext(appContext);
    console.log("🚀 ~ file: reservation-homepage.tsx ~ line 9 ~ ReservationHomePage ~ context", context)
    console.log("🚀 ~ file: reservation-homepage.tsx ~ line 9 ~ ReservationHomePage ~ context.reservationdata ID", context.reservationData.id)
    console.log("🚀 ~ file: reservation-homepage.tsx ~ line 9 ~ ReservationHomePage ~ context offerings by id", context.userOfferings)

    function GetRoomName(){
        //const context = useContext(appContext);
        //console.log("🚀 ~ file: reservation-homepage.tsx ~ line 15 ~ GetRoomName ~ context", context.reservationData.Reservation.room)
        return(
        <>
            <BasicText style={GetStyle("BasicText")}text={"Room Name: "}/>
            <BasicText style={GetStyle("BasicText")}text={context.reservationData.room ?? 'N/A'}/>
        </>)
    }
    function GetCheckingInTime(){
        //const context = useContext(appContext);
        return(
            <>
                <BasicText style={GetStyle("BasicText")}text={"Check In Time: "}/>
                <BasicText style={GetStyle("BasicText")}text={(`${ (new Date(context.reservationData.checkIn ?? 'N/A')) .toDateString()} At: ${(new Date(context.reservationData.checkIn ?? 'N/A')).toLocaleTimeString() }`)}/>
            </>)
    }
    function GetCheckingOutTime(){
        //const context = useContext(appContext);
        return(
            <>
                <BasicText style={GetStyle("BasicText")}text={"Check Out Time: "}/>
                <BasicText style={GetStyle("BasicText")}text={(`${(new Date(context.reservationData.checkOut ?? 'N/A')).toDateString()} At: ${(new Date(context.reservationData.checkOut ?? "N/A")).toLocaleTimeString() }`)}/>
            </>)
    }
    function GetReservationID(){
        //const context = useContext(appContext);
        return(
            <>
                <BasicText style={GetStyle("BasicText")}text={"Reservation ID:  "}/>
                <BasicText style={GetStyle("BasicText")}text={(context.reservationData.id ?? 'N/A')}/>
            </>)
    }
    return(
    <View style={GetStyle("ReservationInfoView")}>
        <GetRoomName />
        <GetReservationID/>
        <GetCheckingInTime/>
        <GetCheckingOutTime/>
    </View>)

}