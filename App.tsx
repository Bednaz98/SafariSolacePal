import {useEffect, useState } from "react";
import { View } from "react-native";
import { ssContext, ssContextInterface } from "./developer-styling-tools/ss-context";
import SSPlayground from "./developer-styling-tools/ss-playground";
import { ssKeys, ssKeysInterface } from "./developer-styling-tools/ss-style-keys";
import RealApp from "./RealApp";
//the sliderStyler psuedo app
export default function App(){

    const [styleContextObject, setStyleContextObject] = useState<ssKeysInterface>(ssKeys)

    useEffect(()=>{console.log("styleContext Object updated")}, [styleContextObject])

    //context initializer
    const ssContextInit: ssContextInterface = {
        styleContextObject: styleContextObject,
        setStyleContextObject: setStyleContextObject,
        setByKey: (keys: string, style: Object) => {
            let styleContextObjectClone = styleContextObject
            styleContextObjectClone[keys] = style
            setStyleContextObject({...styleContextObjectClone}) //very important to include {...}, wont rerender otherwise
        },
        getByKey: (keys: string, style: Object) => {
            return (styleContextObject[keys])
        }
    }
  
    return(
        <ssContext.Provider value = {ssContextInit}>
                {/* <SSPlayground/> */}
                <RealApp></RealApp>
        </ssContext.Provider>
    )
}



