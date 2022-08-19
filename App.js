import { StyleSheet, View } from 'react-native'

import UploadScreen from './UploadScreen'

import AsyncStorage from '@react-native-async-storage/async-storage'

export default function App() {

  return (

    <View style={styles.container}>

      <UploadScreen/>

     

    </View>

  );

}

 

const styles = StyleSheet.create({

  container: {

    flex: 1,

  },

});
