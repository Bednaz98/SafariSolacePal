
import React, { useState } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { appContext, AppContextInterface } from './classes-interfaces/app-context';
import ProblemReport from './components/page/problem-report';
import { Theme } from './SafariSolaceStyleTools/colorstyle';
import { themeContext, ThemeContextInterface } from './SafariSolaceStyleTools/themecontext';
import ReservationLogin from './components/page/login-page'
import ReservationHomePage from './components/page/reservation-homepage';
import NavBar from './components/children/nav-bar';
import ActivityView from './components/page/activity-view';
import Reservation from './classes-interfaces/Reservation';
import { Offering, ServiceRequest } from './classes-interfaces/room-service';
import { RoomServiceOfferings } from './components/page/all-roomSrv-view';
import { UserRoomServiceOrder } from './components/page/user-roomSrv';
import LoadingScreen from './components/loadingScreen';


export default function App() {
  const [theme, setTheme] = useState(Theme.default);
  const [pageIndex, setPageIndex] = useState(0);


  // dummy values
  const dummyReservation:Reservation={
    id: '',
    checkIn: 0,
    checkOut: 0,
    owner: '',
    room: ''
  }

  const dummyOffering1:Offering[] =[]
  const dummyOffering2:ServiceRequest={
    id: '',
    room: '',
    created: 0,
    status: 'Ordered',
    requestedOffering: []
  }


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
    setAvailableActivities: setActivityList,
    setPage:setPageIndex
  }
  const themeContextObject:ThemeContextInterface = {theme:theme,setTheme:setTheme}

  function ShowNavBar(){
    return <NavBar navFunc={setPageIndex}/>
  }


  function SwitchPage(){
    switch(pageIndex){
      case                              0:{return (<ReservationLogin setPageIndex = {setPageIndex}/>)}
      case /*Home page*/                1:{return (<>< ShowNavBar/><ReservationHomePage/> </>)}
      case /*All Events*/               2:{return (<>< ShowNavBar/><UserRoomServiceOrder/></> )}
      case /*All Room Service*/         3:{return (<>< ShowNavBar/><RoomServiceOfferings/></> ) }
      case /*All Events*/               4:{return (<>< ShowNavBar/><ActivityView/></> )}
      case /*Problem Report*/           5:{return (<>< ShowNavBar/><ProblemReport/></>)} 
      default :                           {return <LoadingScreen/>}
    }
  }

  return (
    <View style={styles.container}>
      <appContext.Provider value = {initContext}>
        <themeContext.Provider value = { themeContextObject }>
          <SwitchPage/>
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
