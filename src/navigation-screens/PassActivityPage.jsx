import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

const PassActivityPage = () => {
  return (
    <LinearGradient
              colors={['#E6E6FA', '#43328B']}
              locations={[0.01, 1]}
              style={styles.gradient}
            >
                <Text style={styles.passActivity}>
                    1 Day Pass
                </Text>
            </LinearGradient>
  );
};

const styles = StyleSheet.create({
    gradient:{
        flex:1,
    }
})
export default PassActivityPage;
