// /* eslint-disable react-native/no-inline-styles */
// import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
// import React from 'react';
// import LinearGradient from 'react-native-linear-gradient';
// import { useNavigation } from '@react-navigation/native';

// const Details = () => {
//   const navigation = useNavigation();

//   return (
//     <LinearGradient
//       colors={['#E6E6FA', '#43328B']}
//       locations={[0.01, 1]}
//       style={styles.gradient}>
//         <View>
//       <Text style={styles.gender}>Gender</Text>
//     </View>
//     <View style={styles.imgplace}>
//     <Image source={require('../../assets/img/maleicon.png')} style={styles.img}/>
//     <Image source={require('../../assets/img/femaleicon.png')} style={styles.img}/>
//     </View>
//     <View style={styles.imgplace}>
//     <Text style={styles.text}>Male</Text>
//     <Text style={styles.text}>Female</Text>
//     </View>
//     <TouchableOpacity
//       style={styles.button}
//       onPress={() => navigation.navigate('DetailsPage2')}>
//       <Text style={styles.buttonText}>Confirm</Text>
//     </TouchableOpacity>
//     </LinearGradient>
//   );
// };

// const styles = StyleSheet.create({
//     gradient: {
//       flex: 1,
//       // justifyContent: 'center',
//       // alignItems: 'center',
//     },
//     gender: {
//       fontSize:25,
//       fontWeight:'bold',
//       textAlign:'center',
//       marginTop:200,
//       marginBottom:80,
//     },
//     img:{
//       width:100,
//       height:100,
//     },
//     imgplace: {
//       flexDirection:'row',
//       justifyContent:'space-around',
//       // alignItems:'center',
//     },
//     text:{
//       fontSize:20,
//       marginLeft:10,
//     },
//     button: {
//       backgroundColor: '#43328B',
//       paddingVertical: 15,
//       // paddingHorizontal: 70,
//       borderRadius: 10,
//       marginTop: 100,
//       alignSelf:'center',
//       // marginBottom:15,
//       width:'50%',
//     },
//     buttonText: {
//       color: 'white', // Text color
//       fontSize: 20,
//       fontWeight: 'bold',
//       textAlign: 'center',
//     },
//   });
// export default Details;



import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const Details = () => {
  const navigation = useNavigation();
  const [selectedGender, setSelectedGender] = useState(null);

  return (
    <LinearGradient
      colors={['#E6E6FA', '#43328B']}
      locations={[0.01, 2]}
      style={styles.gradient}>
        <View>
          <Text style={styles.gender}>Gender</Text>
        </View>
        <View style={styles.imgplace}>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => setSelectedGender('male')}
            style={[
              styles.imageContainer,
              selectedGender === 'male' && styles.selectedImage
            ]}
          >
            <Image source={require('../../assets/img/maleicon.png')} style={styles.img}/>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => setSelectedGender('female')}
            style={[
              styles.imageContainer,
              selectedGender === 'female' && styles.selectedImage
            ]}
          >
            <Image source={require('../../assets/img/femaleicon.png')} style={styles.img}/>
          </TouchableOpacity>
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
      fontSize: 25,
      fontWeight: 'bold',
      textAlign: 'center',
      marginTop: 200,
      marginBottom: 80,
    },
    img: {
      width: 100,
      height: 100,
    },
    imgplace: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      // alignItems: 'center',
    },
    imageContainer: {
      borderRadius: 50,
      padding: 5,
      borderWidth: 3,
      borderColor: 'transparent',
    },
    selectedImage: {
      borderColor: '#43328B',
      shadowColor: '#43328B',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.8,
      shadowRadius: 10,
      elevation: 10,
    },
    text: {
      fontSize: 20,
      marginLeft: 10,
    },
    button: {
      backgroundColor: '#43328B',
      paddingVertical: 15,
      // paddingHorizontal: 70,
      borderRadius: 10,
      marginTop: 100,
      alignSelf: 'center',
      // marginBottom: 15,
      width: '50%',
    },
    buttonText: {
      color: 'white', // Text color
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
    },
});

export default Details;