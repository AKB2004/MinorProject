// /* eslint-disable react-native/no-inline-styles */
// // /* eslint-disable react-native/no-inline-styles */
// import { View, Text, StyleSheet, Image } from 'react-native';
// import React from 'react';
// import LinearGradient from 'react-native-linear-gradient';
// const Dashboard = () => {
//   return (
//     <LinearGradient
//               colors={['#E6E6FA', '#43328B']}
//               locations={[0.01, 1]}
//               style={styles.gradient}
//             >
//         <View style={styles.container}>
//           <Image source={require('../../assets/img/dashboardFirstPic.png')}
//           style={styles.img}/>
//           <Image source={require('../../assets/img/notifications.png')}
//           style={styles.img1}/>
//         </View>
//         <View style={styles.container}>
//         <View style={{marginTop:30}}>
//           <Text style={styles.text1}>
//             Hi Sam
//           </Text>
//           <Text style={styles.text2}>
//             Good Morning!
//           </Text>
//         </View>
//         <Image source={require('../../assets/img/dashboardProfilePic.png')}
//           style={styles.img2}/>
//         </View>
//         <View style={styles.container1}>
//           <View style={{flexDirection:'row',
//           }}>
//             <Image source={require('../../assets/img/university.png')} style={styles.img3}/>
//             <View style={{flexDirection:'column',
//               marginLeft:15,
//             }}>
//             <Text style={styles.text3}>
//             University
//             </Text>
//             <Text style={styles.text4}>
//               Dayananda Sagar University
//             </Text>
//             </View>
//           </View>
//           <View style={{flexDirection:'row',
//           }}>
//             <Image source={require('../../assets/img/profession.png')} style={styles.img3}/>
//             <View style={{flexDirection:'column',
//               marginLeft:15,
//             }}>
//             <Text style={styles.text3}>
//             Profession
//             </Text>
//             <Text style={styles.text4}>
//               B Tech
//             </Text>
//             </View>
//           </View>
//         </View>
//         </LinearGradient>
//   );
// };
// const styles = StyleSheet.create({
//     gradient: {
//       flex: 1, // Full screen gradient
//       // justifyContent: 'center',
//       // alignItems: 'center',
//     },
//     img:{
//     height:70,
//     width:200,
//     // marginTop:30,
//     },
//     img1:{
//       height:70,
//       width:50,
//       // marginTop:30,
//       },
//       img2:{
//         height:120,
//         width:120,
//       },
//       img3:{
//         height:50,
//         width:50,
//       },
//       container:{
//         flexDirection:'row',
//         justifyContent: 'space-between',
//         marginLeft:15,
//         marginTop:20,
//         marginRight:10,
//         // alignItems: 'center',
//         // justifyContent:'space-around',
//       },
//       container1:{
//         flexDirection:'column',
//         justifyContent:'space-between',marginTop:30,
//         gap:20,
//         marginLeft:15,
//       },

//       text1:{
//         fontSize:30,
//         fontWeight:'bold',
//         marginLeft:10,
//       },
//       text2:{
//         fontSize:20,
//         fontWeight:'light',
//       },
//       text3:{
//         fontSize:19,
//         fontWeight:'bold',
//         // marginTop:15,
//         // marginLeft:10,
//       },
//       text4:{
//         fontSize:19,
//         fontWeight:'light',
//         // marginTop:15,
//         // marginLeft:10,
//       },
// });
// export default Dashboard;





import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const Dashboard = () => {
  const navigation = useNavigation();
  // Animation state
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
  // const translateY = slideAnimation.interpolate({
  //   inputRange: [0, 1],
  //   outputRange: [0, -100], // Adjust this value based on how much you want it to slide up
  // });

  return (
    <LinearGradient
      colors={['#E6E6FA', '#43328B']}
      locations={[0.01, 1]}
      style={styles.gradient}
    >
      <View style={styles.container}>
        <Image source={require('../../assets/img/dashboardFirstPic.png')}
        style={styles.img}/>
        <Image source={require('../../assets/img/notifications.png')}
        style={styles.img1}/>
      </View>
      <View style={styles.container}>
        <View style={{marginTop:30}}>
          <Text style={styles.text1}>
            Hi Sam
          </Text>
          <Text style={styles.text2}>
            Good Morning!
          </Text>
        </View>
        <Image source={require('../../assets/img/dashboardProfilePic.png')}
          style={styles.img2}/>
      </View>
      <View style={styles.container1}>
        <View style={{flexDirection:'row'}}>
          <Image source={require('../../assets/img/university.png')} style={styles.img3}/>
          <View style={{flexDirection:'column', marginLeft:15}}>
            <Text style={styles.text3}>
              University
            </Text>
            <Text style={styles.text4}>
              Dayananda Sagar University
            </Text>
          </View>
        </View>
        <View style={{flexDirection:'row'}}>
          <Image source={require('../../assets/img/profession.png')} style={styles.img3}/>
          <View style={{flexDirection:'column', marginLeft:15}}>
            <Text style={styles.text3}>
              Profession
            </Text>
            <Text style={styles.text4}>
              B Tech
            </Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
      onPress={() => navigation.navigate('PassActivityPage')}>
      <View style={styles.pass}>
    <Text style={styles.passtext}>Apply Pass</Text>
      </View>
      </TouchableOpacity>

      {/* Animated panels */}
      {/* <Animated.View
        style={[
          styles.expandablePanel,
          { transform: [{ translateY }] },
        ]}
      > */}
        {/* <View style={styles.panelContent}>
          <TouchableOpacity
            style={styles.cardButton}
            onPress={() => navigateTo('HostelCard')}
          >
            <Image
              source={require('../../assets/img/profession.png')}
              style={styles.cardIcon}
            />
            <Text style={styles.cardText}>Hostel Card</Text>
          </TouchableOpacity>
        </View> */}
      {/* </Animated.View> */}

      {/* Bottom Navigation Bar */}
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
          <Image
            source={require('../../assets/img/complaintBOTTOMicon.png')}
            style={styles.navIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.homeButton}
          // onPress={toggleExpanded}
        >
          <LinearGradient
            colors={['#C71585', '#43328B']}
            style={styles.homeButtonGradient}
            borderRadius={30}
          >
            <Image
              source={require('../../assets/img/homeBOTTOMicon.png')}
              style={styles.homeIcon}
            />
          </LinearGradient>
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
  passtext:{
    fontSize:25,
    fontWeight:'bold',
    color:'white',
    textAlign:'center',
    marginTop:20,
  },
  pass:{
    height:80,
    width:300,
    backgroundColor:'#43328B',
    alignSelf:'center',
    marginTop:45,
    // paddingLeft:46,
    // paddingTop:20,
    borderRadius:20,
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
    height: 28,
    width: 28,
  },
  homeButton: {
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 35,
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

export default Dashboard;
