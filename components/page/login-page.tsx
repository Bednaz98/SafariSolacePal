import { View } from "react-native";
import BasicText, { TextType } from '../../SafariSolaceStyleTools/basictext'
import BasicInputText from '../../SafariSolaceStyleTools/basicinputtext'
import BasicButton from '../../SafariSolaceStyleTools/basicbutton'
import { useState } from "react";
import httpHandler from "../../classes-interfaces/http-handler";
import LoadingScreen from "../loadingScreen";


export default function ReservationLogin(props){
    const [reservation, setReservation] = useState('');
    const [firstTry, setFirstTry] = useState(false);
    const [showError, setShowError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const HTTP:httpHandler = new httpHandler(true)

    /**this should be used to check if the input reservation is valid*/
    function reservationCheck(){
        if(!firstTry){setFirstTry(true)};
        return Boolean(reservation.length >0);
    }
    async function tryLoginHTTP(){
        if(!firstTry){setFirstTry(true)}
        try {
            console.log("try login pressed");
            setIsLoading(true)
            const returnReservation = await HTTP.getReservations(reservation)
            setShowError(false);
            console.log("login data: ",returnReservation)
            await HTTP.syncApp(reservation)
            await props.setPageIndex(-1) //go to loading screen
            //Set context State Here ...
            //switch page ...
        } catch (error) {
            setShowError(true);
            setIsLoading(false)
        }
    }

    function TryLoginButton(){
        return(<BasicButton title={"Login with Reservation"} onPress={tryLoginHTTP}/>)
    }

    function InvalidWarning(){
        return <> <TryLoginButton/></>
        if(!firstTry){ return <> <TryLoginButton/></>}
        else if(!showError && reservationCheck()){ return <><TryLoginButton/></>}
        else{return <><BasicText text={"You may have entered an invalid URL, if not please contact a manager"}/> </>}
    }

    function Display(){
        switch(isLoading){
            case true:{return <LoadingScreen/>}
            case false:{
                return (
                <View>
                    <BasicText text={"Welcome To Safari SolaceStyle Resorts"} textType ={TextType.Title}/>
                    <BasicText text={"Please Enter your Reservation ID"} textType ={TextType.Header}/>
                    <BasicInputText value = {reservation} placeholder={"1234"} onChangeText={setReservation} />
                    <InvalidWarning />
                </View>)
            }

        }
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