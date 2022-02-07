
import React, { useState } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';

export default function App() {
  



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
    <View style={styles.container}>
      {switchPage()}
    </View>
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
