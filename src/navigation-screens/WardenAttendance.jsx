import { View, Text, TouchableOpacity,StyleSheet } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const WardenAttendance = () => {
  const navigation = useNavigation();
      
    return (
      <LinearGradient style={styles.gradient}
      colors={['#E6E6FA', '#43328B']}
        locations={[0.01, 1]}>
      <View>
        <Text>WardenPass</Text>
      </View>
      </LinearGradient>
    );
  };
  
  
  const styles = StyleSheet.create({
    gradient: {
      flex: 1,
    },
  });
  
export default WardenAttendance;
