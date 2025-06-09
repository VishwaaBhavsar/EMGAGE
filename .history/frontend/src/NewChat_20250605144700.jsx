// import React, { useState, useEffect, useRef } from 'react';
// import io from 'socket.io-client';
// import './NewChat.css';

// const NewChat = () => {
//   const [socket, setSocket] = useState(null);
//   const [currentUser, setCurrentUser] = useState(null);
//   const [contacts, setContacts] = useState([]);
//   const [selectedContact, setSelectedContact] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState('');
//   const [onlineUsers, setOnlineUsers] = useState([]);
//   const [showLogin, setShowLogin] = useState(true);
//   const [username, setUsername] = useState('');
//   const [loading, setLoading] = useState(true);
//   const messagesEndRef = useRef(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   // Check for existing user session on component mount
//   useEffect(() => {
//     const checkExistingUser = async () => {
//       try {
//         const savedUser = localStorage.getItem('chatUser');
//         if (savedUser) {
//           const userData = JSON.parse(savedUser);
//           console.log('Found saved user:', userData);
          
//           // Verify user still exists in database
//           const response = await fetch(`http://localhost:5000/api/user/${userData.userId}`);
//           const result = await response.json();
          
//           if (result.exists) {
//             setCurrentUser(userData);
//             setShowLogin(false);
            
//             // Initialize socket connection
//             const newSocket = io('http://localhost:5000');
//             setSocket(newSocket);
            
//             // Auto-join with saved user data
//             newSocket.emit('user_join', userData);
            
//             setupSocketListeners(newSocket);
//           } else {
//             // User doesn't exist in database anymore, clear localStorage
//             localStorage.removeItem('chatUser');
//           }
//         }
//       } catch (error) {
//         console.error('Error checking existing user:', error);
//         localStorage.removeItem('chatUser');
//       } finally {
//         setLoading(false);
//       }
//     };

//     checkExistingUser();
//   }, []);

//   const setupSocketListeners = (socketInstance) => {
//     // Listen for users update
//     socketInstance.on('users_update', (data) => {
//       console.log('Users update received:', data);
//       setOnlineUsers(data.onlineUsers);
//       setContacts(data.contacts);
//     });

//     // Listen for chat messages when opening a chat
//     socketInstance.on('chat_messages', (chatMessages) => {
//       console.log('Chat messages received:', chatMessages);
//       setMessages(chatMessages);
//     });

//     // Handle errors
//     socketInstance.on('error', (error) => {
//       console.error('Socket error:', error);
//       alert('An error occurred: ' + error.message);
//     });
//   };

//   // Separate useEffect for handling real-time messages
//   useEffect(() => {
//     if (!socket) return;

//     const handleReceiveMessage = (message) => {
//       console.log('Real-time message received:', message);
//       // Only add message if it's for the currently selected chat
//       if (selectedContact && message.senderId === selectedContact.id) {
//         setMessages(prev => [...prev, message]);
//       }
//     };

//     const handleMessageSent = (message) => {
//       console.log('Message sent confirmation received:', message);
//       // Only add if it's for the current chat
//       if (selectedContact && message.receiverId === selectedContact.id) {
//         setMessages(prev => [...prev, message]);
//       }
//     };

//     socket.on('receive_message', handleReceiveMessage);
//     socket.on('message_sent', handleMessageSent);

//     return () => {
//       socket.off('receive_message', handleReceiveMessage);
//       socket.off('message_sent', handleMessageSent);
//     };
//   }, [socket, selectedContact]);

//   const handleLogin = (e) => {
//     e.preventDefault();
//     if (username.trim()) {
//       const userId = username.toLowerCase().replace(/\s+/g, '');
//       const userData = {
//         userId: userId,
//         username: username
//       };
      
//       // Save user data to localStorage
//       localStorage.setItem('chatUser', JSON.stringify(userData));
      
//       setCurrentUser(userData);
      
//       // Initialize socket connection if not already done
//       if (!socket) {
//         const newSocket = io('http://localhost:5000');
//         setSocket(newSocket);
//         setupSocketListeners(newSocket);
//         newSocket.emit('user_join', userData);
//       } else {
//         socket.emit('user_join', userData);
//       }
      
//       setShowLogin(false);
//     }
//   };

//   const handleLogout = () => {
//     // Clear localStorage
//     localStorage.removeItem('chatUser');
//     localStorage.removeItem('selectedContact');
    
//     // Disconnect socket
//     if (socket) {
//       socket.disconnect();
//     }
    
//     // Reset state
//     setCurrentUser(null);
//     setContacts([]);
//     setSelectedContact(null);
//     setMessages([]);
//     setOnlineUsers([]);
//     setSocket(null);
//     setShowLogin(true);
//     setUsername('');
//   };

//   const handleContactSelect = (contact) => {
//     console.log('Selected contact:', contact);
//     setSelectedContact(contact);
//     setMessages([]); // Clear previous messages
    
//     // Save selected contact to localStorage
//     localStorage.setItem('selectedContact', JSON.stringify(contact));
    
//     // Request messages for this chat
//     if (socket && currentUser) {
//       console.log('Requesting messages between:', currentUser.userId, 'and', contact.id);
//       socket.emit('get_messages', {
//         userId1: currentUser.userId,
//         userId2: contact.id
//       });
//     }
//   };

//   // Restore selected contact on page refresh
//   useEffect(() => {
//     if (currentUser && contacts.length > 0 && !selectedContact) {
//       const savedContact = localStorage.getItem('selectedContact');
//       if (savedContact) {
//         try {
//           const contactData = JSON.parse(savedContact);
//           // Find contact in current contacts list to get updated status
//           const currentContact = contacts.find(c => c.id === contactData.id);
//           if (currentContact) {
//             handleContactSelect(currentContact);
//           }
//         } catch (error) {
//           console.error('Error restoring selected contact:', error);
//           localStorage.removeItem('selectedContact');
//         }
//       }
//     }
//   }, [currentUser, contacts]);

//   const handleSendMessage = (e) => {
//     e.preventDefault();
//     if (newMessage.trim() && selectedContact && socket && currentUser) {
//       console.log('Sending message:', {
//         from: currentUser.username,
//         to: selectedContact.name,
//         message: newMessage
//       });
      
//       const messageData = {
//         senderId: currentUser.userId,
//         receiverId: selectedContact.id,
//         message: newMessage.trim(),
//         senderName: currentUser.username,
//         timestamp: new Date().toISOString()
//       };
      
//       socket.emit('send_message', messageData);
//       setNewMessage('');
//     }
//   };

//   const formatTime = (timestamp) => {
//     const date = new Date(timestamp);
//     return date.toLocaleTimeString('en-US', { 
//       hour: '2-digit', 
//       minute: '2-digit',
//       hour12: false 
//     });
//   };

//   const isUserOnline = (userId) => {
//     return onlineUsers.some(user => user.id === userId);
//   };

//   // Show loading screen while checking for existing user
//   if (loading) {
//     return (
//       <div className="loading-container">
//         <div className="loading-spinner">Loading...</div>
//       </div>
//     );
//   }

//   if (showLogin) {
//     return (
//       <div className="login-container">
//         <div className="login-form">
//           <h2>Join Chat</h2>
//           <form onSubmit={handleLogin}>
//             <input
//               type="text"
//               placeholder="Enter your username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               required
//             />
//             <button type="submit">Join</button>
//           </form>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="chat-app">
//       <div className="header">
//         <div className="header-left">
//           <h1>Chatty</h1>
//           <span className="welcome-message">Welcome, {currentUser?.username}!</span>
//         </div>
//         <div className="header-right">
//           <span className="settings">⚙️ Settings</span>
//           <span className="profile">👤 Profile</span>
//           <span className="logout" onClick={handleLogout}>🚪 Logout</span>
//         </div>
//       </div>

//       <div className="chat-container">
//         <div className="sidebar">
//           <div className="contacts-header">
//             <h3>👥 Contacts</h3>
//             <label>
//               <input type="checkbox" /> Show online only ({onlineUsers.length} online)
//             </label>
//           </div>
          
//           <div className="contacts-list">
//             {contacts.filter(contact => contact.id !== currentUser?.userId).map(contact => (
//               <div 
//                 key={contact.id}
//                 className={`contact ${selectedContact?.id === contact.id ? 'selected' : ''}`}
//                 onClick={() => handleContactSelect(contact)}
//               >
//                 <div className="contact-avatar">
//                   👤
//                   {isUserOnline(contact.id) && <div className="online-indicator"></div>}
//                 </div>
//                 <div className="contact-info">
//                   <div className="contact-name">{contact.name}</div>
//                   <div className={`contact-status ${contact.status}`}>
//                     {isUserOnline(contact.id) ? 'Online' : 'Offline'}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="chat-area">
//           {selectedContact ? (
//             <>
//               <div className="chat-header">
//                 <div className="chat-contact-info">
//                   <div className="chat-avatar">
//                     👤
//                     {isUserOnline(selectedContact.id) && <div className="online-indicator"></div>}
//                   </div>
//                   <div>
//                     <div className="chat-contact-name">{selectedContact.name}</div>
//                     <div className={`chat-contact-status ${selectedContact.status}`}>
//                       {isUserOnline(selectedContact.id) ? 'Online' : 'Offline'}
//                     </div>
//                   </div>
//                 </div>
//                 <button className="close-chat" onClick={() => {
//                   setSelectedContact(null);
//                   localStorage.removeItem('selectedContact');
//                 }}>✕</button>
//               </div>

//               <div className="messages-container">
//                 {messages.map((message, index) => (
//                   <div 
//                     key={message.id || index}
//                     className={`message ${message.senderId === currentUser.userId ? 'sent' : 'received'}`}
//                   >
//                     <div className="message-content">
//                       <div className="message-text">{message.message}</div>
//                       <div className="message-time">{formatTime(message.timestamp)}</div>
//                     </div>
//                   </div>
//                 ))}
//                 <div ref={messagesEndRef} />
//               </div>

//               <form className="message-input-container" onSubmit={handleSendMessage}>
//                 <input
//                   type="text"
//                   placeholder="Type a message..."
//                   value={newMessage}
//                   onChange={(e) => setNewMessage(e.target.value)}
//                 />
//                 <button type="submit">📤</button>
//               </form>
//             </>
//           ) : (
//             <div className="no-chat-selected">
//               <h3>Select a contact to start chatting</h3>
//               <p>Your chats are automatically saved and will be restored when you return.</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NewChat;
import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import './styles/NewChat.css';

const NewChat = () => {
  const [socket, setSocket] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [showLogin, setShowLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Check for existing user session on component mount
  useEffect(() => {
    const checkExistingUser = async () => {
      try {
        const savedUser = localStorage.getItem('chatUser');
        if (savedUser) {
          const userData = JSON.parse(savedUser);
          console.log('Found saved user:', userData);
          
          // Verify user still exists in database
          const response = await fetch(`http://localhost:5000/api/user/${userData.userId}`);
          const result = await response.json();
          
          if (result.exists) {
            setCurrentUser(userData);
            setShowLogin(false);
            
            // Initialize socket connection
            const newSocket = io('http://localhost:5000');
            setSocket(newSocket);
            
            // Auto-join with saved user data
            newSocket.emit('user_join', userData);
            
            setupSocketListeners(newSocket);
          } else {
            // User doesn't exist in database anymore, clear localStorage
            localStorage.removeItem('chatUser');
          }
        }
      } catch (error) {
        console.error('Error checking existing user:', error);
        localStorage.removeItem('chatUser');
      } finally {
        setLoading(false);
      }
    };

    checkExistingUser();
  }, []);

  const setupSocketListeners = (socketInstance) => {
    // Listen for users update
    socketInstance.on('users_update', (data) => {
      console.log('Users update received:', data);
      setOnlineUsers(data.onlineUsers);
      setContacts(data.contacts);
    });

    // Listen for chat messages when opening a chat
    socketInstance.on('chat_messages', (chatMessages) => {
      console.log('Chat messages received:', chatMessages);
      setMessages(chatMessages);
    });

    // Handle errors
    socketInstance.on('error', (error) => {
      console.error('Socket error:', error);
      alert('An error occurred: ' + error.message);
    });
  };

  // Separate useEffect for handling real-time messages
  useEffect(() => {
    if (!socket) return;

    const handleReceiveMessage = (message) => {
      console.log('Real-time message received:', message);
      // Only add message if it's for the currently selected chat
      if (selectedContact && message.senderId === selectedContact.id) {
        setMessages(prev => [...prev, message]);
      }
    };

    const handleMessageSent = (message) => {
      console.log('Message sent confirmation received:', message);
      // Only add if it's for the current chat
      if (selectedContact && message.receiverId === selectedContact.id) {
        setMessages(prev => [...prev, message]);
      }
    };

    socket.on('receive_message', handleReceiveMessage);
    socket.on('message_sent', handleMessageSent);

    return () => {
      socket.off('receive_message', handleReceiveMessage);
      socket.off('message_sent', handleMessageSent);
    };
  }, [socket, selectedContact]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username.trim()) {
      const userId = username.toLowerCase().replace(/\s+/g, '');
      const userData = {
        userId: userId,
        username: username
      };
      
      // Save user data to localStorage
      localStorage.setItem('chatUser', JSON.stringify(userData));
      
      setCurrentUser(userData);
      
      // Initialize socket connection if not already done
      if (!socket) {
        const newSocket = io('http://localhost:5000');
        setSocket(newSocket);
        setupSocketListeners(newSocket);
        newSocket.emit('user_join', userData);
      } else {
        socket.emit('user_join', userData);
      }
      
      setShowLogin(false);
    }
  };

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem('chatUser');
    localStorage.removeItem('selectedContact');
    
    // Disconnect socket
    if (socket) {
      socket.disconnect();
    }
    
    // Reset state
    setCurrentUser(null);
    setContacts([]);
    setSelectedContact(null);
    setMessages([]);
    setOnlineUsers([]);
    setSocket(null);
    setShowLogin(true);
    setUsername('');
  };

  const handleContactSelect = (contact) => {
    console.log('Selected contact:', contact);
    setSelectedContact(contact);
    setMessages([]); // Clear previous messages
    
    // Save selected contact to localStorage
    localStorage.setItem('selectedContact', JSON.stringify(contact));
    
    // Request messages for this chat
    if (socket && currentUser) {
      console.log('Requesting messages between:', currentUser.userId, 'and', contact.id);
      socket.emit('get_messages', {
        userId1: currentUser.userId,
        userId2: contact.id
      });
    }
  };

  // Restore selected contact on page refresh
  useEffect(() => {
    if (currentUser && contacts.length > 0 && !selectedContact) {
      const savedContact = localStorage.getItem('selectedContact');
      if (savedContact) {
        try {
          const contactData = JSON.parse(savedContact);
          // Find contact in current contacts list to get updated status
          const currentContact = contacts.find(c => c.id === contactData.id);
          if (currentContact) {
            handleContactSelect(currentContact);
          }
        } catch (error) {
          console.error('Error restoring selected contact:', error);
          localStorage.removeItem('selectedContact');
        }
      }
    }
  }, [currentUser, contacts]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() && selectedContact && socket && currentUser) {
      console.log('Sending message:', {
        from: currentUser.username,
        to: selectedContact.name,
        message: newMessage
      });
      
      const messageData = {
        senderId: currentUser.userId,
        receiverId: selectedContact.id,
        message: newMessage.trim(),
        senderName: currentUser.username,
        timestamp: new Date().toISOString()
      };
      
      socket.emit('send_message', messageData);
      setNewMessage('');
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  const isUserOnline = (userId) => {
    return onlineUsers.some(user => user.id === userId);
  };

  // Show loading screen while checking for existing user
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  if (showLogin) {
    return (
      <div className="login-container">
        <div className="login-form">
          <h2>Join Chat</h2>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <button type="submit">Join</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-app">
      <div className="header">
        <div className="header-left">
          <h1>Chatty</h1>
          <span className="welcome-message">Welcome, {currentUser?.username}!</span>
        </div>
        <div className="header-right">
          <span className="settings">⚙️ Settings</span>
          <span className="profile">👤 Profile</span>
          <span className="logout" onClick={handleLogout}>🚪 Logout</span>
        </div>
      </div>

      <div className="chat-container">
        <div className="sidebar">
          <div className="contacts-header">
            <h3>👥 Contacts</h3>
            <label>
              <input type="checkbox" /> Show online only ({onlineUsers.length} online)
            </label>
          </div>
          
          <div className="contacts-list">
            {contacts.filter(contact => contact.id !== currentUser?.userId).map(contact => (
              <div 
                key={contact.id}
                className={`contact ${selectedContact?.id === contact.id ? 'selected' : ''}`}
                onClick={() => handleContactSelect(contact)}
              >
                <div className="contact-avatar">
                  👤
                  {isUserOnline(contact.id) && <div className="online-indicator"></div>}
                </div>
                <div className="contact-info">
                  <div className="contact-name">{contact.name}</div>
                  <div className={`contact-status ${contact.status}`}>
                    {isUserOnline(contact.id) ? 'Online' : 'Offline'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="chat-area">
          {selectedContact ? (
            <>
              <div className="chat-header">
                <div className="chat-contact-info">
                  <div className="chat-avatar">
                    👤
                    {isUserOnline(selectedContact.id) && <div className="online-indicator"></div>}
                  </div>
                  <div>
                    <div className="chat-contact-name">{selectedContact.name}</div>
                    <div className={`chat-contact-status ${selectedContact.status}`}>
                      {isUserOnline(selectedContact.id) ? 'Online' : 'Offline'}
                    </div>
                  </div>
                </div>
                <button className="close-chat" onClick={() => {
                  setSelectedContact(null);
                  localStorage.removeItem('selectedContact');
                }}>✕</button>
              </div>

              <div className="messages-container">
                {messages.map((message, index) => (
                  <div 
                    key={message.id || index}
                    className={`message ${message.senderId === currentUser.userId ? 'sent' : 'received'}`}
                  >
                    <div className="message-content">
                      <div className="message-text">{message.message}</div>
                      <div className="message-time">{formatTime(message.timestamp)}</div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <form className="message-input-container" onSubmit={handleSendMessage}>
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <button type="submit">📤</button>
              </form>
            </>
          ) : (
            <div className="no-chat-selected">
              <h3>Select a contact to start chatting</h3>
              <p>Your chats are automatically saved and will be restored when you return.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewChat;