import { Button, StyleSheet, View } from 'react-native';
import React from 'react';
// import {NavigationContainer} from '@react-navigation/native';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';

const MyButton = () => {
  return (
    <View style={styles.container}>
      <Button title="Started" style={styles.Button} onPress={()=> navigation.navigate('Login') }/>
    </View>
  );
};

export default MyButton;

const styles = StyleSheet.create({
    container:{
        alignItems:'center',
    },
    Button:{
        textAlign:'center',
    },
});
