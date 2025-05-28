// WardenAttendance.jsx
import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Platform } from 'react-native';
import axios from 'axios';

const BASE_URL =
  Platform.OS === 'android'
    ? 'http://10.0.2.2:5000'
    : 'http://localhost:5000';

export default function WardenAttendance() {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      console.log('[WARDEN] fetching today at', `${BASE_URL}/api/attendance/today`);
      const res = await axios.get(`${BASE_URL}/api/attendance/today`);
      console.log('[WARDEN] got:', res.data);
      setList(res.data);
    } catch (err) {
      console.warn('[WARDEN] fetch error:', err.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <View style={styles.container}>
      <Button title="Refresh Attendance" onPress={fetchList} />
      <FlatList
        data={list}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <Text style={styles.item}>
            • {item.studentId} @ {new Date(item.timestamp).toLocaleTimeString()}
          </Text>
        )}
        ListEmptyComponent={<Text>No check-ins yet.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  item: { marginVertical: 4 },
});
