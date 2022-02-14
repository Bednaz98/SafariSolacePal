
import React, { useState } from 'react';
import { StatusBar, StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import { appContext, AppContextInterface } from './classes-interfaces/app-context';
import ProblemReport from './components/page/problem-report';
import { themeContext, ThemeContextInterface } from './SafariSolaceStyleTools/themecontext';
import ReservationHomePage from './components/page/reservation-homepage';
import NavBar from './components/children/nav-bar';
import ActivityView from './components/page/activity-view';
import Reservation from './classes-interfaces/Reservation';
import { Offering, ServiceRequest } from './classes-interfaces/room-service';
import { RoomServiceOfferings } from './components/page/all-roomSrv-view';
import { UserRoomServiceOrder } from './components/page/user-roomSrv';
import LoadingScreen from './components/loadingScreen';
import { Activity } from './classes-interfaces/activity';
import GetStyle from './SafariSolaceStyleTools/get-style';
import { Theme } from './SafariSolaceStyleTools/styleconfig';
import ReservationLogin from './components/page/login-page';



export default function App() {
  const [statetheme, setTheme] = useState(Theme.default);
  const [pageIndex, setPageIndex] = useState(0);


  // dummy values
  const dummyReservation:Reservation={
    id: 'dude',
    checkIn: 0,
    checkOut: 0,
    owner: 'me',
    room: '404'
  }

// const dummyOffering1:Offering[] =[]
//   const dummyOffering2:ServiceRequest={
//     id: '',
//     room: '',
//     created: 0,
//     status: 'Ordered',
//     requestedOffering: []
//   }

// const dummyOffering2 : Offering[]=
// [{
//     desc: "pizza in bed",
//     cost: 12
// }]

  const [reservation, setReservation] = useState<Reservation>(dummyReservation);
  const [serverOfferingList, setServerOfferingList] = useState<Offering[]>();
  const [userServerOffering, setUserServerOffering] = useState<ServiceRequest[]>();
  const [activityList, setActivityList] = useState<Activity[]>();


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
  const themeContextObject:ThemeContextInterface = {theme:statetheme,setTheme:setTheme}

  function ShowNavBar(){
    return <NavBar navFunc={setPageIndex}/>
  }


  function SwitchPage(){
    switch(pageIndex){
      case                              0:{return(<ReservationLogin setPageIndex={setPageIndex}/>)}
      case /*Home page*/                1:{return(<><ShowNavBar/><ReservationHomePage/></>)}
      case /*All Events*/               2:{return(<><ShowNavBar/><UserRoomServiceOrder/></>)}
      case /*All Room Service*/         3:{return(<><ShowNavBar/><RoomServiceOfferings/></>)}
      case /*All Events*/               4:{return(<><ShowNavBar/><ActivityView/></>)}
      case /*Problem Report*/           5:{return(<><ShowNavBar/><ProblemReport/></>)}
      default :                           {return<LoadingScreen/>}
    }
  }

  const HeightScale = Dimensions.get('window').height
  console.log("🚀 ~ file: RealApp.tsx ~ line 87 ~ RealApp ~ HeightScale", HeightScale)
  const WidthScale = Dimensions.get('window').width
  console.log("🚀 ~ file: RealApp.tsx ~ line 89 ~ RealApp ~ WidthScale", WidthScale)
  return (
    <View style={{width:'100%',height:'100%',justifyContent:"center", alignSelf:"center", backgroundColor:'black'}}>
      <appContext.Provider value = {initContext}>
        <themeContext.Provider value = { themeContextObject }>
          <SwitchPage/>
        </themeContext.Provider>
      </appContext.Provider>
    </View>
  );
}


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#999',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
