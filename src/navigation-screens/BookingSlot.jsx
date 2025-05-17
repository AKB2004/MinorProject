import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';


// Change this to "http://10.0.2.2:8080/api" if using an Android emulator
const API_BASE = "http://localhost:8080/api";

const SLOT_LABELS = {
  MORNING: "Morning",
  AFTERNOON: "Afternoon",
  EVENING: "Evening",
};

function getTomorrow() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10);
}

export default function BookingSlot() {
  const [date, setDate] = useState(getTomorrow());
  const [room, setRoom] = useState("");
  const [slot, setSlot] = useState("");
  const [availability, setAvailability] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch slot availability when date changes
  useEffect(() => {
    if (date) {
      axios
        .get(`${API_BASE}/slots/availability`, { params: { date } })
        .then(res => setAvailability(res.data))
        .catch(() => setAvailability(null));
    }
  }, [date]);

  // Fetch bookings for this room/date
  useEffect(() => {
    if (date && room) {
      axios
        .get(`${API_BASE}/bookings`, { params: { date, room } })
        .then(res => setBookings(res.data))
        .catch(() => setBookings([]));
    } else {
      setBookings([]);
    }
  }, [date, room, message]);

  // Handle booking submission
  const handleBook = async () => {
    setMessage("");
    setLoading(true);
    try {
      await axios.post(`${API_BASE}/bookings`, { date, slot, room });
      setMessage("Booking successful!");
      setSlot("");
    } catch (err) {
      setMessage(
        err.response?.data?.error ||
          "Booking failed. Please check your input or slot availability."
      );
    }
    setLoading(false);
  };

  // Handle confirm cleaned
  const handleConfirmClean = async (id) => {
    setMessage("");
    setLoading(true);
    try {
      await axios.post(`${API_BASE}/bookings/${id}/confirm-clean`);
      setMessage("Marked as cleaned!");
    } catch (err) {
      setMessage("Failed to confirm cleaning.");
    }
    setLoading(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Room Cleaning Slot Booking</Text>
        <View style={styles.field}>
          <Text style={styles.label}>Date (must be at least tomorrow):</Text>
          <TextInput
            style={styles.input}
            value={date}
            onChangeText={setDate}
            placeholder="YYYY-MM-DD"
          />
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Room Number:</Text>
          <TextInput
            style={styles.input}
            value={room}
            onChangeText={setRoom}
            placeholder="Enter room number"
          />
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Select Slot:</Text>
          <View style={styles.slotContainer}>
            {availability &&
              Object.entries({
                MORNING: availability.morningSlots,
                AFTERNOON: availability.afternoonSlots,
                EVENING: availability.eveningSlots,
              }).map(([key, count]) => (
                <TouchableOpacity
                  key={key}
                  style={[
                    styles.slot,
                    slot === key
                      ? styles.slotSelected
                      : count > 0
                      ? styles.slotAvailable
                      : styles.slotUnavailable,
                  ]}
                  disabled={count === 0 || loading}
                  onPress={() => setSlot(key)}
                >
                  <Text style={slot === key ? styles.slotTextSelected : styles.slotText}>
                    {SLOT_LABELS[key]}
                  </Text>
                  <Text style={styles.slotCount}>{count} left</Text>
                </TouchableOpacity>
              ))}
          </View>
        </View>
        <TouchableOpacity
          style={[styles.button, (!date || !room || !slot || loading) && styles.buttonDisabled]}
          onPress={handleBook}
          disabled={!date || !room || !slot || loading}
        >
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Book Slot</Text>}
        </TouchableOpacity>
        {message ? <Text style={styles.message}>{message}</Text> : null}
      </View>

      <View style={styles.card}>
        <Text style={styles.subtitle}>Your Bookings</Text>
        {bookings.length === 0 ? (
          <Text style={styles.noBooking}>No bookings for this room and date.</Text>
        ) : (
          bookings.map(b => (
            <View key={b.id} style={styles.bookingItem}>
              <Text style={styles.bookingText}>
                {SLOT_LABELS[b.slot]} {b.cleaned ? '(Cleaned)' : '(Pending)'}
              </Text>
              {!b.cleaned && (
                <TouchableOpacity
                  onPress={() => handleConfirmClean(b.id)}
                  style={styles.cleanButton}
                  disabled={loading}
                >
                  <Text style={styles.cleanButtonText}>Confirm Cleaned</Text>
                </TouchableOpacity>
              )}
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  card: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginVertical: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 12 },
  subtitle: { fontSize: 20, fontWeight: '600', marginBottom: 8 },
  field: { marginBottom: 12 },
  label: { fontSize: 16, fontWeight: '500' },
  input: {
    marginTop: 4,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  slotContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  slot: {
    flex: 1,
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  slotAvailable: { backgroundColor: '#e0f7e9' },
  slotSelected: { backgroundColor: '#007bff' },
  slotUnavailable: { backgroundColor: '#e0e0e0' },
  slotText: { fontSize: 14, color: '#333' },
  slotTextSelected: { fontSize: 14, color: '#fff' },
  slotCount: { fontSize: 12, marginTop: 4 },
  button: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonDisabled: { opacity: 0.6 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  message: { marginTop: 12, fontSize: 14, color: '#007bff', textAlign: 'center' },
  noBooking: { color: '#777', fontSize: 14 },
  bookingItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8 },
  bookingText: { fontSize: 16, fontWeight: '500' },
  cleanButton: { backgroundColor: '#28a745', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 4 },
  cleanButtonText: { color: '#fff', fontSize: 14 },
});




//this is vivek code with backend intergration


// import React, { useState, useEffect } from "react";
// import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
// import axios from 'axios';


// // Change this to "http://10.0.2.2:8080/api" if using an Android emulator
// const API_BASE = "http://10.0.2.2:8080/api";

// const SLOT_LABELS = {
//   MORNING: "Morning",
//   AFTERNOON: "Afternoon",
//   EVENING: "Evening",
// };

// function getTomorrow() {
//   const d = new Date();
//   d.setDate(d.getDate() + 1);
//   return d.toISOString().slice(0, 10);
// }

// export default function BookingSlot() {
//   const [date, setDate] = useState(getTomorrow());
//   const [room, setRoom] = useState("");
//   const [slot, setSlot] = useState("");
//   const [availability, setAvailability] = useState(null);
//   const [bookings, setBookings] = useState([]);
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   // Fetch slot availability when date changes
//   useEffect(() => {
//     if (date) {
//       axios
//         .get(http://10.0.2.2:8080/api/slots/availability, { params: { date } })
//         .then(res => setAvailability(res.data))
//         .catch(() => setAvailability(null));
//     }
//   }, [date]);

//   // Fetch bookings for this room/date
//   useEffect(() => {
//     if (date && room) {
//       axios
//         .get(http://10.0.2.2:8080/api/bookings, { params: { date, room } })
//         .then(res => setBookings(res.data))
//         .catch(() => setBookings([]));
//     } else {
//       setBookings([]);
//     }
//   }, [date, room, message]);

//   // Handle booking submission
//   const handleBook = async () => {
//     setMessage("");
//     setLoading(true);
//     try {
//       await axios.post(http://10.0.2.2:8080/api/bookings, { date, slot, room });
//       setMessage("Booking successful!");
//       setSlot("");
//     } catch (err) {
//       setMessage(
//         err.response?.data?.error ||
//           "Booking failed. Please check your input or slot availability."
//       );
//     }
//     setLoading(false);
//   };

//   // Handle confirm cleaned
//   const handleConfirmClean = async (id) => {
//     setMessage("");
//     setLoading(true);
//     try {
//       await axios.post(http://10.0.2.2:8080/api/bookings/${id}/confirm-clean);
//       setMessage("Marked as cleaned!");
//     } catch (err) {
//       setMessage("Failed to confirm cleaning.");
//     }
//     setLoading(false);
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <View style={styles.card}>
//         <Text style={styles.title}>Room Cleaning Slot Booking</Text>
//         <View style={styles.field}>
//           <Text style={styles.label}>Date (must be at least tomorrow):</Text>
//           <TextInput
//             style={styles.input}
//             value={date}
//             onChangeText={setDate}
//             placeholder="YYYY-MM-DD"
//           />
//         </View>
//         <View style={styles.field}>
//           <Text style={styles.label}>Room Number:</Text>
//           <TextInput
//             style={styles.input}
//             value={room}
//             onChangeText={setRoom}
//             placeholder="Enter room number"
//           />
//         </View>
//         <View style={styles.field}>
//           <Text style={styles.label}>Select Slot:</Text>
//           <View style={styles.slotContainer}>
//             {availability &&
//               Object.entries({
//                 MORNING: availability.morningSlots,
//                 AFTERNOON: availability.afternoonSlots,
//                 EVENING: availability.eveningSlots,
//               }).map(([key, count]) => (
//                 <TouchableOpacity
//                   key={key}
//                   style={[
//                     styles.slot,
//                     slot === key
//                       ? styles.slotSelected
//                       : count > 0
//                       ? styles.slotAvailable
//                       : styles.slotUnavailable,
//                   ]}
//                   disabled={count === 0 || loading}
//                   onPress={() => setSlot(key)}
//                 >
//                   <Text style={slot === key ? styles.slotTextSelected : styles.slotText}>
//                     {SLOT_LABELS[key]}
//                   </Text>
//                   <Text style={styles.slotCount}>{count} left</Text>
//                 </TouchableOpacity>
//               ))}
//           </View>
//         </View>
//         <TouchableOpacity
//           style={[styles.button, (!date || !room || !slot || loading) && styles.buttonDisabled]}
//           onPress={handleBook}
//           disabled={!date || !room || !slot || loading}
//         >
//           {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Book Slot</Text>}
//         </TouchableOpacity>
//         {message ? <Text style={styles.message}>{message}</Text> : null}
//       </View>

//       <View style={styles.card}>
//         <Text style={styles.subtitle}>Your Bookings</Text>
//         {bookings.length === 0 ? (
//           <Text style={styles.noBooking}>No bookings for this room and date.</Text>
//         ) : (
//           bookings.map(b => (
//             <View key={b.id} style={styles.bookingItem}>
//               <Text style={styles.bookingText}>
//                 {SLOT_LABELS[b.slot]} {b.cleaned ? '(Cleaned)' : '(Pending)'}
//               </Text>
//               {!b.cleaned && (
//                 <TouchableOpacity
//                   onPress={() => handleConfirmClean(b.id)}
//                   style={styles.cleanButton}
//                   disabled={loading}
//                 >
//                   <Text style={styles.cleanButtonText}>Confirm Cleaned</Text>
//                 </TouchableOpacity>
//               )}
//             </View>
//           ))
//         )}
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     alignItems: 'center',
//     padding: 16,
//     backgroundColor: '#f0f0f0',
//   },
//   card: {
//     width: '100%',
//     maxWidth: 400,
//     backgroundColor: '#fff',
//     borderRadius: 8,
//     padding: 16,
//     marginVertical: 12,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 6,
//     elevation: 3,
//   },
//   title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 12 },
//   subtitle: { fontSize: 20, fontWeight: '600', marginBottom: 8 },
//   field: { marginBottom: 12 },
//   label: { fontSize: 16, fontWeight: '500' },
//   input: {
//     marginTop: 4,
//     padding: 8,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 4,
//   },
//   slotContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
//   slot: {
//     flex: 1,
//     padding: 12,
//     borderRadius: 4,
//     alignItems: 'center',
//     marginHorizontal: 4,
//   },
//   slotAvailable: { backgroundColor: '#e0f7e9' },
//   slotSelected: { backgroundColor: '#007bff' },
//   slotUnavailable: { backgroundColor: '#e0e0e0' },
//   slotText: { fontSize: 14, color: '#333' },
//   slotTextSelected: { fontSize: 14, color: '#fff' },
//   slotCount: { fontSize: 12, marginTop: 4 },
//   button: {
//     backgroundColor: '#007bff',
//     padding: 12,
//     borderRadius: 4,
//     alignItems: 'center',
//     marginTop: 8,
//   },
//   buttonDisabled: { opacity: 0.6 },
//   buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
//   message: { marginTop: 12, fontSize: 14, color: '#007bff', textAlign: 'center' },
//   noBooking: { color: '#777', fontSize: 14 },
//   bookingItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8 },
//   bookingText: { fontSize: 16, fontWeight: '500' },
//   cleanButton: { backgroundColor: '#28a745', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 4 },
//   cleanButtonText: { color: '#fff', fontSize: 14 },
// });