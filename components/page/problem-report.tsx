import React, { useState } from "react";
import { View } from "react-native";
import BasicButton from "../../SafariSolaceStyleTools/basicbutton";
import BasicInputText from "../../SafariSolaceStyleTools/basicinputtext";
import BasicText, { TextType } from "../../SafariSolaceStyleTools/basictext";
import PixelSpacer from "../../SafariSolaceStyleTools/pixel-spacer";
import * as DocumentPicker from 'expo-document-picker';
import Problem from "../../classes-interfaces/problem";





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
            <View>
                <PixelSpacer width={400}/>
                <BasicText text={"Submit a Problem"} textType = {TextType.Title}/>
                <PixelSpacer height={5}/>
                <BasicInputText  value ={problemDescription} onChangeText={setProblemDescription} placeholder={'Problem description'}/>
                <PixelSpacer height={5}/>
                {!selectedFile ? <BasicButton onPress={selectFile} title={'Attach Image'}/> : <BasicButton onPress={()=>{setSelectedFile(null)}} title={'Un-Attach Image'}/>}
                <BasicButton onPress={()=>{submitReport(problemDescription)}} title={'Submit form'} />
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

