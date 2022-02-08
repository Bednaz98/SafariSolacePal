import React, { useState } from "react";
import { View, Text } from "react-native";
import BasicButton from "../../SafariSolaceStyleTools/basicbutton";
import BasicInputText from "../../SafariSolaceStyleTools/basicinputtext";
import BasicText, { TextType } from "../../SafariSolaceStyleTools/basictext";
import PixelSpacer from "../../SafariSolaceStyleTools/pixel-spacer";



export default function ProblemReport(){
    const [viewState, setViewState] = useState(false);

    function submitReport(){
        try {
            // handler catch here
        } catch (error) {
            // probably just ignore this and let the user think everything worked
        }
        setViewState(true)
    }

    function SubmissionForm(){
        const [problemTitle, setProblemTitle] = useState('');
        const [problemDescription, setProblemDescription] = useState('');
        return(
            <View>
                <PixelSpacer width={400}/>
                <BasicText text={"Submit a Problem"} textType = {TextType.Title}/>
                <PixelSpacer height={5}/>
                <BasicInputText  value ={problemTitle} onChangeText={setProblemTitle} placeholder={'problem title'}/>
                <PixelSpacer height={5}/>
                <BasicInputText  value ={problemDescription} onChangeText={setProblemDescription} placeholder={'problem description'}/>
                <PixelSpacer height={5}/>
                <BasicButton onPress={()=>{submitReport()}} title={'Submit form'} />
            </View>)
    }

    function ThankYouDisplay(){
        return(
        <View>
            <BasicText text={'Thank you you for lettings us know'} textType = {TextType.Title}/>
            <BasicText text={'Your report has been sent to a manager for review. We hope to fix any inconvenient as soon as possible.'} textType = {TextType.Title}/>
            <BasicButton title={"Submit another problem?"} onPress={()=>{setViewState(false)}}/>
        </View>)
    }

    function SwitchState( ){
        if(viewState){ return <ThankYouDisplay/>}
        else{ return <SubmissionForm/> }
    }

    return(
        <View style={{flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
            <SwitchState/>
        </View>
    
    )
}

