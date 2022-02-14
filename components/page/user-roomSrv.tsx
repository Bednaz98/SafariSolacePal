///shows all the orders for a room
import React, { useState, useEffect, useContext } from "react";
import { FlatList } from "react-native";
import { View } from "react-native";
import BasicButton from "../../SafariSolaceStyleTools/basicbutton";
import BasicText from "../../SafariSolaceStyleTools/basictext";
import v4 from "uuid/v4";
import { Offering, ServiceRequest } from "../../classes-interfaces/room-service";
import localhandler from "../../classes-interfaces/localhandler";
import httpHandler from "../../classes-interfaces/http-handler";
import { appContext } from "../../classes-interfaces/app-context";

export function UserRoomServiceOrder() {
    const httpHandle = new httpHandler(true);
    const localHandle = new localhandler()
    const context = useContext(appContext);
    
    const userOfferings = localHandle.getUserOfferings()

    const [orders, setOrders] = useState([]);

    useEffect(() => {
      setOrders(userOfferings)
    }),[]

  function testArr(){
    let arr1 = [];
    for(let i = 0; i < 4; i++){
      let obj : Offering = {
        desc: `"Item Description Here"`, 
        cost: 0
      } 
      arr1.push(obj);
    }
    return arr1;
  }

  async function remove(props) {
    await httpHandle.cancelServiceRequest(props)
    await httpHandle.syncApp(context.room)

  }

  return (
    <View>
      <BasicText text={"Room Service Options"} />
      <FlatList
        data={orders}
        keyExtractor={(item) => v4()}
        renderItem={({ item }) => {
          return (
            <View>
              <View style={{flexDirection:"row"}}><BasicText text={item.desc ?? "Example"} /><BasicText text={"$" + item.cost} /></View>
              <BasicButton onPress={() => remove(item)} title={"Remove"} />
            </View>
          );
        }}
      />
    </View>
  );
}
