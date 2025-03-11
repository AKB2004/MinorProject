import { View, Text,StyleSheet } from 'react-native';
import React from 'react';

const First = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.textchange}>SecuResidences</Text>
      <Text style={styles.text}>A Smart Hostel Management App</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      padding: 20,
      alignItems: 'center',
      marginTop:-10,
      marginBottom:50,
    },
    text: {
      fontSize: 14,
      fontWeight: 'bold',
      color: 'black', // Custom color
      textAlign: 'center',
    },
    textchange:{
      fontSize:39,
      marginTop:-20,
      fontWeight:'bold',
    },
  });

export default First;


// import { View, Text, StyleSheet } from 'react-native';
// import React from 'react';
// import MaskedView from '@react-native-masked-view/masked-view';
// import LinearGradient from 'react-native-linear-gradient';

// const First = () => {
//   return (
//     <View style={styles.container}>
//       {/* Gradient Text */}
//       <MaskedView maskElement={<Text style={styles.textchange}>SecuResidences</Text>}>
//         <LinearGradient
//           colors={['#FF5733', '#FF8D1A', '#FFC300']} // Gradient colors
//           start={{ x: 0, y: 0 }}
//           end={{ x: 1, y: 0 }}
//           style={{ flex: 1 }}
//         />
//       </MaskedView>

//       {/* Normal Text */}
//       <Text style={styles.text}>A Smart Hostel Management App</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     alignItems: 'center',
//     marginTop: -10,
//     marginBottom: 50,
//   },
//   text: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     color: 'black', // Custom color
//     textAlign: 'center',
//   },
//   textchange: {
//     fontSize: 39,
//     marginTop: -20,
//     fontWeight: 'bold',
//     backgroundColor: 'transparent', // Required for masking
//   },
// });

// export default First;
