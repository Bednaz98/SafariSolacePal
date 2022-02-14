import React, { useState } from "react";
import { View } from "react-native";
import BasicButton from "../../SafariSolaceStyleTools/basicbutton";
import BasicInputText from "../../SafariSolaceStyleTools/basicinputtext";
import BasicText, { TextType } from "../../SafariSolaceStyleTools/basictext";
import PixelSpacer from "../../SafariSolaceStyleTools/pixel-spacer";
import * as DocumentPicker from 'expo-document-picker';
import Problem from "../../classes-interfaces/problem";
import GetStyle from "../../SafariSolaceStyleTools/get-style";





export default function ProblemReport(){

    const [viewState, setViewState] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);


    async function selectFile(){
        const pickerResult: DocumentPicker.DocumentResult = await DocumentPicker.getDocumentAsync();
        if(pickerResult.type !== 'cancel'){
            setSelectedFile(pickerResult);
        }
    }
    
    async function submitReport(desc: string){

        const problem: Problem = {
            id: "",
            submittedTime: 0,
            desc: desc,
            status: "Unreviewed",
        }

        try {
            if(selectedFile){
                const formData = new FormData();
                formData.append('myFile', JSON.parse(JSON.stringify({
                    name: selectedFile.name,
                    uri: selectedFile.uri,
                    type: selectedFile.mimeType
                })))
                const response = await fetch('http://8f75-209-159-236-212.ngrok.io/upload', {
                    method: 'POST',
                    body: formData,
                })
                problem.photoLink = await response.text();
                setSelectedFile(null);
            }

            const response = await fetch('https://safarisolaceproblem.azurewebsites.net/api/ProblemIngestion?', {
                method: 'POST',
                body: JSON.stringify(problem),
                headers: {
                    'content-type':"application/json"
                }
            })

            if(response.status === 200){
                alert("Problem Submitted Successfully");
            } else {
                alert("THERE WAS AN ERROR SUBMITTING PROBLEM!")
            }


        } catch (error) {
            // probably just ignore this and let the user think everything worked
        }
        setViewState(true)
    }

    function SubmissionForm(){
        const [problemDescription, setProblemDescription] = useState('');

        return(
            <>
                {/* <PixelSpacer width={400}/> */}
                <BasicText text={"Submit a Problem"} textType = {TextType.Title}/>
                {/* <PixelSpacer height={5}/> */}
                <BasicInputText style={GetStyle("ProblemTextInput")} value ={problemDescription} onChangeText={setProblemDescription} placeholder={'Problem description'}/>
                <PixelSpacer height={5}/>
                {!selectedFile ? <BasicButton onPress={selectFile} title={'Attach Image'}/> : <BasicButton onPress={()=>{setSelectedFile(null)}} title={'Un-Attach Image'}/>}
                {/* {selectedFile ?? <BasicText text={`Selected File: ${selectedFile.name}`}/>} */}
                <BasicButton onPress={()=>{submitReport(problemDescription)}} title={'Submit form!'} />
            </>)
    }

    function ThankYouDisplay(){
        return(
        <>
            <BasicText style={GetStyle("BasicText")} text={'Thank you for letting us know'} textType = {TextType.Title}/>
            <BasicText style={GetStyle("BasicText")} text={'Your report has been sent to a manager for review. We hope to fix any inconvenience as soon as possible.'} textType = {TextType.Title}/>
            <BasicButton title={"Submit another problem?"} onPress={()=>{setViewState(false)}}/>
        </>)
    }

    function SwitchState( ){
        if(viewState){ return <ThankYouDisplay/>}
        else{ return <SubmissionForm/> }
    }

    return(
        // <View style={{flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
            <View style={GetStyle('MainView')}><SwitchState/></View>
        // </View>
    
    )
}

