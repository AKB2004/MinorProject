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
      placeholder="Enter name"
      placeholderTextColor="#36454F"
      style={styles.input}/>
      <TextInput
      placeholder="Enter email ID"
      placeholderTextColor="#36454F"
      style={styles.input}/>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <TextInput
      placeholder="Contact Number"
      placeholderTextColor="#36454F"
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
    placeholderTextColor="#36454F"
    style={styles.input}/>
    <View style={styles.passwordContainer}>
    <TextInput
    placeholder="Enter Password"
    placeholderTextColor="#36454F"
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
     onPress={() => navigation.navigate('Details')}>
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
      width:300,
      height:250,
      marginLeft:40,
      marginTop:20,
      marginBottom:20,
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
      // marginTop:30,
    },
    button: {
      backgroundColor: '#43328B',
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 10,
      marginLeft:10,
      marginRight:22,
      marginTop: -10,
      // marginBottom:15,
      width:'auto',
    },
    button1: {
      backgroundColor: '#43328B',
      paddingVertical: 10,
      // paddingHorizontal: 20,
      borderRadius: 10,
      // width: '10%',
      // justifyContent:'center',
      marginLeft:100,
      marginRight:100,
      marginTop: 30,
      // marginBottom:15,
      width:'auto',
    },
    buttonText: {
      color: 'white', // Text color
      fontSize: 19,
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
    },
});
export default Register;
