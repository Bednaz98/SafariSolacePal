import React, { useContext, useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { appContext } from "../classes-interfaces/app-context";
import httpHandler from "../classes-interfaces/http-handler";
import BasicText from "../SafariSolaceStyleTools/basictext";



export default function LoadingScreen(){
    return(
        <View>
            <BasicText text={'Connecting to Server'}/><ActivityIndicator/>
        </View>)
}