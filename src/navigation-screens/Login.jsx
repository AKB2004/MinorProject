/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons'; // Import eye icon
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const navigation = useNavigation();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Toggle visibility

  return (
    <LinearGradient
      colors={['#E6E6FA', '#43328B']}
      locations={[0.01, 1]}
      style={styles.gradient}
    >
      <View style={styles.container}>
<Image source={require('../../assets/img/loginpagepic.png')} style={styles.img}/>

        {/* Username Input */}
        <Text style={{fontSize:30,fontWeight:'bold', marginBottom:5}}>Welcome Back!</Text>
        <Text style={{fontSize:17,fontWeight:'light',marginBottom:30}}>Please enter your details</Text>
        <TextInput
          placeholder="Enter username"
          placeholderTextColor="#36454F"
          style={styles.input}
        />

        {/* Password Input */}
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Password"
            placeholderTextColor="#36454F"
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
        <Text style={{marginLeft:210,marginTop:10}}>Recovery Password</Text>
      </View>
      <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Dashboard')}>
                <Text style={styles.buttonText}>       Login       </Text>
              </TouchableOpacity>
              <Text style={{marginBottom:10}}>_________________________________</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <Text style={styles.recoveryText}>Not a member? </Text>
    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={{ color: '#7F00FF', fontWeight: 'bold',marginTop:15 }}>Register now</Text>
    </TouchableOpacity>
</View>
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
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'grey',
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
    height: 60,
    marginTop:5,
    backgroundColor: 'white', // Better visibility
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 10,
    width: '100%',
    marginTop:15,
    height: 60,
    backgroundColor: 'white', // Same as input
  },
  passwordInput: {
    flex: 1,
    padding: 10,
  },
  eyeIcon: {
    padding: 10,
  },
  recoveryText: {
    textAlign: 'right',
    marginTop: 15,
    alignSelf: 'flex-end', // Align to right
    color: 'black',
    fontSize:15,
  },
  button: {
    backgroundColor: '#43328B',
    paddingVertical: 12,
    paddingHorizontal: 70,
    borderRadius: 8,
    marginTop: 35,
    marginBottom:15,
    width:300,
  },
  buttonText: {
    color: 'white', // Text color
    fontSize: 19,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  img: {
    width:300,
    height:200,
  },
});

export default Login;
