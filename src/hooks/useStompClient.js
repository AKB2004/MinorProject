import { useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

export default function useStompClient(url, onMessage) {
  const clientRef = useRef(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    console.log('[STOMP] Attempting to connect to:', url);
    
    const stompClient = new Client({
      webSocketFactory: () => {
        console.log('[STOMP] Creating SockJS connection...');
        return new SockJS(url);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      debug: str => console.log('[STOMP DEBUG]', str)
    });

    stompClient.onConnect = (frame) => {
      console.log('[STOMP] ✅ Connected successfully', frame);
      setConnected(true);
      
      // Subscribe to messages
      stompClient.subscribe('/topic/messages', frame => {
        try {
          const body = JSON.parse(frame.body);
          console.log('[STOMP] ← Received message', body);
          onMessage(body);
        } catch (error) {
          console.error('[STOMP] Error parsing message:', error);
        }
      });
    };

    stompClient.onDisconnect = (frame) => {
      console.log('[STOMP] 🔴 Disconnected', frame);
      setConnected(false);
    };

    stompClient.onStompError = (frame) => {
      console.error('[STOMP] ❌ Broker error:', frame.headers['message']);
      console.error('[STOMP] Error details:', frame.body);
      setConnected(false);
    };

    stompClient.onWebSocketError = (error) => {
      console.error('[STOMP] ❌ WebSocket error:', error);
      setConnected(false);
    };

    try {
      stompClient.activate();
      clientRef.current = stompClient;
    } catch (error) {
      console.error('[STOMP] ❌ Failed to activate client:', error);
    }

    return () => {
      if (clientRef.current) {
        console.log('[STOMP] 🔄 Deactivating client...');
        clientRef.current.deactivate();
        setConnected(false);
      }
    };
  }, [url, onMessage]);

  const sendMessage = (payload) => {
    if (!connected || !clientRef.current) {
      console.warn('[STOMP] ⚠️ Cannot send - not connected');
      return false;
    }
    
    try {
      console.log('[STOMP] → Sending message:', payload);
      clientRef.current.publish({
        destination: '/app/sendMessage',
        body: JSON.stringify(payload)
      });
      return true;
    } catch (error) {
      console.error('[STOMP] ❌ Failed to send message:', error);
      return false;
    }
  };

  return { sendMessage, connected };
}