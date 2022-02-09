import { View } from "react-native";
import BasicText, { TextType } from '../../SafariSolaceStyleTools/basictext'
import BasicInputText from '../../SafariSolaceStyleTools/basicinputtext'
import BasicButton from '../../SafariSolaceStyleTools/basicbutton'
import { useContext, useEffect, useState } from "react";
import httpHandler from "../../classes-interfaces/http-handler";
import LoadingScreen from "../loadingScreen";
import { appContext } from "../../classes-interfaces/app-context";


export default function ReservationLogin(props){
    const [reservationID, setReservationID] = useState('');
    const [firstTry, setFirstTry] = useState(false);
    const [showError, setShowError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [pageIndex, setPage] = useState(0)

    const HTTP:httpHandler = new httpHandler(true)
    const context = useContext(appContext)

    useEffect(()=>{context.setPage(1)}, [context.reservationData, context.userOfferings])
    /**this should be used to check if the input reservation is valid*/
    function reservationCheck(){
        if(!firstTry){setFirstTry(true)};
        return Boolean(reservationID.length > 0);
    }
    async function tryLoginHTTP(){
        if(!firstTry){setFirstTry(true)}
        try {
            console.log("try login pressed");
            setShowError(false);

            let isReady = false
            HTTP.syncApp(reservationID).then((value)=> {isReady = value; console.log('http syncApp .then return:',isReady)})
            console.log("isReady after syncApp: ",isReady)
            //if (isReady) {context.setPage(1)}
            //await props.setPageIndex(-1) //go to loading screen
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

    // function Display(){
    //     switch(isLoading){
    //         case true:{return <LoadingScreen/>}
    //         case false:{
    //             return (
    //             <View>
    //                 <BasicText text={"Welcome To Safari SolaceStyle Resorts"} textType ={TextType.Title}/>
    //                 <BasicText text={"Please Enter your Reservation ID"} textType ={TextType.Header}/>
    //                 <BasicInputText value = {reservationID} placeholder={"1234"} onChangeText={setReservationID} />
    //                 <InvalidWarning />
    //             </View>)
    //         }

    //     }
    // }
    return(
        <View>
            <BasicText text={"Welcome To Safari SolaceStyle Resorts"} textType ={TextType.Title}/>
            <BasicText text={"Please Enter your Reservation ID"} textType ={TextType.Header}/>
            <BasicInputText value = {reservationID} placeholder={"1234"} onChangeText= {setReservationID} />
            <InvalidWarning />
        </View>
    )
}