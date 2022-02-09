///shows all the orders for a room
import React, { useState, useEffect } from "react";
import { FlatList } from "react-native";
import { View } from "react-native";
import BasicButton from "../../SafariSolaceStyleTools/basicbutton";
import BasicText from "../../SafariSolaceStyleTools/basictext";
import v4 from "uuid/v4";
import { Offering, ServiceRequest } from "../../classes-interfaces/room-service";
import localhandler from "../../classes-interfaces/localhandler";

export function UserRoomServiceOrder() {
    //const httpHandle = new httpHandler();
    const localHandle = new localhandler()

    const userOfferings = localHandle.getLocalOfferings()

    const [orders, setOrders] = useState(userOfferings);
    //console.log(localHandle.getUserOfferings())

//     useEffect(() => {
//     setOrders(httpHandle.);
//     //setOrders(testArr());
// }, []);

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

  function remove(props) {
    // httpHandle.cancelServiceRequest(props);
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
              <BasicText text={item.desc ?? "Example"} />
              <BasicText text={"$" + item.cost} />
              <BasicButton onPress={remove(item.desc)} title={"Remove"} />
            </View>
          );
        }}
      />
    </View>
  );
}
