import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { useChat } from './chat/context/ChatContext';
import { initializeSocket } from './chat/services/socketService';
import ChatHeader from './chat/components/ChatHeader';
import OnlineUsers from './chat/components/OnlineUsers';
import ChatArea from './chat/components/ChatArea';

const ChatBox = () => {
  const { state, dispatch } = useChat();
  const [loading, setLoading] = useState(true);

  // Initialize socket connection
  useEffect(() => {
    
    if (!state.user) {
      const dummyUser = {
        id: 'current_user_' + Date.now(),
        username: 'Current User'
      };
      const dummyToken = 'demo_token_' + Date.now();
      
      dispatch({ type: 'SET_USER', payload: dummyUser });
      dispatch({ type: 'SET_TOKEN', payload: dummyToken });
      sessionStorage.setItem('token', dummyToken);
    }

    if (state.token && state.user && !state.socket) {
      const socket = initializeSocket(state.token, dispatch);
      
      return () => {
        socket.disconnect();
      };
    }
    
    setLoading(false);
  }, [state.token, state.user, state.socket, dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <MessageCircle className="mx-auto h-12 w-12 text-blue-600 animate-spin" />
          <p className="mt-4 text-gray-600">Loading Chat...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      <ChatHeader />
      <div className="flex-1 flex overflow-hidden">
        <OnlineUsers />
        <ChatArea />
      </div>
    </div>
  );
};

export default ChatBox;