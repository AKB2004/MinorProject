/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated } from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { Colors } from 'react-native/Libraries/NewAppScreen';



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
<View style={styles.container4}>
      <Image source={require('../../assets/img/dashboardFirstPic.png')} style={styles.img4} />
      </View>


      <View>
        <Text style={styles.texting}>Today's Menu</Text>
        <Image
        source={require('../../assets/img/messpic.png')}
        style={styles.messpageimg}/>
        <View >
        <View style={styles.horizontalView}>
        <View style={styles.messtexting}>
        <Text style={{fontSize:20,fontWeight:'bold'  }}>Breakfast</Text>
        <Text>Aaloo Paratha, Sandwich, Chai and Milk, Dahi</Text>
        </View>
        <View style={styles.messtexting1}>
        <Text style={{fontSize:20, textAlign:'right',fontWeight:'bold' }}>Timings</Text>
        <Text style={{textAlign:'right'}}>8:00A.M - 9:00A.M</Text>
        </View>
        </View>
        <View style={styles.horizontalView}>
        <View style={styles.messtexting}>
        <Text style={{fontSize:20,fontWeight:'bold'  }}>Lunch</Text>
        <Text>Rajama curry, Roti, Raiyta, Rice and salad</Text>
        </View>
        <View style={styles.messtexting1}>
        {/* <Text style={{fontSize:20,textAlign:'right',fontWeight:'bold' }}>Timings</Text> */}
        <Text style={{textAlign:'right',paddingTop:30}}>8:00A.M - 9:00A.M</Text>
        </View>
        </View>
        
        <View style={styles.horizontalView}>
        <View style={styles.messtexting}>
        <Text style={{fontSize:20, fontWeight:'bold' }}>Dinner</Text>
        <Text>Dal, Mix veg, Halwa, Rice and salad</Text>
        </View>
        <View style={styles.messtexting1}>
        {/* <Text style={{fontSize:20,textAlign:'right',fontWeight:'bold' }}>Timings</Text> */}
        <Text style={{textAlign:'right',paddingTop:30}}>8:00A.M - 9:00A.M</Text>
        </View>
        </View>  
        </View>
      </View>

<View style={styles.bottomNavContainer}>
        {/* <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigateTo('AttendancePage')}
        >
          <Image
            source={require('../../assets/img/attendanceBOTTOMicon.png')}
            style={styles.navIcon}
          />
        </TouchableOpacity> */}
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
          <LinearGradient
            colors={['#C71585', '#43328B']}
            style={styles.MessButton}
            borderRadius={30}
          >
          <Image
            source={require('../../assets/img/messBOTTOMicon.png')}
            style={styles.navIcon}
          />
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigateTo('MessagingPage')}
        >
          <Image
            source={require('../../assets/img/message.png')}
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
  messtexting:{
    // backgroundColor:'#fff',
    width:130,
    height:80,
    fontFamily: 'monospace',
  },
  messtexting1:{
    // backgroundColor:'#fff',
    width:130,
    height:80,
    fontFamily: 'monospace',
  },
  horizontalView:{
    flex:1,
    flexDirection:'row',
    justifyContent:'center',
    marginBottom:100,
    // flexWrap:'wrap',
  },
  texting:{
    fontSize:22,
    // marginTop:30,
    marginLeft:20,
    fontWeight:'bold',
    // fontFamily: 'monospace',
  },
  messpageimg:{
    width:200,
    height:150,
    alignSelf:'center',
    marginTop:30,
    marginBottom:40,
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
  img4: {
    height: 70,
    width: 200,
  },
  container4: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginTop: 20,
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
  MessButton: {
    height: 60, // Increase height for uplift
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30, // Lift icon upwards
    backgroundColor: '#fff',
    borderRadius: 30,
    elevation: 5, // Shadow for a floating effect
},
  text1: {
    fontSize: 30,
    fontWeight: 'bold',
    marginLeft: 10,
    // fontFamily: 'monospace',
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
    bottom: 0,
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
