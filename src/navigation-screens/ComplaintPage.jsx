
/* eslint-disable no-unused-vars */

import { View, Text, StyleSheet, Image, TouchableOpacity, Animated, TextInput,Alert } from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';


const HandleConfirmButton = ()=>{
  Alert.alert('Request has been sent.');
}
const AttendancePage = () => {
    const navigation = useNavigation();
const [slideAnimation] = useState(new Animated.Value(0));
  const [isExpanded, setIsExpanded] = useState(false);

  // Toggle the expanded state
  // const toggleExpanded = () => {
  //   const toValue = isExpanded ? 0 : 1;

  //   Animated.spring(slideAnimation, {
  //     toValue,
  //     friction: 5,
  //     tension: 40,
  //     useNativeDriver: true,
  //   }).start();

  //   setIsExpanded(!isExpanded);
  // };

  // Navigate to a specific screen
  const navigateTo = (screenName) => {
    // Close the panel if it's open
    if (isExpanded) {
      Animated.spring(slideAnimation, {
        toValue: 0,
        friction: 5,
        tension: 40,
        useNativeDriver: true,
      }).start(() => {
        setIsExpanded(false);
      });
    }

    // Navigate to the screen
    navigation.navigate(screenName);
  };

  // Calculate the translation based on animation value
  const translateY = slideAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 100], // Adjust this value based on how much you want it to slide up
  });

  return (
    <LinearGradient
    colors={['#E6E6FA', '#43328B']}
    locations={[0.01, 1]}
    style={styles.gradient}>



      <View>
        <Text style={styles.texting}>Choose the Service</Text>
      </View>
      <View style={styles.divisionMange}>
        <View style={styles.division}>
          <Image
          source={require('../../assets/img/electricianicon.png')}
          style={styles.imageiconsize}/>
          <Text style={{fontSize:15, color:'#fff', alignSelf:'center'}}>Electrician</Text>
        </View>
        <View style={styles.division}>
        <Image
          source={require('../../assets/img/furnitureicon.png')}
          style={styles.imageiconsize}/>
          <Text style={{fontSize:15, color:'#fff', alignSelf:'center'}}>Furniture</Text>
        </View>
        <View style={styles.division}>
        <Image
          source={require('../../assets/img/plumbericon.png')}
          style={styles.imageiconsize}/>
          <Text style={{fontSize:15, color:'#fff', alignSelf:'center'}}>Plumber</Text>
        </View>
        <View style={styles.division}>
        <Image
          source={require('../../assets/img/othersicon.png')}
          style={styles.imageiconsize}/>
          <Text style={{fontSize:15, color:'#fff', alignSelf:'center'}}>Others</Text>
        </View>
      </View>
      <Text style={{fontSize:25, alignSelf:'center',marginTop:0}}>______________________</Text>
      <TextInput
      placeholder="Any further details.."
      style={styles.input}
      placeholderTextColor="grey"
      multiline={true}/>
      {/* <TouchableOpacity style={styles.button} onPress={handleConfirm}>
        <Text style={styles.buttonText}>Confirm</Text>
      </TouchableOpacity> */}
      <TouchableOpacity
      style={styles.Confirmbutton}
      onPress={HandleConfirmButton}>
      <Text style={styles.buttonText}>
        Confirm
      </Text>
      </TouchableOpacity>


<View style={styles.bottomNavContainer}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigateTo('AttendancePage')}
        >
          <Image
            source={require('../../assets/img/attendanceBOTTOMicon.png')}
            style={styles.navIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigateTo('ComplaintPage')}
        >
          <LinearGradient
            colors={['#C71585', '#43328B']}
            style={styles.complaintButton}
            borderRadius={30}
          >
          <Image
            source={require('../../assets/img/complaintBOTTOMicon.png')}
            style={styles.navIcon}
          />
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => navigateTo('Dashboard')}
          // onPress={toggleExpanded}
        >
          {/* <LinearGradient
            colors={['red', '#43328B']}
            style={styles.homeButtonGradient}
            borderRadius={30}
          > */}
            <Image
              source={require('../../assets/img/homeBOTTOMicon.png')}
              style={styles.homeIcon}
            />
          {/* </LinearGradient> */}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigateTo('MessPage')}
        >
          <Image
            source={require('../../assets/img/messBOTTOMicon.png')}
            style={styles.navIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigateTo('FeesPage')}
        >
          <Image
            source={require('../../assets/img/feeBOTTOMicon.png')}
            style={styles.navIcon}
          />
        </TouchableOpacity>
      </View>

    </LinearGradient>
);
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  texting:{
    fontSize:30,
    fontWeight:'bold',
    marginTop:30,
    alignSelf:'center',
  },
  img: {
    height: 70,
    width: 200,
  },
  img1: {
    height: 70,
    width: 50,
  },
  img2: {
    height: 120,
    width: 120,
  },
  img3: {
    height: 50,
    width: 50,
  },
  imageiconsize:{
    width:100,
    height:100,
    alignSelf:'center',
    // resizeMode: 'contain',
  },
  division:{
    backgroundColor:'#43328B',
    height:130,
    width:130,
    borderRadius:25,
  },
  divisionMange:{
    flexDirection:'row',
    flexWrap:'wrap',
    gap:30,
    justifyContent:'center',
    alignItems:'center',
    marginTop:30,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 15,
    marginTop: 20,
    marginRight: 10,
  },
  container1: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: 30,
    gap: 20,
    marginLeft: 15,
  },
  input: {
    height: 200,
    width:300,
    borderWidth: 1,
    borderColor: '#6A5ACDdd',
    borderRadius: 20,
    paddingHorizontal: 15,
    marginTop:10,
    fontSize: 16,
    alignSelf:'center',
    // flexDirection:'row',
    color: 'black',
    backgroundColor: '#fff',
    textAlign: 'center',
    fontWeight:600,
    textAlignVertical: 'center',
  },
  complaintButton: {
    height: 60, // Increase height for uplift
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30, // Lift icon upwards
    backgroundColor: '#fff',
    borderRadius: 30,
    elevation: 5, // Shadow for a floating effect
},
Confirmbutton: {
  backgroundColor: '#43328B',
  paddingVertical: 15,
  borderRadius: 5,
  alignItems: 'center',
  marginTop: 15,
  width:'60%',
  alignSelf:'center',
},
buttonText: {
  color: '#fff',
  fontSize: 18,
  fontWeight: 500,
},
  text1: {
    fontSize: 30,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  text2: {
    fontSize: 20,
    fontWeight: 'light',
  },
  text3: {
    fontSize: 19,
    fontWeight: 'bold',
  },
  text4: {
    fontSize: 19,
    fontWeight: 'light',
  },

  // Bottom Navigation Styles
  bottomNavContainer: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    height: 90,
    backgroundColor: '#43328B',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 8,
    // borderTopLeftRadius: 15,
    // borderTopRightRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  navButton: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navIcon: {
    height: 24,
    width: 24,
  },
  homeButton: {
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  homeButtonGradient: {
    height: 60,
    width: 60,
    borderRadius: 30,

    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  homeIcon: {
    height: 30,
    width: 30,
    tintColor: '#fff',
    // marginBottom:35,
  },
  // Expandable Panel Styles
  expandablePanel: {
    position: 'absolute',
    bottom: 70,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    zIndex: 999,
  },
  // panelContent: {
  //   backgroundColor: '#fff',
  //   borderRadius: 20,
  //   marginHorizontal: 20,
  //   padding: 15,
  //   shadowColor: '#000',
  //   shadowOffset: { width: 0, height: 2 },
  //   shadowOpacity: 0.1,
  //   shadowRadius: 4,
  //   elevation: 3,
  // },
  // cardButton: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   backgroundColor: '#f0f0f0',
  //   padding: 12,
  //   borderRadius: 10,
  // },
  // cardIcon: {
  //   width: 24,
  //   height: 24,
  //   marginRight: 10,
  // },
  // cardText: {
  //   fontSize: 16,
  //   color: '#43328B',
  //   fontWeight: '500',
  // },
});


export default AttendancePage;
