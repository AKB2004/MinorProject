import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const MessagingPage = () => {
  const navigation = useNavigation();
  const [slideAnimation] = useState(new Animated.Value(0));
  const [isExpanded, setIsExpanded] = useState(false);

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSend = () => {
    if (message.trim()) {
      setMessages([...messages, message]);
      setMessage('');
    } else {
      Alert.alert('Type something to send!');
    }
  };

  const navigateTo = (screenName) => {
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
    navigation.navigate(screenName);
  };

  return (
    <LinearGradient
      colors={['#E6E6FA', '#43328B']}
      locations={[0.01, 1]}
      style={styles.gradient}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View>
          {messages.map((msg, index) => (
            <View key={index} style={styles.messageBubble}>
              <Text style={styles.messageText}>{msg}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Input Section */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Type a message"
          value={message}
          onChangeText={setMessage}
          style={styles.input}
        />
        <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
          <Image
            source={require('../../assets/img/message.png')} // Ensure this icon exists
            style={{ width: 24, height: 24, tintColor: '#fff' }}
          />
        </TouchableOpacity>
      </View>

      {/* Bottom Navigation */}
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
          onPress={() => navigateTo('Dashboard')}
        >
          <Image
            source={require('../../assets/img/homeBOTTOMicon.png')}
            style={styles.homeIcon}
          />
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
          onPress={() => navigateTo('MessagingPage')}
        >
          <LinearGradient
            colors={['#C71585', '#43328B']}
            style={styles.FeesButton}
            borderRadius={30}
          >
            <Image
              source={require('../../assets/img/message.png')}
              style={styles.navIcon}
            />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  scrollContainer: {
    padding: 10,
    paddingBottom: 70, // space for input
  },
  messageBubble: {
    backgroundColor: '#e0e0e0',
    alignSelf: 'flex-start',
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    maxWidth: '80%',
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    position: 'absolute',
    bottom: 90, // move it above bottom nav
    left: 0,
    right: 0,
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 25,
    fontSize: 16,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  sendButton: {
    backgroundColor: '#0a84ff',
    borderRadius: 25,
    padding: 10,
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
  homeIcon: {
    height: 30,
    width: 30,
    tintColor: '#fff',
  },
  FeesButton: {
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: '#fff',
    borderRadius: 30,
    elevation: 5,
  },
});

export default MessagingPage;





// import { View, Text, StyleSheet, Image, TouchableOpacity, Animated, TextInput, Alert, ScrollView } from 'react-native';
// import React, { useState } from 'react';
// import LinearGradient from 'react-native-linear-gradient';
// import { useNavigation } from '@react-navigation/native';

// const MessagingPage = () => {
//     const navigation = useNavigation();
// const [slideAnimation] = useState(new Animated.Value(0));
//   const [isExpanded, setIsExpanded] = useState(false);
//     const navigateTo = (screenName) => {
//         // Close the panel if it's open
//         if (isExpanded) {
//           Animated.spring(slideAnimation, {
//             toValue: 0,
//             friction: 5,
//             tension: 40,
//             useNativeDriver: true,
//           }).start(() => {
//             setIsExpanded(false);
//           });
//         }
    
//         // Navigate to the screen
//         navigation.navigate(screenName);
//       };
//   return (
//     <LinearGradient colors={['#E6E6FA', '#43328B']} locations={[0.01, 1]} style={styles.gradient}>
//           <ScrollView contentContainerStyle={styles.scrollContainer}>
//     <View>
//       <Text>MessagingPage</Text>

//     </View>
//     </ScrollView>









// <View style={styles.bottomNavContainer}>
//         <TouchableOpacity
//           style={styles.navButton}
//           onPress={() => navigateTo('AttendancePage')}
//         >
//           <Image
//             source={require('../../assets/img/attendanceBOTTOMicon.png')}
//             style={styles.navIcon}
//           />
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.navButton}
//           onPress={() => navigateTo('ComplaintPage')}
//         >
//           <Image
//             source={require('../../assets/img/complaintBOTTOMicon.png')}
//             style={styles.navIcon}
//           />
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.homeButton}
//           onPress={() => navigateTo('Dashboard')}
//           // onPress={toggleExpanded}
//         >
//           {/* <LinearGradient
//             colors={['red', '#43328B']}
//             style={styles.homeButtonGradient}
//             borderRadius={30}
//           > */}
//             <Image
//               source={require('../../assets/img/homeBOTTOMicon.png')}
//               style={styles.homeIcon}
//             />
//           {/* </LinearGradient> */}
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.navButton}
//           onPress={() => navigateTo('MessPage')}
//         >
//           <Image
//             source={require('../../assets/img/messBOTTOMicon.png')}
//             style={styles.navIcon}
//           />
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.navButton}
//           onPress={() => navigateTo('MessagingPage')}
//         >
//           <LinearGradient
//             colors={['#C71585', '#43328B']}
//             style={styles.FeesButton}
//             borderRadius={30}
//           >
//           <Image
//             source={require('../../assets/img/message.png')}
//             style={styles.navIcon}
//           />
//           </LinearGradient>
//         </TouchableOpacity>
//       </View>
//         </LinearGradient>
//       );
//     };
// const styles = StyleSheet.create({
//   gradient: {
//     flex: 1,
//   },
//   texting:{
//     fontSize:33,
//     fontWeight:'bold',
//     marginLeft:20,
//     marginTop:40,
//   },
//   img: {
//     height: 70,
//     width: 200,
//   },
//   img1: {
//     height: 70,
//     width: 50,
//   },
//   img2: {
//     height: 120,
//     width: 120,
//   },
//   img3: {
//     height: 50,
//     width: 50,
//   },
//   paymentimg:{
//     width:200,
//     height:200,
//     alignSelf:'center',
//   },
//   container: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginLeft: 15,
//     marginTop: 20,
//     marginRight: 10,
//   },
//   container1: {
//     flexDirection: 'column',
//     justifyContent: 'space-between',
//     marginTop: 30,
//     gap: 20,
//     marginLeft: 15,
//   },
//   FeesButton: {
//     height: 60, // Increase height for uplift
//     width: 60,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 30, // Lift icon upwards
//     backgroundColor: '#fff',
//     borderRadius: 30,
//     elevation: 5, // Shadow for a floating effect
// },
//   text1: {
//     fontSize: 30,
//     fontWeight: 'bold',
//     marginLeft: 10,
//   },
//   text2: {
//     fontSize: 20,
//     fontWeight: 'light',
//   },
//   text3: {
//     fontSize: 19,
//     fontWeight: 'bold',
//   },
//   text4: {
//     fontSize: 19,
//     fontWeight: 'light',
//   },

//   // Bottom Navigation Styles
//   bottomNavContainer: {
//     position: 'absolute',
//     bottom: 10,
//     left: 0,
//     right: 0,
//     height: 90,
//     backgroundColor: '#43328B',
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     alignItems: 'center',
//     paddingHorizontal: 8,
//     // borderTopLeftRadius: 15,
//     // borderTopRightRadius: 15,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: -2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//     elevation: 5,
//   },
//   navButton: {
//     height: 50,
//     width: 50,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   navIcon: {
//     height: 28,
//     width: 28,
//   },
//   homeButton: {
//     height: 60,
//     width: 60,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 5,
//   },
//   homeButtonGradient: {
//     height: 60,
//     width: 60,
//     borderRadius: 30,

//     justifyContent: 'center',
//     alignItems: 'center',
//     elevation: 5,
//   },
//   homeIcon: {
//     height: 30,
//     width: 30,
//     tintColor: '#fff',
//     // marginBottom:35,
//   },
//   // Expandable Panel Styles
//   expandablePanel: {
//     position: 'absolute',
//     bottom: 70,
//     left: 0,
//     right: 0,
//     backgroundColor: 'transparent',
//     zIndex: 999,
//   },
//   // panelContent: {
//   //   backgroundColor: '#fff',
//   //   borderRadius: 20,
//   //   marginHorizontal: 20,
//   //   padding: 15,
//   //   shadowColor: '#000',
//   //   shadowOffset: { width: 0, height: 2 },
//   //   shadowOpacity: 0.1,
//   //   shadowRadius: 4,
//   //   elevation: 3,
//   // },
//   // cardButton: {
//   //   flexDirection: 'row',
//   //   alignItems: 'center',
//   //   backgroundColor: '#f0f0f0',
//   //   padding: 12,
//   //   borderRadius: 10,
//   // },
//   // cardIcon: {
//   //   width: 24,
//   //   height: 24,
//   //   marginRight: 10,
//   // },
//   // cardText: {
//   //   fontSize: 16,
//   //   color: '#43328B',
//   //   fontWeight: '500',
//   // },
//    container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   scrollContainer: {
//     padding: 10,
//     paddingBottom: 70, // space for input
//   },
//   messageBubble: {
//     backgroundColor: '#e0e0e0',
//     alignSelf: 'flex-start',
//     padding: 10,
//     marginVertical: 5,
//     borderRadius: 10,
//     maxWidth: '80%',
//   },
//   messageText: {
//     fontSize: 16,
//   },
//   inputContainer: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     flexDirection: 'row',
//     padding: 10,
//     backgroundColor: '#f2f2f2',
//     alignItems: 'center',
//     borderTopWidth: 1,
//     borderColor: '#ddd',
//   },
//   input: {
//     flex: 1,
//     backgroundColor: '#fff',
//     paddingHorizontal: 15,
//     paddingVertical: 10,
//     borderRadius: 25,
//     fontSize: 16,
//     marginRight: 10,
//     borderWidth: 1,
//     borderColor: '#ccc',
//   },
//   sendButton: {
//     backgroundColor: '#0a84ff',
//     borderRadius: 25,
//     padding: 10,
//   },
// });
// });

// export default MessagingPage;
