/* eslint-disable react-native/no-inline-styles */
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const Details = () => {
  const navigation = useNavigation();

  return (
    <LinearGradient
      colors={['#E6E6FA', '#43328B']}
      locations={[0.01, 1]}
      style={styles.gradient}>
        <View>
      <Text style={styles.gender}>Gender</Text>
    </View>
    <View style={styles.imgplace}>
    <Image source={require('../../assets/img/maleicon.png')} style={styles.img}/>
    <Image source={require('../../assets/img/femaleicon.png')} style={styles.img}/>
    </View>
    <View style={styles.imgplace}>
    <Text style={styles.text}>Male</Text>
    <Text style={styles.text}>Female</Text>
    </View>
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate('DetailsPage2')}>
      <Text style={styles.buttonText}>Confirm</Text>
    </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
    gradient: {
      flex: 1,
      // justifyContent: 'center',
      // alignItems: 'center',
    },
    gender: {
      fontSize:25,
      fontWeight:'bold',
      textAlign:'center',
      marginTop:200,
      marginBottom:80,
    },
    img:{
      width:100,
      height:100,
    },
    imgplace: {
      flexDirection:'row',
      justifyContent:'space-around',
      // alignItems:'center',
    },
    text:{
      fontSize:20,
      marginLeft:10,
    },
    button: {
      backgroundColor: '#43328B',
      paddingVertical: 15,
      // paddingHorizontal: 70,
      borderRadius: 10,
      marginTop: 100,
      alignSelf:'center',
      // marginBottom:15,
      width:'50%',
    },
    buttonText: {
      color: 'white', // Text color
      fontSize: 19,
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });
export default Details;
