// import React, { useState } from 'react';
// import { Search, ArrowLeft, MoreHorizontal, Users, User, UserPlus, Settings, Bell, LogOut, Archive, HelpCircle } from 'lucide-react';
// import { Link } from 'react-router-dom';
// const MessagingApp = () => {
//   const [activeTab, setActiveTab] = useState('Personal');
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [personalChats, setPersonalChats] = useState([
//     { id: 1, name: 'Engage', message: 'Good Morning', time: 'Yesterday', avatar: '👤' },
//     { id: 2, name: 'Engage', message: 'Good Morning', time: 'Yesterday', avatar: '👤' },
//     { id: 3, name: 'Engage', message: 'Good Morning', time: 'Yesterday', avatar: '👤' },
//     { id: 4, name: 'Engage', message: 'Good Morning', time: 'Yesterday', avatar: '👤' },
//     { id: 5, name: 'Engage', message: 'Good Morning', time: 'Yesterday', avatar: '👤' },
//     { id: 6, name: 'Engage', message: 'Good Morning', time: 'Yesterday', avatar: '👤' },
//     { id: 7, name: 'Engage', message: 'Good Morning', time: 'Yesterday', avatar: '👤' },
//   ]);

//   const [groupChats, setGroupChats] = useState([
//     { id: 1, name: 'Team Alpha', message: 'Meeting at 3 PM today', time: '2 hours ago', avatar: '👥', members: 8 },
//     { id: 2, name: 'Project Beta', message: 'Sarah: Updated the docs', time: '5 hours ago', avatar: '👥', members: 12 },
//     { id: 3, name: 'Design Team', message: 'New mockups shared', time: 'Yesterday', avatar: '👥', members: 6 },
//     { id: 4, name: 'Marketing Squad', message: 'Campaign results are in!', time: 'Yesterday', avatar: '👥', members: 15 },
//     { id: 5, name: 'Dev Community', message: 'Code review needed', time: '2 days ago', avatar: '👥', members: 25 },
//     { id: 6, name: 'Family Group', message: 'Mom: Dinner this Sunday?', time: '3 days ago', avatar: '👥', members: 5 },
//   ]);

//   const currentChats = activeTab === 'Personal' ? personalChats : groupChats;

//   const createNewChat = () => {
//     const newChatId = Math.max(...personalChats.map(chat => chat.id)) + 1;
//     const chatNames = ['Alex', 'Sarah', 'Mike', 'Emma', 'John', 'Lisa', 'David', 'Anna'];
//     const randomName = chatNames[Math.floor(Math.random() * chatNames.length)];

//     const newChat = {
//       id: newChatId,
//       name: randomName,
//       message: 'Hey there! 👋',
//       time: 'Just now',
//       avatar: '👤'
//     };

//     setPersonalChats([newChat, ...personalChats]);
//     setActiveTab('Personal');
//   };

//   const createNewGroup = () => {
//     const newGroupId = Math.max(...groupChats.map(group => group.id)) + 1;
//     const groupNames = [
//       'New Project Team', 'Study Group', 'Weekend Squad', 'Book Club',
//       'Fitness Buddies', 'Travel Planning', 'Work Discussion', 'Creative Team'
//     ];
//     const randomGroupName = groupNames[Math.floor(Math.random() * groupNames.length)];
//     const randomMembers = Math.floor(Math.random() * 20) + 3;

//     const newGroup = {
//       id: newGroupId,
//       name: randomGroupName,
//       message: 'Welcome to the group! 🎉',
//       time: 'Just now',
//       avatar: '👥',
//       members: randomMembers
//     };

//     setGroupChats([newGroup, ...groupChats]);
//     setActiveTab('Group');
//   };

//   const dropdownOptions = [
//     { icon: UserPlus, label: 'New Chat', action: createNewChat },
//     { icon: Users, label: 'Create Group', action: createNewGroup },
//     { icon: Archive, label: 'Archived Chats', action: () => console.log('Archived Chats') },
//     { icon: Bell, label: 'Notifications', action: () => console.log('Notifications') },
//     { icon: Settings, label: 'Settings', action: () => console.log('Settings') },
//     { icon: HelpCircle, label: 'Help & Support', action: () => console.log('Help') },
//     { icon: LogOut, label: 'Log Out', action: () => console.log('Log Out'), danger: true },
//   ];

//   const handleOptionClick = (option) => {
//     option.action();
//     setShowDropdown(false);
//   };

//   return (
//     <div className="max-w-md mx-auto bg-white min-h-screen font-sans relative">
//       {/* Header */}
//       <div className="flex items-center justify-between p-4 bg-white border-b border-gray-100">
//         <Link to='/dashboard'>
//         <ArrowLeft className="w-6 h-6 text-gray-600" />
//         </Link>
//         <div className="flex items-center space-x-2 flex-1 mx-4">
//           <Search className="w-5 h-5 text-gray-400" />
//           <input 
//             type="text" 
//             placeholder="Search" 
//             className="flex-1 bg-gray-50 rounded-full px-3 py-2 text-sm outline-none"
//           />
//         </div>
//         <div className="relative">
//           <button 
//             onClick={() => setShowDropdown(!showDropdown)}
//             className="p-1 rounded-full hover:bg-gray-100 transition-colors"
//           >
//             <MoreHorizontal className="w-6 h-6 text-blue-500" />
//           </button>
          
//           {/* Dropdown Menu */}
//           {showDropdown && (
//             <>
//               <div 
//                 className="fixed inset-0 z-10" 
//                 onClick={() => setShowDropdown(false)}
//               ></div>
//               <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
//                 <div className="py-2">
//                   {dropdownOptions.map((option, index) => {
//                     const Icon = option.icon;
//                     return (
//                       <button
//                         key={index}
//                         onClick={() => handleOptionClick(option)}
//                         className={`w-full flex items-center px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
//                           option.danger ? 'text-red-600 hover:bg-red-50' : 'text-gray-700'
//                         }`}
//                       >
//                         <Icon className="w-5 h-5 mr-3" />
//                         <span className="text-sm font-medium">{option.label}</span>
//                       </button>
//                     );
//                   })}
//                 </div>
//               </div>
//             </>
//           )}
//         </div>
//       </div>

//       {/* Character Illustration */}
//       <div className="flex justify-center py-6 bg-blue-50">
//         <div className="relative">
//           <div className="w-20 h-20 bg-blue-400 rounded-full flex items-center justify-center">
//             <div className="text-2xl">🧑‍💼</div>
//           </div>
//           <div className="absolute -top-2 -right-6 bg-blue-400 rounded-full p-2">
//             <MoreHorizontal className="w-4 h-4 text-white" />
//           </div>
//         </div>
//       </div>

//       {/* Tabs */}
//       <div className="flex bg-white border-b border-gray-100">
//         {['Personal', 'Group'].map((tab) => (
//           <button
//             key={tab}
//             onClick={() => setActiveTab(tab)}
//             className={`flex-1 py-3 px-4 text-sm font-medium ${
//               activeTab === tab
//                 ? 'text-blue-500 border-b-2 border-blue-500'
//                 : 'text-gray-500'
//             }`}
//           >
//             <div className="flex items-center justify-center space-x-2">
//               {tab === 'Personal' ? (
//                 <User className="w-4 h-4" />
//               ) : (
//                 <Users className="w-4 h-4" />
//               )}
//               <span>{tab}</span>
//             </div>
//           </button>
//         ))}
//       </div>

//       {/* Chat List */}
//       <div className="bg-white">
//         {currentChats.map((chat) => (
//           <div key={chat.id} className="flex items-center p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer">
//             <div className="relative">
//               <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-3">
//                 <span className="text-blue-600 text-lg">
//                   {activeTab === 'Personal' ? '👤' : '👥'}
//                 </span>
//               </div>
//               <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-500 rounded-full"></div>
//             </div>
            
//             <div className="flex-1 min-w-0">
//               <div className="flex items-center justify-between mb-1">
//                 <h3 className="font-medium text-gray-900 truncate">
//                   {chat.name}
//                   {activeTab === 'Group' && (
//                     <span className="text-xs text-gray-500 ml-1">({chat.members} members)</span>
//                   )}
//                 </h3>
//                 <span className="text-xs text-gray-500 flex-shrink-0">{chat.time}</span>
//               </div>
//               <p className="text-sm text-gray-600 truncate">{chat.message}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* PWA Icon */}
//       <div className="fixed bottom-4 right-4 opacity-20 hover:opacity-100 transition-opacity duration-300">
//         <div className="bg-blue-500 text-white p-2 rounded-full shadow-lg">
//           <div className="w-6 h-6 flex items-center justify-center">
//             <span className="text-xs font-bold">PWA</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MessagingApp;
// import React, { useState, useEffect } from 'react';
// import { Search, ArrowLeft, MoreHorizontal, Users, User, UserPlus, Settings, Bell, LogOut, Archive, HelpCircle } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import api from './api'; // make sure this points to your axios config

// const MessagingApp = () => {
//   const [activeTab, setActiveTab] = useState('Personal');
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [personalChats, setPersonalChats] = useState([]);
//   const [groupChats, setGroupChats] = useState([]);

//   useEffect(() => {
//     const fetchChats = async () => {
//       try {
//         const { data } = await api.get('/chat');
//         const personal = data.filter(chat => !chat.isGroupChat);
//         const groups = data.filter(chat => chat.isGroupChat);

//         setPersonalChats(personal.map(chat => ({
//           id: chat._id,
//           name: chat.users.find(u => u.name !== 'YourName')?.name || 'Someone',
//           message: chat.latestMessage?.content || 'Start chatting!',
//           time: new Date(chat.updatedAt).toLocaleDateString(),
//           avatar: '👤'
//         })));

//         setGroupChats(groups.map(chat => ({
//           id: chat._id,
//           name: chat.chatName,
//           message: chat.latestMessage?.content || 'Start chatting!',
//           time: new Date(chat.updatedAt).toLocaleDateString(),
//           avatar: '👥',
//           members: chat.users.length
//         })));
//       } catch (err) {
//         console.error('Error fetching chats:', err);
//       }
//     };

//     fetchChats();
//   }, []);

//   const createNewChat = async () => {
//     try {
//       const targetUserId = prompt('Enter user ID to start chat:');
//       const { data } = await api.post('/chat', { userId: targetUserId });
//       setPersonalChats([{
//         id: data._id,
//         name: data.users.find(u => u.name !== 'YourName')?.name || 'New Chat',
//         message: 'Start chatting!',
//         time: 'Just now',
//         avatar: '👤'
//       }, ...personalChats]);
//       setActiveTab('Personal');
//     } catch (err) {
//       console.error('Create chat error', err);
//     }
//   };

//   const createNewGroup = async () => {
//     try {
//       const groupName = prompt('Enter group name');
//       const userIds = prompt('Enter comma-separated user IDs to add').split(',').map(id => id.trim());
//       const { data } = await api.post('/chat/group', {
//         name: groupName,
//         users: userIds
//       });
//       setGroupChats([{
//         id: data._id,
//         name: data.chatName,
//         message: 'Group created!',
//         time: 'Just now',
//         avatar: '👥',
//         members: data.users.length
//       }, ...groupChats]);
//       setActiveTab('Group');
//     } catch (err) {
//       console.error('Group creation error', err);
//     }
//   };

//   const dropdownOptions = [
//     { icon: UserPlus, label: 'New Chat', action: createNewChat },
//     { icon: Users, label: 'Create Group', action: createNewGroup },
//     { icon: Archive, label: 'Archived Chats', action: () => console.log('Archived Chats') },
//     { icon: Bell, label: 'Notifications', action: () => console.log('Notifications') },
//     { icon: Settings, label: 'Settings', action: () => console.log('Settings') },
//     { icon: HelpCircle, label: 'Help & Support', action: () => console.log('Help') },
//     { icon: LogOut, label: 'Log Out', action: () => console.log('Log Out'), danger: true },
//   ];

//   const handleOptionClick = (option) => {
//     option.action();
//     setShowDropdown(false);
//   };

//   const currentChats = activeTab === 'Personal' ? personalChats : groupChats;

//   return (
//     <div className="max-w-md mx-auto bg-white min-h-screen font-sans relative">
//       <div className="flex items-center justify-between p-4 bg-white border-b border-gray-100">
//         <Link to='/dashboard'>
//           <ArrowLeft className="w-6 h-6 text-gray-600" />
//         </Link>
//         <div className="flex items-center space-x-2 flex-1 mx-4">
//           <Search className="w-5 h-5 text-gray-400" />
//           <input 
//             type="text" 
//             placeholder="Search" 
//             className="flex-1 bg-gray-50 rounded-full px-3 py-2 text-sm outline-none"
//           />
//         </div>
//         <div className="relative">
//           <button 
//             onClick={() => setShowDropdown(!showDropdown)}
//             className="p-1 rounded-full hover:bg-gray-100 transition-colors"
//           >
//             <MoreHorizontal className="w-6 h-6 text-blue-500" />
//           </button>
//           {showDropdown && (
//             <>
//               <div 
//                 className="fixed inset-0 z-10" 
//                 onClick={() => setShowDropdown(false)}
//               ></div>
//               <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
//                 <div className="py-2">
//                   {dropdownOptions.map((option, index) => {
//                     const Icon = option.icon;
//                     return (
//                       <button
//                         key={index}
//                         onClick={() => handleOptionClick(option)}
//                         className={`w-full flex items-center px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
//                           option.danger ? 'text-red-600 hover:bg-red-50' : 'text-gray-700'
//                         }`}
//                       >
//                         <Icon className="w-5 h-5 mr-3" />
//                         <span className="text-sm font-medium">{option.label}</span>
//                       </button>
//                     );
//                   })}
//                 </div>
//               </div>
//             </>
//           )}
//         </div>
//       </div>

//       <div className="flex justify-center py-6 bg-blue-50">
//         <div className="relative">
//           <div className="w-20 h-20 bg-blue-400 rounded-full flex items-center justify-center">
//             <div className="text-2xl">🧑‍💼</div>
//           </div>
//           <div className="absolute -top-2 -right-6 bg-blue-400 rounded-full p-2">
//             <MoreHorizontal className="w-4 h-4 text-white" />
//           </div>
//         </div>
//       </div>

//       <div className="flex bg-white border-b border-gray-100">
//         {['Personal', 'Group'].map((tab) => (
//           <button
//             key={tab}
//             onClick={() => setActiveTab(tab)}
//             className={`flex-1 py-3 px-4 text-sm font-medium ${
//               activeTab === tab
//                 ? 'text-blue-500 border-b-2 border-blue-500'
//                 : 'text-gray-500'
//             }`}
//           >
//             <div className="flex items-center justify-center space-x-2">
//               {tab === 'Personal' ? (
//                 <User className="w-4 h-4" />
//               ) : (
//                 <Users className="w-4 h-4" />
//               )}
//               <span>{tab}</span>
//             </div>
//           </button>
//         ))}
//       </div>

//       <div className="bg-white">
//         {currentChats.map((chat) => (
//           <div key={chat.id} className="flex items-center p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer">
//             <div className="relative">
//               <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-3">
//                 <span className="text-blue-600 text-lg">
//                   {activeTab === 'Personal' ? '👤' : '👥'}
//                 </span>
//               </div>
//               <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-500 rounded-full"></div>
//             </div>

//             <div className="flex-1 min-w-0">
//               <div className="flex items-center justify-between mb-1">
//                 <h3 className="font-medium text-gray-900 truncate">
//                   {chat.name}
//                   {activeTab === 'Group' && (
//                     <span className="text-xs text-gray-500 ml-1">({chat.members} members)</span>
//                   )}
//                 </h3>
//                 <span className="text-xs text-gray-500 flex-shrink-0">{chat.time}</span>
//               </div>
//               <p className="text-sm text-gray-600 truncate">{chat.message}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="fixed bottom-4 right-4 opacity-20 hover:opacity-100 transition-opacity duration-300">
//         <div className="bg-blue-500 text-white p-2 rounded-full shadow-lg">
//           <div className="w-6 h-6 flex items-center justify-center">
//             <span className="text-xs font-bold">PWA</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MessagingApp;
import React, { useState, useEffect, useRef } from 'react';
import { Send, Plus, Users, User, Search, MoreVertical } from 'lucide-react';

// Real Socket.io implementation (in production, import from 'socket.io-client')
const createSocket = () => {
  // Simulating socket.io-client for demo
  const eventHandlers = {};
  
  return {
    emit: (event, data) => {
      console.log('Socket emit:', event, data);
      // Simulate server responses for demo
      setTimeout(() => {
        if (event === 'send_message') {
          eventHandlers['new_message']?.(data);
        }
      }, 100);
    },
    on: (event, callback) => {
      eventHandlers[event] = callback;
      console.log('Socket on:', event);
    },
    off: (event) => {
      delete eventHandlers[event];
      console.log('Socket off:', event);
    },
    disconnect: () => console.log('Socket disconnected'),
    connect: () => console.log('Socket connected')
  };
};

const ChatModule = () => {
  const [socket, setSocket] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [users, setUsers] = useState([]);
  const [showNewChatModal, setShowNewChatModal] = useState(false);
  const [chatType, setChatType] = useState('personal');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [groupName, setGroupName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [typingUsers, setTypingUsers] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  // Initialize socket connection
  useEffect(() => {
    const newSocket = createSocket();
    setSocket(newSocket);
    
    // Initialize with mock user
    const mockUser = { id: '1', username: 'You' };
    setCurrentUser(mockUser);
    
    // Socket event listeners
    newSocket.on('new_message', (message) => {
      setMessages(prev => [...prev, message]);
      // Update conversation's last message
      setConversations(prev => 
        prev.map(conv => 
          conv.id === message.conversationId 
            ? { ...conv, lastMessage: message }
            : conv
        )
      );
    });
    
    newSocket.on('user_typing', ({ userId, isTyping }) => {
      setTypingUsers(prev => {
        if (isTyping) {
          const user = users.find(u => u.id === userId);
          return user && !prev.includes(user.username) 
            ? [...prev, user.username] 
            : prev;
        } else {
          const user = users.find(u => u.id === userId);
          return user ? prev.filter(name => name !== user.username) : prev;
        }
      });
    });
    
    newSocket.on('user_online', (userId) => {
      setUsers(prev => 
        prev.map(user => 
          user.id === userId ? { ...user, online: true } : user
        )
      );
    });
    
    newSocket.on('user_offline', (userId) => {
      setUsers(prev => 
        prev.map(user => 
          user.id === userId ? { ...user, online: false } : user
        )
      );
    });
    
    // Mock data initialization
    const mockConversations = [
      {
        id: '1',
        type: 'personal',
        participants: ['1', '2'],
        name: null,
        lastMessage: { content: 'Hey, how are you?', timestamp: new Date(), senderId: '2' },
        otherUser: { id: '2', username: 'Alice', online: true }
      },
      {
        id: '2',
        type: 'group',
        participants: ['1', '2', '3', '4'],
        name: 'Team Discussion',
        lastMessage: { content: 'Great work everyone!', timestamp: new Date(), senderId: '3' },
        memberCount: 4
      }
    ];
    setConversations(mockConversations);
    
    const mockUsers = [
      { id: '2', username: 'Alice', online: true },
      { id: '3', username: 'Bob', online: false },
      { id: '4', username: 'Charlie', online: true },
      { id: '5', username: 'Diana', online: true }
    ];
    setUsers(mockUsers);
    
    // Join user room
    newSocket.emit('join', mockUser.id);
    
    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !activeConversation || !socket) return;
    
    const messageData = {
      id: Date.now().toString(),
      conversationId: activeConversation.id,
      senderId: currentUser.id,
      content: newMessage.trim(),
      timestamp: new Date(),
      type: 'text'
    };
    
    // Add message immediately to UI (optimistic update)
    setMessages(prev => [...prev, messageData]);
    
    // Send through socket
    socket.emit('send_message', {
      conversationId: activeConversation.id,
      content: newMessage.trim(),
      senderId: currentUser.id
    });
    
    setNewMessage('');
    
    // Stop typing indicator
    if (isTyping) {
      socket.emit('typing', {
        conversationId: activeConversation.id,
        userId: currentUser.id,
        isTyping: false
      });
      setIsTyping(false);
    }
  };

  const handleTyping = (value) => {
    setNewMessage(value);
    
    if (!socket || !activeConversation) return;
    
    // Start typing indicator
    if (!isTyping && value.trim()) {
      setIsTyping(true);
      socket.emit('typing', {
        conversationId: activeConversation.id,
        userId: currentUser.id,
        isTyping: true
      });
    }
    
    // Clear previous timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    
    // Stop typing after 2 seconds of inactivity
    typingTimeoutRef.current = setTimeout(() => {
      if (isTyping) {
        setIsTyping(false);
        socket.emit('typing', {
          conversationId: activeConversation.id,
          userId: currentUser.id,
          isTyping: false
        });
      }
    }, 2000);
  };

  const handleConversationClick = (conversation) => {
    setActiveConversation(conversation);
    setTypingUsers([]);
    
    if (socket) {
      socket.emit('join_conversation', conversation.id);
    }
    
    // Load messages for this conversation
    const mockMessages = [
      {
        id: '1',
        conversationId: conversation.id,
        senderId: conversation.type === 'personal' ? conversation.otherUser?.id || '2' : '3',
        content: 'Hello there!',
        timestamp: new Date(Date.now() - 3600000),
        type: 'text'
      },
      {
        id: '2',
        conversationId: conversation.id,
        senderId: currentUser.id,
        content: 'Hi! How are you doing?',
        timestamp: new Date(Date.now() - 1800000),
        type: 'text'
      }
    ];
    setMessages(mockMessages);
  };

  const handleCreateConversation = () => {
    if (!selectedUsers.length) return;
    if (chatType === 'personal' && selectedUsers.length !== 1) return;
    if (chatType === 'group' && selectedUsers.length < 1) return;
    if (chatType === 'group' && !groupName.trim()) return;
    
    const conversationId = Date.now().toString();
    const participants = [currentUser.id, ...selectedUsers];
    
    let newConversation = {
      id: conversationId,
      type: chatType,
      participants,
      createdAt: new Date(),
      lastMessage: null
    };
    
    if (chatType === 'personal') {
      const otherUser = users.find(u => u.id === selectedUsers[0]);
      newConversation = {
        ...newConversation,
        name: null,
        otherUser
      };
    } else {
      newConversation = {
        ...newConversation,
        name: groupName.trim(),
        memberCount: participants.length
      };
    }
    
    // Add to conversations list
    setConversations(prev => [newConversation, ...prev]);
    
    // Close modal and reset form
    setShowNewChatModal(false);
    setSelectedUsers([]);
    setGroupName('');
    setChatType('personal');
    setSearchTerm('');
    
    // Select the new conversation
    setActiveConversation(newConversation);
    setMessages([]);
    
    // Join the conversation via socket
    if (socket) {
      socket.emit('join_conversation', conversationId);
    }
    
    // Create conversation on server (mock)
    console.log('Creating conversation:', newConversation);
  };

  const toggleUserSelection = (userId) => {
    if (chatType === 'personal') {
      setSelectedUsers([userId]);
    } else {
      setSelectedUsers(prev => 
        prev.includes(userId)
          ? prev.filter(id => id !== userId)
          : [...prev, userId]
      );
    }
  };

  const getConversationName = (conversation) => {
    if (conversation.type === 'group') {
      return conversation.name;
    }
    return conversation.otherUser?.username || 'Unknown User';
  };

  const getConversationSubtext = (conversation) => {
    if (conversation.type === 'group') {
      return `${conversation.memberCount} members`;
    }
    return conversation.otherUser?.online ? 'Online' : 'Offline';
  };

  const getSenderName = (senderId) => {
    if (senderId === currentUser.id) return 'You';
    const user = users.find(u => u.id === senderId);
    return user?.username || 'Unknown';
  };

  const filteredUsers = users.filter(user => 
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) &&
    user.id !== currentUser.id
  );

  const isCreateButtonDisabled = () => {
    if (chatType === 'personal') {
      return selectedUsers.length !== 1;
    }
    return selectedUsers.length < 1 || !groupName.trim();
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/3 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-semibold text-gray-800">Chats</h1>
            <button
              onClick={() => setShowNewChatModal(true)}
              className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
            >
              <Plus size={20} />
            </button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        
        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto">
          {conversations.map(conversation => (
            <div
              key={conversation.id}
              onClick={() => handleConversationClick(conversation)}
              className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                activeConversation?.id === conversation.id ? 'bg-blue-50 border-blue-200' : ''
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  {conversation.type === 'group' ? (
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center">
                      <Users className="text-white" size={20} />
                    </div>
                  ) : (
                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center relative">
                      <User className="text-white" size={20} />
                      {conversation.otherUser?.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                      )}
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900 truncate">
                      {getConversationName(conversation)}
                    </h3>
                    {conversation.lastMessage && (
                      <span className="text-xs text-gray-500">
                        {new Date(conversation.lastMessage.timestamp).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mb-1">
                    {getConversationSubtext(conversation)}
                  </p>
                  {conversation.lastMessage && (
                    <p className="text-sm text-gray-600 truncate">
                      {conversation.lastMessage.content}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
          {conversations.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              <Users size={48} className="mx-auto mb-4 text-gray-300" />
              <p>No conversations yet</p>
              <p className="text-sm">Start a new chat to get going!</p>
            </div>
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {activeConversation ? (
          <>
            {/* Chat Header */}
            <div className="bg-white border-b border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {activeConversation.type === 'group' ? (
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center">
                      <Users className="text-white" size={18} />
                    </div>
                  ) : (
                    <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center relative">
                      <User className="text-white" size={18} />
                      {activeConversation.otherUser?.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                      )}
                    </div>
                  )}
                  <div>
                    <h2 className="font-medium text-gray-900">
                      {getConversationName(activeConversation)}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {getConversationSubtext(activeConversation)}
                    </p>
                  </div>
                </div>
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <MoreVertical size={20} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map(message => (
                <div
                  key={message.id}
                  className={`flex ${message.senderId === currentUser.id ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.senderId === currentUser.id
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-800'
                    }`}
                  >
                    {activeConversation.type === 'group' && message.senderId !== currentUser.id && (
                      <p className="text-xs font-medium mb-1 opacity-70">
                        {getSenderName(message.senderId)}
                      </p>
                    )}
                    <p className="text-sm">{message.content}</p>
                    <p className={`text-xs mt-1 ${
                      message.senderId === currentUser.id ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {new Date(message.timestamp).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
              ))}
              {typingUsers.length > 0 && (
                <div className="flex justify-start">
                  <div className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg">
                    <p className="text-sm italic">
                      {typingUsers.join(', ')} {typingUsers.length === 1 ? 'is' : 'are'} typing...
                    </p>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="bg-white border-t border-gray-200 p-4">
              <div className="flex items-center space-x-4">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => handleTyping(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type a message..."
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-gray-500" size={24} />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
              <p className="text-gray-500">Choose a conversation to start messaging</p>
            </div>
          </div>
        )}
      </div>

      {/* New Chat Modal */}
      {showNewChatModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-96 max-h-[600px] overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900 mb-4">New Chat</h2>
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    setChatType('personal');
                    setSelectedUsers([]);
                  }}
                  className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium ${
                    chatType === 'personal' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Personal Chat
                </button>
                <button
                  onClick={() => {
                    setChatType('group');
                    setSelectedUsers([]);
                  }}
                  className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium ${
                    chatType === 'group' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Group Chat
                </button>
              </div>
            </div>
            
            <div className="p-4 space-y-4">
              {chatType === 'group' && (
                <input
                  type="text"
                  placeholder="Enter group name"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
              
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="text-sm text-gray-600">
                {chatType === 'personal' 
                  ? 'Select one person to chat with:' 
                  : `Select people for the group (${selectedUsers.length} selected):`
                }
              </div>
              
              <div className="max-h-60 overflow-y-auto space-y-1">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map(user => (
                    <div
                      key={user.id}
                      onClick={() => toggleUserSelection(user.id)}
                      className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedUsers.includes(user.id) 
                          ? 'bg-blue-100 border border-blue-300' 
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center relative">
                        <User className="text-white" size={16} />
                        {user.online && (
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                        )}
                      </div>
                      <div className="flex-1">
                        <span className="text-sm font-medium text-gray-900">{user.username}</span>
                        <p className="text-xs text-gray-500">
                          {user.online ? 'Online' : 'Offline'}
                        </p>
                      </div>
                      {selectedUsers.includes(user.id) && (
                        <div className="w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center">
                          <span className="text-xs">✓</span>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <User size={32} className="mx-auto mb-2 text-gray-300" />
                    <p>No users found</p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="p-4 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowNewChatModal(false);
                  setSelectedUsers([]);
                  setGroupName('');
                  setSearchTerm('');
                  setChatType('personal');
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateConversation}
                disabled={isCreateButtonDisabled()}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
              >
                Create Chat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatModule;