/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons'; // Import eye icon
import { useNavigation } from '@react-navigation/native';

const Register = () => {
  const navigation = useNavigation();
  const [password,setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);


  return (
    <LinearGradient
          colors={['#E6E6FA', '#43328B']}
          locations={[0.01, 1]}
          style={styles.gradient}
        >
    <View>
      <Text style={{fontSize:30, fontWeight:'bold',marginTop:30,marginLeft:20}}>Sign Up</Text>
      <Text style={{fontSize:20,marginLeft:20}}>Let's Know about yourself</Text>
      <Image source={require('../../assets/img/signuppagepic.png')} style={styles.img}/>
      <TextInput
      placeholder="Enter your name"
      placeholderTextColor="#ced4da"
      style={styles.input}/>
      <TextInput
      placeholder="Enter email ID"
      placeholderTextColor="#ced4da"
      style={styles.input}/>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <TextInput
      placeholder="Contact Number"
      placeholderTextColor="#ced4da"
      style={[styles.input1, { flex: 1 }]}
    />
    <TouchableOpacity
    onPress={() => console.log('Send OTP pressed')}
    style={styles.button}>
      <Text style={styles.buttonText}>
        Send OTP
      </Text>
    </TouchableOpacity>
  </View>
  <TextInput
    placeholder="Enter OTP"
    placeholderTextColor="#ced4da"
    style={styles.input}/>
    <View style={styles.passwordContainer}>
    <TextInput
    placeholder="Enter Password"
    placeholderTextColor="#ced4da"
    style={styles.passwordInput}
    secureTextEntry={!showPassword}
    value={password}
    onChangeText={setPassword}/>
    <TouchableOpacity
    onPress={() =>
      setShowPassword(!showPassword)}>
      <Icon
      name={showPassword ? 'eye' : 'eyeoff'}
      size={24}
      color="black"
      style={styles.eyeIcon}/>
    </TouchableOpacity>
    </View>
    </View>
    <TouchableOpacity
     style={styles.button1}
     onPress={() => navigation.navigate('DetailsPage2')}>
      <Text style={styles.buttonText}>Authenticate</Text>
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
    img:{
      width:150,
      height:150,
      // alignSelf:'center',
      marginLeft:110,
      marginTop:10,
      marginBottom:10,
    },
    input: {
      width: '89%',
      borderWidth: 1,
      borderColor: 'grey',
      padding: 10,
      borderRadius: 10,
      marginBottom: 15,
      height: 50,
      marginTop:10,
      backgroundColor: 'white',
      marginLeft:20,
      fontSize:14,
      color:'black',
      // marginTop:30,
    },
    input1: {
      width: '60%',
      borderWidth: 1,
      borderColor: 'grey',
      padding: 10,
      borderRadius: 10,
      marginBottom: 15,
      height: 50,
      marginTop:10,
      backgroundColor: 'white',
      marginLeft:20,
      fontSize:14,
      color:'black',
      // marginTop:30,
    },
    button: {
      backgroundColor: '#43328B',
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 10,
      fontSize:20,
      marginLeft:10,
      marginRight:22,
      marginTop: -10,
      // marginBottom:15,
      width:'auto',
    },
    button1: {
      backgroundColor: '#43328B',
      paddingVertical: 12,
      // paddingHorizontal: 20,
      borderRadius: 10,
      // width: '10%',
      // justifyContent:'center',
      marginLeft:100,
      marginRight:100,
      marginTop: 30,
      // marginBottom:15,
      width:'auto',
      fontSize:20,
    },
    buttonText: {
      color: 'white', // Text color
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    eyeIcon: {
      padding: 10,
    },
    passwordContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: 'grey',
      borderRadius: 10,
      width: '89%',
      marginTop:10,
      marginLeft:20,
      height: 50,
      backgroundColor: 'white', // Same as input
    },
    passwordInput: {
      flex: 1,
      padding: 10,
      fontSize:14,
      color:'black',
    },
});
export default Register;








//this is vivek code with backend intergration

// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, Platform } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import Icon from 'react-native-vector-icons/Ionicons';
// import { useNavigation } from '@react-navigation/native';
// import axios from 'axios'; // UPDATED: Import axios for API calls

// const SignUp = () => {
//   const navigation = useNavigation();
  
//   // UPDATED: Added state for firstName, lastName, and email
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName]   = useState('');
//   const [email, setEmail]         = useState('');
//   const [password, setPassword]   = useState('');
//   const [showPassword, setShowPassword] = useState(false);

//   // UPDATED: Function to handle registration via API call
//   const handleSignUp = async () => {
//     try {
//       const response = await axios.post('http://10.0.2.2:8080/api/v1/registration', { // UPDATE endpoint URL accordingly
//         firstName, // firstName: firstName,
//         lastName,  // lastName: lastName,
//         email,     // email: email,
//         password,  // password: password
//       });
//       console.log('Registration success:', response.data);
//       Alert.alert(
//         'Registration Successful',
//         'Please check your email to confirm your account.',
//         [
//           {
//             text: 'OK',
//             onPress: () => navigation.navigate('Login'), // Navigate after alert confirmation
//           },
//         ]
//       );
//     } catch (error) {
//       console.error('Registration error:', error);
//       Alert.alert(
//         'Registration Failed',
//         'Enter your details.'
//       );
//     }
//   };

//   return (
//     <LinearGradient
//       colors={['#E6E6FA', '#43328B']}
//       locations={[0.01, 1]}
//       style={styles.gradient}
//     >
//       <View style={styles.container}>
//         <Text style={styles.title}>Sign Up</Text>
//         <Text style={styles.subtitle}>Let's know about yourself</Text>
//         <Image source={require('../../assets/img/signuppagepic.png')} style={styles.img} />
        
//         {/* UPDATED: First Name Input */}
//         <TextInput
//           placeholder="Enter first name"
//           placeholderTextColor="#36454F"
//           style={styles.input}
//           value={firstName}
//           onChangeText={setFirstName}
//         />
        
//         {/* UPDATED: Last Name Input */}
//         <TextInput
//           placeholder="Enter last name"
//           placeholderTextColor="#36454F"
//           style={styles.input}
//           value={lastName}
//           onChangeText={setLastName}
//         />
        
//         {/* UPDATED: Email Input */}
//         <TextInput
//           placeholder="Enter email ID"
//           placeholderTextColor="#36454F"
//           style={styles.input}
//           value={email}
//           onChangeText={setEmail}
//           autoCapitalize="none"
//         />
        
//         {/* UPDATED: Password Input with eye toggle */}
//         <View style={styles.passwordContainer}>
//           <TextInput
//             placeholder="Enter Password"
//             placeholderTextColor="#36454F"
//             style={styles.passwordInput}
//             secureTextEntry={!showPassword}
//             value={password}
//             onChangeText={setPassword}
//           />
//           <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
//             <Icon
//               name={showPassword ? 'eye' : 'eye-off'} // Note: "eyeoff" is corrected to "eye-off"
//               size={24}
//               color="black"
//               style={styles.eyeIcon}
//             />
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* UPDATED: Use handleSignUp instead of direct navigation */}
//       <TouchableOpacity style={styles.button1} onPress={handleSignUp}>
//         <Text style={styles.buttonText}>Authenticate</Text>
//       </TouchableOpacity>
//     </LinearGradient>
//   );
// };

// const styles = StyleSheet.create({
//   gradient: {
//     flex: 1,
//     padding: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   container: {
//     width: '100%',
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 30,
//     fontWeight: 'bold',
//     // marginTop: 30,
//     alignSelf: 'flex-start',
//     marginLeft: 20,
//   },
//   subtitle: {
//     fontSize: 20,
//     alignSelf: 'flex-start',
//     marginLeft: 20,
//     marginBottom: 10,
//   },
//   img: {
//     width: 220,
//     height: 170,
//     marginVertical: 20,
//   },
//   input: {
//     width: '90%',
//     borderWidth: 1,
//     borderColor: '#36454F',
//     padding: 10,
//     borderRadius: 10,
//     marginVertical: 8,
//     backgroundColor: '#fff',
//   },
//   passwordContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     width: '90%',
//     borderWidth: 1,
//     borderColor: '#36454F',
//     borderRadius: 10,
//     backgroundColor: '#fff',
//     marginVertical: 8,
//   },
//   passwordInput: {
//     flex: 1,
//     padding: 10,
//     fontSize: 16,
//     color: '#000',
//   },
//   eyeIcon: {
//     padding: 10,
//   },
//   button1: {
//     backgroundColor: '#43328B',
//     paddingVertical: 12,
//     borderRadius: 8,
//     marginTop: 20,
//     width: '80%',
//     alignSelf: 'center',
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
// });

// export default SignUp;