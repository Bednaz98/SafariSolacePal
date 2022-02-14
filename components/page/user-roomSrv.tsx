///shows all the orders for a room
import React, { useState, useEffect } from "react";
import { FlatList } from "react-native";
import { View } from "react-native";
import BasicButton from "../../SafariSolaceStyleTools/basicbutton";
import BasicText from "../../SafariSolaceStyleTools/basictext";
import v4 from "uuid/v4";
import { Offering} from "../../classes-interfaces/room-service";
import localhandler from "../../classes-interfaces/localhandler";
import httpHandler from "../../classes-interfaces/http-handler";
import GetStyle from "../../SafariSolaceStyleTools/get-style";

export function UserRoomServiceOrder() {
    const httpHandle = new httpHandler(true);
    const localHandle = new localhandler()

    const userOfferings = localHandle.getUserOfferings()
    //console.log("🚀 ~ file: user-roomSrv.tsx ~ line 16 ~ UserRoomServiceOrder ~ userOfferings", userOfferings)

    const [orders, setOrders] = useState(userOfferings);

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

  function remove(itemIndex) {
    const requestedOfferings = orders
    requestedOfferings.splice(itemIndex,1)
    setOrders([...requestedOfferings])
    localHandle.setUserOfferings(requestedOfferings);

  }

  const style = GetStyle("OfferingsText")
  return (


    <>
        <BasicText style={GetStyle("TitleText")} text={"Your requested room service offerings"} />
        <View style={GetStyle("FlatlistView")}>

          <FlatList
            data={orders}
            keyExtractor={(item) => v4()}
            renderItem={({ item, index }) => {
              return (
                <>
                  <BasicText style={style} text={item.desc ?? "Example"} />
                  <BasicText style={style} text={"$" + item.cost} />
                  <BasicButton onPress={()=>remove(index)} title={"Remove"} />
                </>
              );
            }}
          />
        </View>
    </>


  );
}
