import React from "react";
import { ActivityIndicator, View } from "react-native";
import BasicText from "../SafariSolaceStyleTools/basictext";



export default function LoadingScreen(){

    return(
        <View>
            <BasicText text={'Connecting to Server'}/>
            <ActivityIndicator/>
        </View>
    )
}