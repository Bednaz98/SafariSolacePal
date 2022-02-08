
import React, { useState } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { appContext, AppContextInterface } from './classes-interfaces/app-context';
import { Theme } from './SafariSolaceStyleTools/colorstyle';
import { themeContext, ThemeContextInterface } from './SafariSolaceStyleTools/themecontext';

export default function App() {
  const [theme, setTheme] = useState(Theme.default);


  // dummy values
  const dummyReservation:Reservation={
    id: '',
    checkIn: 0,
    checkOut: 0,
    owner: '',
    room: ''
  }
  const dummyOffering1:Offering[] =[]
  const dummyOffering2:Offering[] =[]

  const [reservation, setReservation] = useState(dummyReservation);
  const [serverOfferingList, setServerOfferingList] = useState(dummyOffering1);
  const [userServerOffering, setUserServerOffering] = useState(dummyOffering2);


  const initContext:AppContextInterface = {
    reservationData: reservation,
    setReservationData: setReservation,
    serverOfferings: serverOfferingList,
    setServerOfferings: setServerOfferingList,
    userOfferings: userServerOffering,
    setUserOfferings: setUserServerOffering
  }
  const themeContextObject:ThemeContextInterface = {theme:theme,setTheme:setTheme}



  const [pageIndex, setPageIndex] = useState(0);
  function switchPage(){
    switch(pageIndex){
      case                      0:{return (<><Text>Default page</Text></>)}
      case                      1:{return (<><Text>Page 2</Text></>)}
      case /*Josh testing*/     2:{return (<><Text>josh</Text></>)}
      case /*Brandon Testing*/  3:{return (<><Text>Brandon</Text></>)}
      case /*Kris Testing*/     4:{return (<><Text>Kris</Text></>)}
      case /*John Testing*/     5:{return (<><Text>John</Text></>)}

    }
  }


  
  return (
    <appContext.Provider value = {initContext}>
      <themeContext.Provider value = { themeContextObject }>

        <View style={styles.container}>
          {switchPage()}
        </View>
  
      </themeContext.Provider>
    </appContext.Provider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
