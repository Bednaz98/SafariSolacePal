
import React, { useState } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { appContext, AppContextInterface } from './classes-interfaces/app-context';
import ProblemReport from './components/page/problem-report';
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
  const [activityList, setActivityList] = useState([]);


  const initContext:AppContextInterface = {
    reservationData: reservation,
    setReservationData: setReservation,
    serverOfferings: serverOfferingList,
    setServerOfferings: setServerOfferingList,
    userOfferings: userServerOffering,
    setUserOfferings: setUserServerOffering,
    availableActivities: activityList,
    setAvailableActivities: setActivityList
  }
  const themeContextObject:ThemeContextInterface = {theme:theme,setTheme:setTheme}



  const [pageIndex, setPageIndex] = useState(2);
  function switchPage(){
    switch(pageIndex){
      case                      0:{return (<><Text>Default page</Text></>)}
      case                      1:{return (<><Text>Page 2</Text></>)}
      case /*Josh testing*/     2:{return (<><ProblemReport/></>)} 
      case /*Brandon Testing*/  3:{return (<><Text>Brandon</Text></>)}
      case /*Kris Testing*/     4:{return (<><Text>Kris</Text></>)}
      case /*John Testing*/     5:{return (<><Text>John</Text></>)}

    }
  }


  
  return (
    <View style={styles.container}>
      <appContext.Provider value = {initContext}>
        <themeContext.Provider value = { themeContextObject }>
          {switchPage()}
        </themeContext.Provider>
      </appContext.Provider>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#999',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
