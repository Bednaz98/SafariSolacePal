//shows all the orders for a room
import React, { useState, useEffect, useContext } from "react";
import { FlatList } from "react-native";
import { View } from "react-native";
import httpHandler from "../../classes-interfaces/http-handler";
import LocalHandler from "../../classes-interfaces/localhandler";
import BasicButton from "../../SafariSolaceStyleTools/basicbutton";
import BasicText from "../../SafariSolaceStyleTools/basictext";
import v4 from "uuid/v4";
import { Offering, ServiceRequest } from "../../classes-interfaces/room-service";
import localhandler from "../../classes-interfaces/localhandler";
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
    
    //setOrders(testArr());
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

  function addOffer(props:Offering) {
    const serviceRequest: ServiceRequest = {
      id: v4(),
      room: context.room,
      created: (new Date()).getSeconds(),
      status: "Ordered",
      requestedOffering: [props],
    }
    console.log("hello",serviceRequest)
    httpHandle.postServiceRequest(serviceRequest)

  }

  return (
    <View>
      <BasicText text={"All Room Service Offerings"} />
      <FlatList
        data={orders}
        keyExtractor={(item) => v4()}
        renderItem={({ item }) => {
          return (
            <View>
              <View style={{flexDirection:"row"}}><BasicText text={item.desc} /><BasicText text={"$" + item.cost} /></View>
              <BasicButton onPress={()=>addOffer(item)} title={"Add"} />
            </View>
          );
        }}
      />
    </View>
  );
}
