import { View } from "react-native";
import BasicText, { TextType } from '../../SafariSolaceStyleTools/basictext'
import BasicInputText from '../../SafariSolaceStyleTools/basicinputtext'
import BasicButton from '../../SafariSolaceStyleTools/basicbutton'
import { useState } from "react";


export default function ReservationLogin(){
    const [reservation, setReservation] = useState('');
    const [firstTry, setFirstTry] = useState(false);

    /**this should be used to check if the input reservation is valid*/
    function reservationCheck(){
        if(!firstTry){setFirstTry(true)}
        return Boolean(reservation.length >0)
    }
    function tryLoginHTTP(){
        if(!firstTry){setFirstTry(true)}
        console.log("try login pressed")

    }

    function TryLoginButton(){
        return(<BasicButton title={"Login with Reservation"} onPress={tryLoginHTTP}/>)
    }

    function InvalidWarning(){
        if(!firstTry){ return <> <TryLoginButton/></>}
        else if(reservationCheck()){ return <><TryLoginButton/></>}
        else{return <><BasicText text={"You may have entered an invalid URL, if not please contact a manager"}/> </>}
    }
    return(
        <View>
            <BasicText text={"Welcome To Safari SolaceStyle Resorts"} textType ={TextType.Title}/>
            <BasicText text={"Please Enter your Reservation ID"} textType ={TextType.Header}/>
            <BasicInputText value = {reservation} placeholder={"1234"} onChangeText={setReservation} />
            <InvalidWarning />
        </View>
    )
}