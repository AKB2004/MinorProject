/* eslint-disable react-native/no-inline-styles */
// /* eslint-disable react-native/no-inline-styles */
import { View, Text,StyleSheet } from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';


const WardenDashboard = () => {
  return (
    <LinearGradient colors={['#E6E6FA', '#43328B']} locations={[0.01, 1]} style={styles.gradient}
                >
    <View>
      <Text style={{fontSize:30, marginTop:20}}>WardenDashboard hi</Text>
    <View style={styles.card}>

    </View>
    </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
    gradient: {
      flex: 1,
    },
    card: {
backgroundColor:'black',

width:200,
height:200,
    },
});

export default WardenDashboard;
