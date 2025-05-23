/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const WardenDashboard = () => {
  const navigation = useNavigation();
  const [slideAnimation] = useState(new Animated.Value(0));
  const [isExpanded, setIsExpanded] = useState(false);
  const [unreadMessages, setUnreadMessages] = useState(5);
const [pendingPassRequests, setPendingPassRequests] = useState(2);
const [slotUpdates, setSlotUpdates] = useState(3);
const [unmarkedAttendance, setUnmarkedAttendance] = useState(1);
const [newComplaints, setNewComplaints] = useState(4);


  const navigateTo = (screenName) => {
    if (isExpanded) {
      Animated.spring(slideAnimation, {
        toValue: 0,
        friction: 5,
        tension: 40,
        useNativeDriver: true,
      }).start(() => setIsExpanded(false));
    }
    navigation.navigate(screenName);
  };

  return (
    <LinearGradient
      colors={['#E6E6FA', '#43328B']}
      locations={[0.01, 1]}
      style={styles.gradient}
    >
      {/* Top icons */}
      <View style={styles.rowSpace}>
        <Image source={require('../../assets/img/dashboardFirstPic.png')} style={styles.img} />
        
      </View>

      {/* Greeting */}
      <View style={styles.rowSpace}>
        <View style={styles.greeting}>
          <Text style={styles.greetingHi}>Hi </Text>
          <Text style={styles.greetingSub}>Good Morning!</Text>
        </View>
        
      </View>

      {/* University & Profession */}
      <View style={styles.infoBlock}>
        <View style={styles.infoRow}>
          <Image source={require('../../assets/img/university.png')} style={styles.infoIcon} />
          <View style={styles.infoText}>
            <Text style={styles.infoTitle}>Institution</Text>
            <Text style={styles.infoSub}>ABU Institution</Text>
          </View>
        </View>
        <View style={styles.infoRow}>
          <Image source={require('../../assets/img/profession.png')} style={styles.infoIcon} />
          <View style={styles.infoText}>
            <Text style={styles.infoTitle}>Profession</Text>
            <Text style={styles.infoSub}>Warden/Manager</Text>
          </View>
        </View>
      </View>

      {/* Action buttons */}
      
        <TouchableOpacity onPress={() => navigateTo('WardenPass')} style={{ position: 'relative' }}>
  <View style={styles.actionBtn}>
    <Text style={styles.actionText}>Pass Management</Text>
    {pendingPassRequests > 0 && (
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{pendingPassRequests}</Text>
      </View>
    )}
  </View>
</TouchableOpacity>

<TouchableOpacity onPress={() => navigateTo('WardenSlot')} style={{ position: 'relative' }}>
  <View style={styles.actionBtn}>
    <Text style={styles.actionText}>Slot Management</Text>
    {slotUpdates > 0 && (
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{slotUpdates}</Text>
      </View>
    )}
  </View>
</TouchableOpacity>

<TouchableOpacity onPress={() => navigateTo('WardenAttendance')} style={{ position: 'relative' }}>
  <View style={styles.actionBtn}>
    <Text style={styles.actionText}>Attendance Management</Text>
    {unmarkedAttendance > 0 && (
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{unmarkedAttendance}</Text>
      </View>
    )}
  </View>
</TouchableOpacity>

<TouchableOpacity onPress={() => navigateTo('WardenComplain')} style={{ position: 'relative' }}>
  <View style={styles.actionBtn}>
    <Text style={styles.actionText}>Complain Management</Text>
    {newComplaints > 0 && (
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{newComplaints}</Text>
      </View>
    )}
  </View>
</TouchableOpacity>

<TouchableOpacity onPress={() => navigateTo('WardenMessage')} style={{ position: 'relative' }}>
  <View style={styles.actionBtn}>
    <Text style={styles.actionText}>Messages</Text>
    {unreadMessages > 0 && (
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{unreadMessages}</Text>
      </View>
    )}
  </View>
</TouchableOpacity>


    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  rowSpace: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    marginTop: 20,
  },
  img: {
    width: 200,
    height: 70,
  },
  imgSmall: {
    width: 50,
    height: 70,
  },
  greeting: {
    marginLeft:10,
    marginBottom:8,
    // marginTop: 30,
  },
  greetingHi: {
    fontSize: 20,
  },
  greetingSub: {
    fontSize: 14,
    fontWeight: '300',
  },
  profileImg: {
    width: 120,
    height: 120,
  },
  infoBlock: {
    // marginTop: 30,
    marginHorizontal: 15,
    gap: 0,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoIcon: {
    width: 50,
    height: 50,
  },
  infoText: {
    marginLeft: 15,
    marginBottom:10,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoSub: {
    fontSize: 14,
    fontWeight: '300',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 45,
  },
  actionBtn: {
    backgroundColor: '#43328B',
    borderRadius: 10,
    width:250,
    paddingTop:15,
    paddingBottom:15,
    marginBottom:15,
    // paddingLeft:0,
    marginLeft:50,
    marginTop:15,

    // paddingHorizontal: 20,
    // paddingVertical: 15,
  },
  actionText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
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
    elevation: 5,
  },
  navButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navIcon: {
    width: 28,
    height: 28,
  },
  homeButton: {
    width: 60,
    height: 60,
    marginBottom: 35,
  },
  homeButtonGradient: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  homeIcon: {
    width: 30,
    height: 30,
    tintColor: '#fff',
  },
  badge: {
  position: 'absolute',
  top: -10,
  right: 10,
  backgroundColor: 'red',
  borderRadius: 12,
  paddingHorizontal: 6,
  paddingVertical: 3,
  minWidth: 24,
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1,
},
badgeText: {
  color: 'white',
  fontWeight: 'bold',
  fontSize: 12,
  textAlign: 'center',
},

});

export default WardenDashboard;
