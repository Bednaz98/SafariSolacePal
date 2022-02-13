import React from "react";
import { View } from "react-native";
import BasicButton from "../../SafariSolaceStyleTools/basicbutton";
import GetStyle from "../../SafariSolaceStyleTools/get-style";




export default function NavBar(props){
    const navFunc:Function = props.navFunc

    return(
    <View style={GetStyle("NavView")}>
        <BasicButton title={"Reservation"} onPress={()=>navFunc(1)} />
        <BasicButton title={"Your Orders"} onPress={()=>navFunc(2)} />
        <BasicButton title={"Room Service"} onPress={()=>navFunc(3)} />
        <BasicButton title={"Events"} onPress={()=>navFunc(4)} />
        <BasicButton title={"Report a Problem"} onPress={()=>navFunc(5)} />
    </View>)
}