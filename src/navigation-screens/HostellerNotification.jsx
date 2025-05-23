import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';


const HostellerNotification = () => {
    const navigation = useNavigation();
    const [slideAnimation] = useState(new Animated.Value(0));
  return (
    <LinearGradient
          colors={['#E6E6FA', '#43328B']}
          locations={[0.01, 1]}
          style={styles.gradient}
        >
    <View>
      <Text>HostellerNotification</Text>
    </View>
    </LinearGradient>
  );
};


const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  });

export default HostellerNotification;
