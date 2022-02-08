import React, { useContext } from "react";
import { View } from "react-native";
import { appContext } from "../../classes-interfaces/app-context";
import BasicText from "../../SafariSolaceStyleTools/basictext";


export default function ReservationHomePage(){
    const context = useContext(appContext);
    let roomName:string
    if(context.reservationData?.room.length >0){roomName =context.reservationData.room }
    else{roomName = "Example Room Name"}
    let reservationID:string = 'Testing'//context?.reservationData?.room ?? "EXAMPLE ROOM"
    if(context.reservationData?.id.length >0){ reservationID = context.reservationData.id}
    else{reservationID = "EXAMPLEID"}
    const CheckInTime = `${(new Date(context.reservationData.checkIn)).toDateString()} At: ${(new Date(context.reservationData.checkIn)).toLocaleTimeString() }`
    const CheckOutTime = `${(new Date(context.reservationData.checkOut)).toDateString()} At: ${(new Date(context.reservationData.checkOut)).toLocaleTimeString() }`

    function GetRoomName(){
        return(
        <View style={{flexDirection:"row"}}>
            <BasicText text={"Room Name: "}/>
            <BasicText text={roomName}/>
        </View>)
    }
    function GetCheckingInTime(){
        return(
            <View style={{flexDirection:"row"}}>
                <BasicText text={"Check In Time: "}/>
                <BasicText text={CheckInTime}/>
            </View>)
    }
    function GetCheckingOutTime(){
        return(
            <View style={{flexDirection:"row"}}>
                <BasicText text={"Check Out Time: "}/>
                <BasicText text={CheckOutTime}/>
            </View>)
    }
    function GetReservationID(){
        return(
            <View style={{flexDirection:"row"}}>
                <BasicText text={"Reservation ID:  "}/>
                <BasicText text={reservationID}/>
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