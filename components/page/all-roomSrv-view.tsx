//shows all the orders for a room

import { FlatList, View } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import httpHandler from "../../classes-interfaces/http-handler";
import BasicButton from "../../SafariSolaceStyleTools/basicbutton";
import BasicText from "../../SafariSolaceStyleTools/basictext";
import v4 from "uuid/v4";
import { Offering, ServiceRequest } from "../../classes-interfaces/room-service";
import localhandler from "../../classes-interfaces/localhandler";
import GetStyle from "../../SafariSolaceStyleTools/get-style";
import { appContext } from "../../classes-interfaces/app-context";

export function RoomServiceOfferings() {
  
  const httpHandle = new httpHandler(true);
  const localhandle =new localhandler()
  const context = useContext(appContext);

  const arr: Offering[] = []; 
  const [orders, setOrders] = useState(arr);

  console.log("SDFASIFASBFIASB",localhandle.getLocalOfferings());

  useEffect(() => {
    console.log('offerings display')
    setOrders(localhandle.getLocalOfferings());
  }, []);

  function testArr(){
    let arr1 = [];
    for(let i = 0; i < 4; i++){
      let obj : Offering = {
        desc: "Test Item",
        cost: 0
      } 
      arr1.push(obj);
    }
    return arr1;
  }

  function addOffer(item) {
    //httpHandle.postServiceRequest(props);
    const currentRequests = localhandle.getUserOfferings()
    currentRequests.push(item)
    localhandle.setUserOfferings(currentRequests)
//   function addOffer(props:Offering) {
//     const serviceRequest: ServiceRequest = {
//       id: v4(),
//       room: context.room,
//       created: (new Date()).getSeconds(),
//       status: "Ordered",
//       requestedOffering: [props],
//     }
//     console.log("hello",serviceRequest)
//     httpHandle.postServiceRequest(serviceRequest)


  }

  const style = GetStyle("OfferingsText")
  return (
    <>
      <BasicText style={GetStyle("TitleText")}  text={"All Room Service Offerings"} />
      <View style={GetStyle("FlatlistView")}>
          <FlatList
            data={orders}
            keyExtractor={(item) => v4()}
            renderItem={({ item }) => {
              return (
                <>
                  <BasicText style={style} text={item.desc} />
                  <BasicText style={style} text={"$" + item.cost} />
    
                  <View style={{flex:1, width: '60%',alignSelf:'center'}}><BasicButton onPress={()=>addOffer(item)} title={"Add"} /></View>
                </>
              );
            }}
          />
      </View>
    </>
  );
}
