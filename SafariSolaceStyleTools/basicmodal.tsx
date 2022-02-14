import React, { useState } from "react";
import { Modal, View,StyleSheet, Button } from "react-native";
import BasicButton from "./basicbutton";
import BasicText from "./basictext";
import GetColor, { Color } from "./colorstyle";
import GetStyle from "./get-style";



export default function BasicModal(props){
  let child = props.child
  const openTitle = props?.openTitle ?? "null open title"
  

  const [show, setShow] = useState(false);
  const styles = StyleSheet.create({
    modalView: {
        flex: 1,
        flexDirection:"column",
        paddingHorizontal: 30,
        margin: 20,
        backgroundColor:GetColor(Color.Modal),
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 0
      }
  }
});

    return(
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={show}
          onRequestClose={() => {setShow(!show)}}>
          {/* <View style={GetStyle("ReservationText")} > */}
            <View style={styles.modalView}>

              <View style={{width:"100%", height:'100%'}}>
                {child}
              </View>
              <View style={GetStyle("ReservationText")}>
                <BasicButton title={"close"} onPress={()=>{setShow(!show)}}/>
              </View>

            {/* </View> */}
          </View>
        </Modal>

        <BasicButton title={openTitle} onPress={()=>{setShow(true)}}/>

      </View>)
      
}



