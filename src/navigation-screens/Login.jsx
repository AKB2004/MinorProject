/* eslint-disable eol-last */
// /* eslint-disable react-native/no-inline-styles */
// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet,Image } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import Icon from 'react-native-vector-icons/Ionicons'; // Import eye icon
// import { useNavigation } from '@react-navigation/native';

// const Login = () => {
//   const navigation = useNavigation();
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false); // Toggle visibility

//   return (
//     <LinearGradient
//       colors={['#E6E6FA', '#43328B']}
//       locations={[0.01, 1]}
//       style={styles.gradient}
//     >
//       <View style={styles.container}>
// <Image source={require('../../assets/img/loginpagepic.png')} style={styles.img}/>

//         {/* Username Input */}
//         <Text style={{fontSize:30,fontWeight:'bold', marginBottom:5}}>Welcome Back!</Text>
//         <Text style={{fontSize:17,fontWeight:'light',marginBottom:30}}>Please enter your details</Text>
//         <TextInput
//           placeholder="Enter username"
//           placeholderTextColor="#36454F"
//           style={styles.input}
//         />

//         {/* Password Input */}
//         <View style={styles.passwordContainer}>
//           <TextInput
//             placeholder="Password"
//             placeholderTextColor="#36454F"
//             style={styles.passwordInput}
//             secureTextEntry={!showPassword} // Hide/show password
//             value={password}
//             onChangeText={setPassword}
//           />

//           <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
//             <Icon
//               name={showPassword ? 'eye' : 'eye-off'} // Eye icon toggle
//               size={24}
//               color="black"
//               style={styles.eyeIcon}
//             />
//           </TouchableOpacity>

//         </View>
//         <Text style={{marginLeft:210,marginTop:10}}>Recovery Password</Text>
//       </View>
//       <TouchableOpacity
//               style={styles.button}
//               onPress={() => navigation.navigate('Dashboard')}>
//                 <Text style={styles.buttonText}>       Login       </Text>
//               </TouchableOpacity>
//               <Text style={{marginBottom:10}}>_________________________________</Text>
//               <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//     <Text style={styles.recoveryText}>Not a member? </Text>
//     <TouchableOpacity onPress={() => navigation.navigate('Register')}>
//         <Text style={{ color: '#51158C', fontWeight: 'bold',marginTop:15 }}>Register now</Text>
//     </TouchableOpacity>
// </View>
//     </LinearGradient>
//   );
// };

// const styles = StyleSheet.create({
//   gradient: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   container: {
//     width: '93%',
//     padding: 20,
//     alignItems: 'center',

//   },
//   input: {
//     width: '100%',
//     borderWidth: 1,
//     borderColor: 'grey',
//     padding: 10,
//     borderRadius: 10,
//     marginBottom: 15,
//     height: 60,
//     marginTop:5,
//     backgroundColor: 'white',
//     fontSize:20,
//   },
//   passwordContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: 'grey',
//     borderRadius: 10,
//     width: '100%',
//     marginTop:15,
//     height: 60,
//     backgroundColor: 'white',
//   },
//   passwordInput: {
//     flex: 1,
//     padding: 10,
//     fontSize:20,
//   },
//   eyeIcon: {
//     padding: 10,
//   },
//   recoveryText: {
//     textAlign: 'right',
//     marginTop: 15,
//     alignSelf: 'flex-end', // Align to right
//     color: 'black',
//     fontSize:17,
//   },
//   button: {
//     backgroundColor: '#43328B',
//     paddingVertical: 12,
//     paddingHorizontal: 70,
//     borderRadius: 8,
//     marginTop: 35,
//     marginBottom:15,
//     width:300,
//   },
//   buttonText: {
//     color: 'white', // Text color
//     fontSize: 20,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   img: {
//     width:300,
//     height:200,
//   },
// });

// export default Login;






/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons'; // Import eye icon
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const navigation = useNavigation();
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Toggle visibility
  const [userType, setUserType] = useState('hosteller'); // 'hosteller' or 'warden'

  // Default warden credentials
  const WARDEN_USERNAME = 'warden123';
  const WARDEN_PASSWORD = 'admin123';

  const handleLogin = () => {
    if (userType === 'warden') {
      if (username === WARDEN_USERNAME && password === WARDEN_PASSWORD) {
        // Navigate to warden dashboard
        navigation.navigate('WardenDashboard', { userType: 'warden' });
      } else {
        // Show invalid credentials alert
        Alert.alert(
          'Invalid Credentials',
          'The username or password you entered is incorrect.',
          [{ text: 'OK' }]
        );
      }
    } else {
      // Regular login process for hostellers
      navigation.navigate('Dashboard');
    }
  };

  return (
    <LinearGradient
      colors={['#E6E6FA', '#43328B']}
      locations={[0.01, 1]}
      style={styles.gradient}
    >
      <View style={styles.container}>
        <Image source={require('../../assets/img/loginpagepic.png')} style={styles.img}/>

        <Text style={{fontSize:25,fontWeight:'bold', marginBottom:5}}>Welcome Back!</Text>
        <Text style={{fontSize:14,fontWeight:'light',marginBottom:20}}>Please enter your details</Text>

        {/* User Type Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              styles.tab,
              userType === 'warden' && styles.activeTab,
            ]}
            onPress={() => setUserType('warden')}
          >
            <Text style={[
              styles.tabText,
              userType === 'warden' && styles.activeTabText,
            ]}>Warden</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tab,
              userType === 'hosteller' && styles.activeTab,
            ]}
            onPress={() => setUserType('hosteller')}
          >
            <Text style={[
              styles.tabText,
              userType === 'hosteller' && styles.activeTabText,
            ]}>Hosteller</Text>
          </TouchableOpacity>
        </View>

        {/* Username Input */}
        <TextInput
          placeholder="Username"
          placeholderTextColor="#ced4da"
          style={styles.input}
          value={username}
          onChangeText={setUsername}
        />

        {/* Password Input */}
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Password"
            placeholderTextColor="#ced4da"
            style={styles.passwordInput}
            secureTextEntry={!showPassword} // Hide/show password
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Icon
              name={showPassword ? 'eye' : 'eye-off'} // Eye icon toggle
              size={24}
              color="black"
              style={styles.eyeIcon}
            />
          </TouchableOpacity>
        </View>
        {userType === 'hosteller' && (
          <Text style={{alignSelf: 'flex-end', marginTop:10}}>Recovery Password</Text>
        )}
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {userType === 'hosteller' && (
        <>
          <Text style={{marginBottom:10}}>_________________________________</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.recoveryText}>Not a member? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={{ color: '#51158C', fontWeight: 'bold',marginTop:15 }}>Register now</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '93%',
    padding: 20,
    alignItems: 'center',
  },
  hostelTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#43328B',
    marginBottom: 15,
    textAlign: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 20,
    borderRadius: 25,
    overflow: 'hidden',
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#43328B',
  },
  tabText: {
    fontSize: 16,
    color: '#777777',
  },
  activeTabText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#F0F0F0',
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
    height: 50,
    backgroundColor: '#F0F0F0',
    color:'black',
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F0F0F0',
    borderRadius: 10,
    width: '100%',
    height: 50,
    backgroundColor: '#F0F0F0',
  },
  passwordInput: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    color:'#000',
  },
  eyeIcon: {
    padding: 10,
  },
  recoveryText: {
    textAlign: 'right',
    marginTop: 15,
    alignSelf: 'flex-end', // Align to right
    color: 'black',
    fontSize: 17,
  },
  button: {
    backgroundColor: '#43328B',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
    marginBottom: 15,
    width: '80%',
  },
  buttonText: {
    color: 'white', // Text color
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  img: {
    width: 230,
    height: 150,
    marginTop:-60,
  },
});

export default Login;




//this is vivek code with backend intergration

// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import Icon from 'react-native-vector-icons/Ionicons';
// import { useNavigation } from '@react-navigation/native';
// import axios from 'axios';

// const Login = () => {
//   const navigation = useNavigation();
//   const [password, setPassword] = useState('');
//   const [username, setUsername] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [userType, setUserType] = useState('hosteller');

//   const WARDEN_USERNAME = 'warden123';
//   const WARDEN_PASSWORD = 'admin123';

//   const handleLogin = async () => {
//     if (userType === 'warden') {
//       if (username === WARDEN_USERNAME && password === WARDEN_PASSWORD) {
//         navigation.navigate('WardenDashboard', { userType: 'warden' });
//       } else {
//         Alert.alert(
//           'Invalid Credentials',
//           'The username or password you entered is incorrect.',
//           [{ text: 'OK' }]
//         );
//       }
//     } else {
//       try {
//         const response = await axios.post(
//           'http://10.0.2.2:8080/api/v1/login',
//           {
//             email: username,
//             password: password,
//           }
//         );

//         if (response.data) {
//           console.log('Login success:', response.data);
//           Alert.alert('Login Successful', 'Welcome!', [
//             {
//               text: 'OK',
//               onPress: () => navigation.navigate('Dashboard'),
//             },
//           ]);
//         }
//       } catch (error) {
//         console.error('Login error:', error.response?.data || error.message);
//         let errorMessage = 'Please check your credentials and try again.';

//         if (error.response?.status === 401) {
//           errorMessage = 'Please verify your email before logging in.';
//         }

//         Alert.alert('Login Failed', errorMessage);
//       }
//     }
//   };

//   return (
//     <LinearGradient
//       colors={['#E6E6FA', '#43328B']}
//       locations={[0.01, 1]}
//       style={styles.gradient}
//     >
//       <View style={styles.container}>
//         <Image
//           source={require('../../assets/img/loginpagepic.png')}
//           style={styles.img}
//         />

//         <Text style={styles.title}>Welcome Back!</Text>
//         <Text style={styles.subtitle}>Please enter your details</Text>

//         <View style={styles.tabContainer}>
//           <TouchableOpacity
//             style={[styles.tab, userType === 'warden' && styles.activeTab]}
//             onPress={() => setUserType('warden')}
//           >
//             <Text
//               style={[styles.tabText, userType === 'warden' && styles.activeTabText]}
//             >
//               Warden
//             </Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={[styles.tab, userType === 'hosteller' && styles.activeTab]}
//             onPress={() => setUserType('hosteller')}
//           >
//             <Text
//               style={[
//                 styles.tabText,
//                 userType === 'hosteller' && styles.activeTabText,
//               ]}
//             >
//               Hosteller
//             </Text>
//           </TouchableOpacity>
//         </View>

//         <TextInput
//           placeholder="Username"
//           placeholderTextColor="#36454F"
//           style={styles.input}
//           value={username}
//           onChangeText={setUsername}
//         />

//         <View style={styles.passwordContainer}>
//           <TextInput
//             placeholder="Password"
//             placeholderTextColor="#36454F"
//             style={styles.passwordInput}
//             secureTextEntry={!showPassword}
//             value={password}
//             onChangeText={setPassword}
//           />
//           <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
//             <Icon
//               name={showPassword ? 'eye' : 'eye-off'}
//               size={24}
//               color="black"
//               style={styles.eyeIcon}
//             />
//           </TouchableOpacity>
//         </View>

//         {userType === 'hosteller' && (
//           <Text style={styles.recoveryLink}>Recovery Password</Text>
//         )}
//       </View>

//       <TouchableOpacity style={styles.button} onPress={handleLogin}>
//         <Text style={styles.buttonText}>Login</Text>
//       </TouchableOpacity>

//       {userType === 'hosteller' && (
//         <>
//           <Text style={styles.divider}>_</Text>
//           <View style={styles.registerContainer}>
//             <Text style={styles.registerText}>Not a member? </Text>
//             <TouchableOpacity onPress={() => navigation.navigate('Register')}>
//               <Text style={styles.registerLink}>Register now</Text>
//             </TouchableOpacity>
//           </View>
//         </>
//       )}
//     </LinearGradient>
//   );
// };

// const styles = StyleSheet.create({
//   gradient: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   container: {
//     width: '93%',
//     padding: 20,
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 25,
//     fontWeight: 'bold',
//     marginBottom: 5,
//   },
//   subtitle: {
//     fontSize: 14,
//     fontWeight: '300',
//     marginBottom: 20,
//   },
//   tabContainer: {
//     flexDirection: 'row',
//     width: '100%',
//     marginBottom: 20,
//     borderRadius: 25,
//     overflow: 'hidden',
//   },
//   tab: {
//     flex: 1,
//     paddingVertical: 10,
//     backgroundColor: '#F0F0F0',
//     alignItems: 'center',
//   },
//   activeTab: {
//     backgroundColor: '#43328B',
//   },
//   tabText: {
//     fontSize: 16,
//     color: '#777777',
//   },
//   activeTabText: {
//     color: '#FFFFFF',
//     fontWeight: 'bold',
//   },
//   input: {
//     width: '100%',
//     borderWidth: 1,
//     borderColor: '#F0F0F0',
//     padding: 10,
//     borderRadius: 10,
//     marginBottom: 15,
//     height: 50,
//     backgroundColor: '#F0F0F0',
//     fontSize: 16,
//   },
//   passwordContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#F0F0F0',
//     borderRadius: 10,
//     width: '100%',
//     height: 50,
//     backgroundColor: '#F0F0F0',
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
//   recoveryLink: {
//     alignSelf: 'flex-end',
//     marginTop: 10,
//     color: '#36454F',
//     fontSize: 14,
//   },
//   button: {
//     backgroundColor: '#43328B',
//     paddingVertical: 12,
//     borderRadius: 8,
//     marginTop: 20,
//     marginBottom: 15,
//     width: '80%',
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   divider: {
//     marginBottom: 10,
//   },
//   registerContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   registerText: {
//     fontSize: 16,
//     color: '#000',
//   },
//   registerLink: {
//     color: '#51158C',
//     fontWeight: 'bold',
//     marginTop: 15,
//   },
//   img: {
//     width: 230,
//     height: 150,
//     marginTop: -60,
//   },
// });

// export default Login;