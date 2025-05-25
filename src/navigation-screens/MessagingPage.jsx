import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import useStompClient from '../hooks/useStompClient';

// 🔥 Replace with your machine’s LAN IP or emulator loopback
const WS_URL = 'http://10.0.2.2:8080/ws'; // adjust as needed

const MessagingPage = () => {
  const navigation = useNavigation();
  const navigateTo = screenName => navigation.navigate(screenName);

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  // Stable callback to avoid reconnect loops
  const onIncoming = useCallback(msg => {
    setMessages(prev => [...prev, msg]);
  }, []);

  const { sendMessage, connected } = useStompClient(WS_URL, onIncoming);

  const handleSend = () => {
    if (!message.trim()) {
      Alert.alert('Type something to send!');
      return;
    }
    const payload = { sender: 'Hosteller', content: message };
    // local echo
    setMessages(prev => [...prev, payload]);
    console.log('[STOMP] → Sending', payload);
    sendMessage(payload);
    setMessage('');
  };

  return (
    <LinearGradient
      colors={['#E6E6FA', '#43328B']}
      locations={[0.01, 1]}
      style={styles.gradient}
    >
      <View style={styles.statusBar}>
        <Text style={{ color: connected ? 'limegreen' : 'crimson' }}>
          {connected ? 'Connected 🟢' : 'Disconnected 🔴'}
        </Text>
      </View>

      <View style={styles.container}>
        <Image
          source={require('../../assets/img/dashboardFirstPic.png')}
          style={styles.img}
        />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {messages.map((msg, i) => (
          <View
            key={i}
            style={[
              styles.messageBubble,
              msg.sender === 'Hosteller' ? styles.rightBubble : styles.leftBubble
            ]}
          >
            <Text style={styles.messageText}>{msg.content}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Type a message"
          value={message}
          onChangeText={setMessage}
          style={styles.input}
        />
        <TouchableOpacity
          onPress={handleSend}
          disabled={!connected}
          style={[styles.sendButton, !connected && { opacity: 0.5 }]}
        >
          <Image
            source={require('../../assets/img/send-data.png')}
            style={{ width: 24, height: 24 }}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.bottomNavContainer}>
        {/* ... existing nav buttons ... */}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  statusBar: { padding: 8, alignItems: 'center' },
  img: { height: 70, width: 200 },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginTop: 20
  },
  scrollContainer: { padding: 10, paddingBottom: 70 },
  messageBubble: { padding: 10, marginVertical: 5, borderRadius: 10, maxWidth: '80%' },
  leftBubble: { alignSelf: 'flex-start', backgroundColor: '#e0e0e0' },
  rightBubble: { alignSelf: 'flex-end', backgroundColor: '#dcf8c6' },
  messageText: { fontSize: 16 },
  inputContainer: {
    position: 'absolute', bottom: 92, left: 0, right: 0,
    flexDirection: 'row', padding: 10, backgroundColor: '#f2f2f2',
    alignItems: 'center', borderTopWidth: 1, borderColor: '#ddd'
  },
  input: {
    flex: 1, backgroundColor: '#fff', paddingHorizontal: 15,
    paddingVertical: 10, borderRadius: 25, fontSize: 16,
    marginHorizontal: 5, borderWidth: 1, borderColor: '#ccc'
  },
  sendButton: { borderRadius: 25, padding: 5 },
  bottomNavContainer: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    height: 90, backgroundColor: '#43328B', flexDirection: 'row',
    justifyContent: 'space-around', alignItems: 'center',
    paddingHorizontal: 8, shadowColor: '#000', shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1, shadowRadius: 3, elevation: 5
  }
});

export default MessagingPage;
