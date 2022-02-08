
import React, { useState } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { appContext, AppContextInterface } from './classes-interfaces/app-context';
import ProblemReport from './components/page/problem-report';
import { Theme } from './SafariSolaceStyleTools/colorstyle';
import { themeContext, ThemeContextInterface } from './SafariSolaceStyleTools/themecontext';
import ReservationLogin from './components/page/login-page'
import ReservationHomePage from './components/page/reservation-homepage';
import ActivityView from './components/page/activity-view';


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



  const [pageIndex, setPageIndex] = useState(3);
  function switchPage(){
    switch(pageIndex){
      case                              0:{return (<ReservationLogin/>)}
      case /*Home page*/                1:{return ( <ReservationHomePage/>)}
      //case /*All Room Service*/         2:{return ( /*View Requested Services*/ )}
      //case /*Requested Room Service*/   3:{return ( /*View Offered Services*/ )}
      //case /*All Events*/               4:{return ( /*View All Events*/ )}
      case /*Problem Report*/           2:{return (<ProblemReport/>)} 
      case /*Brandon Testing*/  3:{return (<ActivityView/>)}
      case /*Kris Testing*/     4:{return (<><Text>Kris</Text></>)}
      case /*John Testing*/     5:{return (<><Text>John</Text></>)}
      case /*Josh testing*/     6:{return (<><Text>Josh</Text></>)}

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
