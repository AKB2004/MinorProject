import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const PassActivityPage = () => {
  const navigation = useNavigation();

  const [visitReason, setVisitReason] = useState('');
  const [emergencyContact, setEmergencyContact] = useState('');
  const [leaveTime, setLeaveTime] = useState('');
  const [returnTime, setReturnTime] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!visitReason || !emergencyContact || !leaveTime || !returnTime || !email) {
      return Alert.alert('Missing Fields', 'Please fill all fields.');
    }

    const baseURL = 'http://10.0.2.2:8080';
    const apiURL = `${baseURL}/api/resident/gatepass?residentEmail=${encodeURIComponent(email)}`;

    const payload = {
      visitReason,
      emergencyContact,
      leaveTime,
      returnTime,
    };

    try {
      setIsSubmitting(true);
      const res = await axios.post(apiURL, payload);
      Alert.alert('Success', res.data, [
        { text: 'OK', onPress: () => navigation.navigate('Dashboard') },
      ]);

      // Reset form
      setVisitReason('');
      setEmergencyContact('');
      setLeaveTime('');
      setReturnTime('');
      setEmail('');
    } catch (error) {
      console.error('API Error full:', error);
      if (error.response) {
        const { status, data } = error.response;
        Alert.alert(`Error ${status}`, JSON.stringify(data));
      } else {
        Alert.alert('Error', error.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <LinearGradient colors={['#E6E6FA', '#43328B']} style={styles.gradient}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Image at the top */}
        <View style={styles.headerImageContainer}>
          <Image
            source={require('../../assets/img/dashboardFirstPic.png')}
            style={styles.headerImage}
          />
        </View>

        {/* Title */}
        <Text style={styles.header}>Pass Approval</Text>

        {/* Form Fields */}
        <TextInput
          placeholder="Visit Reason"
          style={styles.input}
          value={visitReason}
          onChangeText={setVisitReason}
          placeholderTextColor="#ced4da"
        />
        <TextInput
          placeholder="Emergency Contact"
          style={styles.input}
          value={emergencyContact}
          onChangeText={setEmergencyContact}
          keyboardType="phone-pad"
          placeholderTextColor="#ced4da"
        />
        <TextInput
          placeholder="Leave Date (YYYY-MM-DD)"
          style={styles.input}
          value={leaveTime}
          onChangeText={setLeaveTime}
          placeholderTextColor="#ced4da"
        />
        <TextInput
          placeholder="Return Date (YYYY-MM-DD)"
          style={styles.input}
          value={returnTime}
          onChangeText={setReturnTime}
          placeholderTextColor="#ced4da"
        />
        <TextInput
          placeholder="Your Registered Email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          placeholderTextColor="#ced4da"
        />

        {/* Submit Button */}
        <TouchableOpacity
          style={[styles.button, isSubmitting && { backgroundColor: '#888' }]}
          onPress={handleSubmit}
          disabled={isSubmitting}
        >
          <Text style={styles.buttonText}>
            {isSubmitting ? 'Sending...' : 'Submit'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
};

export default PassActivityPage;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  headerImageContainer: {
    // alignItems: 'center',
    marginTop: 5,
    marginBottom: 10,
    marginLeft:-10,
  },
  headerImage: {
    height: 70,
    width: 200,
    resizeMode: 'contain',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1c1c1c',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    color: '#000',
  },
  button: {
    backgroundColor: '#43328B',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});











// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert,Image } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import { useNavigation } from '@react-navigation/native';
// import axios from 'axios';

// const PassActivityPage = () => {
//   const navigation = useNavigation();

//   const [visitReason, setVisitReason] = useState('');
//   const [emergencyContact, setEmergencyContact] = useState('');
//   const [leaveTime, setLeaveTime] = useState('');
//   const [returnTime, setReturnTime] = useState('');
//   const [email, setEmail] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleSubmit = async () => {
//     if (!visitReason || !emergencyContact || !leaveTime || !returnTime || !email) {
//       return Alert.alert('Missing Fields', 'Please fill all fields.');
//     }

//     const baseURL = 'http://10.0.2.2:8080';
//     const apiURL = `${baseURL}/api/resident/gatepass?residentEmail=${encodeURIComponent(email)}`;

//     const payload = {
//   visitReason,           // e.g. "Test visit"
//   emergencyContact,      // e.g. "9998887776"
//   leaveTime,             // MUST be "2025-06-01"
//   returnTime,            // MUST be "2025-06-02"
// };

// // …later…
// await axios.post(apiURL, payload);


//     try {
//       setIsSubmitting(true);
//       const res = await axios.post(apiURL, payload);
//       Alert.alert('Success', res.data, [
//         { text: 'OK', onPress: () => navigation.navigate('Dashboard') },
//       ]);
//       // Reset form
//       setVisitReason('');
//       setEmergencyContact('');
//       setLeaveTime('');
//       setReturnTime('');
//       setEmail('');
//     } catch (error) {
//       console.error('API Error full:', error);
//       console.error('Response data:', error.response?.data);
//       if (error.response) {
//         const { status, data } = error.response;
//         Alert.alert(`Error ${status}`, JSON.stringify(data));
//       } else {
//         Alert.alert('Error', error.message);
//       }
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <LinearGradient colors={['#E6E6FA', '#43328B']} style={styles.gradient}>
//       <View style={styles.container4}>
//                   <Image source={require('../../assets/img/dashboardFirstPic.png')} style={styles.img4} />
//                   </View>
//       <Text style={styles.header}>Pass Approval</Text>
//       <TextInput
//         placeholder="Visit Reason"
//         style={styles.input}
//         value={visitReason}
//         onChangeText={setVisitReason}
//       />
//       <TextInput
//         placeholder="Emergency Contact"
//         style={styles.input}
//         value={emergencyContact}
//         onChangeText={setEmergencyContact}
//         keyboardType="phone-pad"
//       />
//       <TextInput
//         placeholder="Leave Date (YYYY-MM-DD)"
//         style={styles.input}
//         value={leaveTime}
//         onChangeText={setLeaveTime}
//       />
//       <TextInput
//         placeholder="Return Date (YYYY-MM-DD)"
//         style={styles.input}
//         value={returnTime}
//         onChangeText={setReturnTime}
//       />
//       <TextInput
//         placeholder="Your Registered Email"
//         style={styles.input}
//         value={email}
//         onChangeText={setEmail}
//         keyboardType="email-address"
//       />

//       <TouchableOpacity
//         style={[styles.button, isSubmitting && { backgroundColor: '#888' }]}
//         onPress={handleSubmit}
//         disabled={isSubmitting}
//       >
//         <Text style={styles.buttonText}>
//           {isSubmitting ? 'Sending...' : 'Submit'}
//         </Text>
//       </TouchableOpacity>
//     </LinearGradient>
//   );
// };
// export default PassActivityPage;


// const styles = StyleSheet.create({
//   gradient: {
//     flex: 1,
//     padding: 20,
//     justifyContent: 'center',
//   },
//   header: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: '#1c1c1c',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   input: {
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 12,
//     marginBottom: 15,
//     fontSize: 16,
//     color: '#000',
//   },
//   button: {
//     backgroundColor: '#43328B',
//     padding: 14,
//     borderRadius: 10,
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   img4: {
//     height: 70,
//     width: 200,
//   },
//   container4: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginHorizontal: 10,
//     marginTop: 20,
//   },

// });

