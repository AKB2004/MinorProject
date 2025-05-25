
import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import useStompClient from '../hooks/useStompClient';

const WS_URL = 'http://10.0.2.2:8080/ws';

const WardenMessage = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const onIncoming = useCallback(msg => {
    setMessages(prev => [...prev, msg]);
  }, []);

  const { sendMessage, connected } = useStompClient(WS_URL, onIncoming);

  const handleSend = () => {
    if (!message.trim()) return;
    const payload = { sender: 'Warden', content: message };
    setMessages(prev => [...prev, payload]);
    console.log('[STOMP] → Sending', payload);
    sendMessage(payload);
    setMessage('');
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.statusBar}>
        <Text style={{ color: connected ? 'limegreen' : 'crimson' }}>
          {connected ? 'Connected 🟢' : 'Disconnected 🔴'}
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {messages.map((msg, i) => (
          <View
            key={i}
            style={[styles.bubble, msg.sender === 'Warden' ? styles.right : styles.left]}
          >
            <Text>{msg.content}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Type a message"
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity onPress={handleSend} style={[styles.sendBtn, !connected && {opacity: 0.5}]} disabled={!connected}>
          <Text>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: { flex: 1, padding: 16 },
  statusBar: { padding: 8, alignItems: 'center' },
  scroll: { paddingBottom: 60 },
  bubble: { maxWidth: '70%', padding: 10, marginVertical: 4, borderRadius: 10 },
  left: { alignSelf: 'flex-start', backgroundColor: '#f1f0f0' },
  right: { alignSelf: 'flex-end', backgroundColor: '#dcf8c6' },
  inputRow: { position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', padding: 8, backgroundColor: '#fff' },
  input: { flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 20, paddingHorizontal: 12 },
  sendBtn: { justifyContent: 'center', alignItems: 'center', paddingHorizontal: 16 }
});

export default WardenMessage;
