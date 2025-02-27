import { View, Text, Image } from 'react-native';
import React from 'react';

const Pic = () => {
  return (
    <View>
      <Text style={{fontSize:20}}>Pic</Text>
      <Image source={require('../../assets/img/first.png')}/>
    </View>
  );
};

export default Pic;
