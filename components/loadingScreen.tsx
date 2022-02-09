import React, { useContext, useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { appContext } from "../classes-interfaces/app-context";
import httpHandler from "../classes-interfaces/http-handler";
import BasicText from "../SafariSolaceStyleTools/basictext";



export default function LoadingScreen(){
    const context = useContext(appContext);
    const HTTP = new httpHandler()
    useEffect(() => {
      context.setPage(1)
    
      return () => {

      };
    }, [context]);
    

    return(
        <View>
            <BasicText text={'Connecting to Server'}/>
            <ActivityIndicator/>
        </View>
    )
}