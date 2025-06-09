// "use client"
// import LinkedInNavigation from './LinkedlnNavigation'
// import { useState, useEffect } from "react"
// import {
//   MoreHorizontal,
//   MessageCircle,
//   Repeat2,
//   Send,
//   Bell,
//   Home,
//   Briefcase,
//   Users,
//   Calendar,
//   ThumbsUp,
//   X,
//   Lightbulb,
//   RefreshCw,
//   CalendarDays,
//   Clock,
//   MapPin,
//   Mail,
//   Archive,
//   Star,
//   Paperclip,
// } from "lucide-react"

// // Mock LinkedInNavigation component (since it's imported but not defined)


// const HRPeersDashboard = () => {
//   const [posts, setPosts] = useState([])
//   const [newPost, setNewPost] = useState("")
//   const [showNewPost, setShowNewPost] = useState(false)
//   const [showMobileMenu, setShowMobileMenu] = useState(false)
//   const [tipOfTheDay, setTipOfTheDay] = useState(null)
//   const [isLoadingTip, setIsLoadingTip] = useState(false)
//   const [upcomingEvents, setUpcomingEvents] = useState([])
//   const [recentEmails, setRecentEmails] = useState([])

//   // Mock events data
//   useEffect(() => {
//     const mockEvents = [
//       {
//         id: 1,
//         title: "HR Innovation Summit 2025",
//         date: "2025-06-15",
//         time: "09:00 AM",
//         location: "Virtual Event",
//         type: "conference",
//         attendees: 250,
//       },
//       {
//         id: 2,
//         title: "Talent Acquisition Workshop",
//         date: "2025-06-18",
//         time: "02:00 PM",
//         location: "NYC Office",
//         type: "workshop",
//         attendees: 45,
//       },
//       {
//         id: 3,
//         title: "Performance Review Training",
//         date: "2025-06-22",
//         time: "10:00 AM",
//         location: "Virtual Event",
//         type: "training",
//         attendees: 80,
//       },
//       {
//         id: 4,
//         title: "HR Networking Mixer",
//         date: "2025-06-25",
//         time: "06:00 PM",
//         location: "Downtown Hotel",
//         type: "networking",
//         attendees: 120,
//       },
//     ]
//     setUpcomingEvents(mockEvents)

//     // Mock email data
//     const mockEmails = [
//       {
//         id: 1,
//         sender: "Sarah Johnson",
//         senderEmail: "sarah.johnson@techcorp.com",
//         subject: "Q2 Performance Review Results",
//         preview:
//           "Hi team, I wanted to share the results from our Q2 performance reviews. Overall, we saw a 23% improvement in engagement scores...",
//         time: "2h ago",
//         isRead: false,
//         hasAttachment: true,
//         priority: "high",
//       },
//       {
//         id: 2,
//         sender: "Mike Chen",
//         senderEmail: "mike.chen@startuphub.com",
//         subject: "Remote Hiring Best Practices",
//         preview:
//           "Following up on our conversation about remote hiring strategies. I've compiled a list of best practices that have worked well...",
//         time: "4h ago",
//         isRead: true,
//         hasAttachment: false,
//         priority: "normal",
//       },
//       {
//         id: 3,
//         sender: "Lisa Rodriguez",
//         senderEmail: "lisa.rodriguez@peopleops.com",
//         subject: "Mental Health Initiative Update",
//         preview:
//           "Great news! Our mental health initiative has reached 78% employee participation. Here are the key metrics and feedback...",
//         time: "1d ago",
//         isRead: false,
//         hasAttachment: true,
//         priority: "normal",
//       },
//     ]
//     setRecentEmails(mockEmails)
//   }, [])

//   // Local collection of HR-focused inspirational quotes
//   const hrQuotes = [
//     {
//       title: "Leadership Wisdom",
//       content: "Great leaders don't create followers, they create more leaders.",
//       category: "Leadership",
//       author: "Tom Peters",
//     },
//     {
//       title: "Employee Engagement",
//       content:
//         "Employees who believe that management is concerned about them as a whole person – not just an employee – are more productive, more satisfied, more fulfilled.",
//       category: "Engagement",
//       author: "Anne M. Mulcahy",
//     },
//     {
//       title: "Talent Development",
//       content:
//         "The way your employees feel is the way your customers will feel. And if your employees don't feel valued, neither will your customers.",
//       category: "Culture",
//       author: "Sybil F. Stershic",
//     },
//     {
//       title: "Team Building",
//       content: "Coming together is a beginning, staying together is progress, and working together is success.",
//       category: "Teamwork",
//       author: "Henry Ford",
//     },
//     {
//       title: "Performance Management",
//       content: "The best way to find out if you can trust somebody is to trust them.",
//       category: "Trust",
//       author: "Ernest Hemingway",
//     },
//     {
//       title: "Workplace Innovation",
//       content: "Innovation distinguishes between a leader and a follower.",
//       category: "Innovation",
//       author: "Steve Jobs",
//     },
//     {
//       title: "Employee Recognition",
//       content: "People work for money but go the extra mile for recognition, praise and rewards.",
//       category: "Recognition",
//       author: "Dale Carnegie",
//     },
//     {
//       title: "Change Management",
//       content: "The only way to make sense out of change is to plunge into it, move with it, and join the dance.",
//       category: "Change",
//       author: "Alan Watts",
//     },
//     {
//       title: "Communication",
//       content: "The single biggest problem in communication is the illusion that it has taken place.",
//       category: "Communication",
//       author: "George Bernard Shaw",
//     },
//     {
//       title: "Diversity & Inclusion",
//       content:
//         "We all should know that diversity makes for a rich tapestry, and we must understand that all the threads of the tapestry are equal in value no matter what their color.",
//       category: "Diversity",
//       author: "Maya Angelou",
//     },
//   ]

//   // API function for Tip of the Day using local quotes
//   const fetchTipOfTheDay = async () => {
//     setIsLoadingTip(true)

//     // Simulate API delay for better UX
//     await new Promise((resolve) => setTimeout(resolve, 500))

//     try {
//       // Get a random quote from our collection
//       const randomIndex = Math.floor(Math.random() * hrQuotes.length)
//       const selectedQuote = hrQuotes[randomIndex]

//       setTipOfTheDay(selectedQuote)
//     } catch (error) {
//       console.error("Failed to fetch tip of the day:", error)
//       // Fallback quote
//       setTipOfTheDay({
//         title: "Daily Inspiration",
//         content: "Great leaders don't create followers, they create more leaders.",
//         category: "Leadership",
//         author: "HR Wisdom",
//       })
//     } finally {
//       setIsLoadingTip(false)
//     }
//   }

//   // Format date for display
//   const formatEventDate = (dateString) => {
//     const date = new Date(dateString)
//     const today = new Date()
//     const tomorrow = new Date(today)
//     tomorrow.setDate(tomorrow.getDate() + 1)

//     if (date.toDateString() === today.toDateString()) {
//       return "Today"
//     } else if (date.toDateString() === tomorrow.toDateString()) {
//       return "Tomorrow"
//     } else {
//       return date.toLocaleDateString("en-US", {
//         month: "short",
//         day: "numeric",
//         weekday: "short",
//       })
//     }
//   }

//   // Get event type color
//   const getEventTypeColor = (type) => {
//     const colors = {
//       conference: "bg-blue-100 text-blue-800",
//       workshop: "bg-green-100 text-green-800",
//       training: "bg-purple-100 text-purple-800",
//       networking: "bg-orange-100 text-orange-800",
//     }
//     return colors[type] || "bg-gray-100 text-gray-800"
//   }

//   // Get priority color for emails
//   const getPriorityColor = (priority) => {
//     const colors = {
//       high: "border-l-red-500",
//       normal: "border-l-blue-500",
//       low: "border-l-gray-300",
//     }
//     return colors[priority] || "border-l-gray-300"
//   }

//   // Mock data for HR-focused posts
//   useEffect(() => {
//     const mockPosts = [
//       {
//         id: 1,
//         author: {
//           name: "Sarah Johnson",
//           title: "Senior HR Director at TechCorp",
//           followers: "2,847 followers",
//           avatar: null,
//           verified: true,
//         },
//         content:
//           "Just wrapped up our Q2 performance reviews using a new 360-feedback approach. The engagement scores improved by 23%! Sometimes the best innovations come from listening to what employees actually need.\n\n#HRInnovation #EmployeeEngagement #PerformanceManagement",
//         likes: 142,
//         comments: 18,
//         reposts: 7,
//         timeAgo: "2h",
//         image: null,
//       },
//       {
//         id: 2,
//         author: {
//           name: "Mike Chen",
//           title: "Talent Acquisition Specialist at StartupHub",
//           followers: "1,523 followers",
//           avatar: null,
//           verified: false,
//         },
//         content:
//           "Remote hiring tip: Always do a virtual coffee chat before the formal interview. It helps candidates feel more comfortable and gives you insights into their personality.\n\nWhat are your best remote recruiting practices? Drop them in the comments! 👇",
//         likes: 89,
//         comments: 24,
//         reposts: 12,
//         timeAgo: "4h",
//         image: null,
//       },
//       {
//         id: 3,
//         author: {
//           name: "Lisa Rodriguez",
//           title: "People Operations Manager",
//           followers: "3,291 followers",
//           avatar: null,
//           verified: true,
//         },
//         content:
//           "Implementing our new mental health initiative has been a game-changer. 78% of employees have used our wellness resources in just 3 months.\n\nInvesting in people's wellbeing isn't just good ethics—it's good business. 💼✨",
//         likes: 267,
//         comments: 31,
//         reposts: 19,
//         timeAgo: "6h",
//         image: null,
//       },
//     ]
//     setPosts(mockPosts)

//     // Fetch tip of the day on component mount
//     fetchTipOfTheDay()
//   }, [])

//   const handleLike = (postId) => {
//     setPosts(posts.map((post) => (post.id === postId ? { ...post, likes: post.likes + 1 } : post)))
//   }

//   const handleNewPost = () => {
//     if (newPost.trim()) {
//       const post = {
//         id: Date.now(),
//         author: {
//           name: "You",
//           title: "HR Professional",
//           followers: "500+ connections",
//           avatar: null,
//           verified: false,
//         },
//         content: newPost,
//         likes: 0,
//         comments: 0,
//         reposts: 0,
//         timeAgo: "now",
//       }
//       setPosts([post, ...posts])
//       setNewPost("")
//       setShowNewPost(false)
//     }
//   }

//   const PostCard = ({ post }) => (
//     <div className="bg-white rounded-lg shadow-sm border border-gray-300 mb-4">
//       {/* Post Header */}
//       <div className="p-3 flex items-start justify-between">
//         <div className="flex items-start space-x-2">
//           <div className="w-12 h-12 bg-gray-300 rounded-full flex-shrink-0"></div>
//           <div className="flex-1 min-w-0">
//             <div className="flex items-center space-x-1">
//               <h4 className="font-semibold text-gray-900 text-sm hover:text-blue-600 hover:underline cursor-pointer truncate">
//                 {post.author.name}
//               </h4>
//               <span className="text-gray-500 text-sm">•</span>
//               <span className="text-gray-500 text-sm">1st</span>
//             </div>
//             <p className="text-xs text-gray-600 truncate">{post.author.title}</p>
//             <p className="text-xs text-gray-500">{post.timeAgo} • 🌐</p>
//           </div>
//         </div>
//         <div className="flex items-center space-x-2 flex-shrink-0">
//           <button className="text-blue-600 text-sm font-semibold hover:bg-blue-50 px-3 py-1 rounded hidden sm:block">
//             + Follow
//           </button>
//           <button className="text-gray-400 hover:text-gray-600 p-1">
//             <MoreHorizontal size={16} />
//           </button>
//         </div>
//       </div>

//       {/* Post Content */}
//       <div className="px-3 pb-2">
//         <p className="text-sm text-gray-900 leading-relaxed whitespace-pre-line">{post.content}</p>
//       </div>

//       {/* Engagement Stats */}
//       <div className="px-3 py-2 text-xs text-gray-500 border-b border-gray-200">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center space-x-1">
//             <div className="flex items-center space-x-1">
//               <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
//                 <ThumbsUp className="w-2.5 h-2.5 text-white" />
//               </div>
//               <span>{post.likes}</span>
//             </div>
//           </div>
//           <div className="flex items-center space-x-3">
//             <span className="hidden sm:inline">{post.comments} comments</span>
//             <span className="sm:hidden">{post.comments}</span>
//             <span className="hidden sm:inline">{post.reposts} reposts</span>
//             <span className="sm:hidden">{post.reposts}</span>
//           </div>
//         </div>
//       </div>

//       {/* Post Actions */}
//       <div className="px-2 py-1">
//         <div className="flex items-center justify-between">
//           <button
//             onClick={() => handleLike(post.id)}
//             className="flex items-center justify-center space-x-1 text-gray-600 hover:bg-gray-100 rounded px-2 sm:px-3 py-2 text-sm font-semibold flex-1"
//           >
//             <ThumbsUp size={16} />
//             <span className="hidden sm:inline">Like</span>
//           </button>
//           <button className="flex items-center justify-center space-x-1 text-gray-600 hover:bg-gray-100 rounded px-2 sm:px-3 py-2 text-sm font-semibold flex-1">
//             <MessageCircle size={16} />
//             <span className="hidden sm:inline">Comment</span>
//           </button>
//           <button className="flex items-center justify-center space-x-1 text-gray-600 hover:bg-gray-100 rounded px-2 sm:px-3 py-2 text-sm font-semibold flex-1">
//             <Repeat2 size={16} />
//             <span className="hidden sm:inline">Repost</span>
//           </button>
//           <button className="flex items-center justify-center space-x-1 text-gray-600 hover:bg-gray-100 rounded px-2 sm:px-3 py-2 text-sm font-semibold flex-1">
//             <Send size={16} />
//             <span className="hidden sm:inline">Send</span>
//           </button>
//         </div>
//       </div>
//     </div>
//   )

//   // Mobile Navigation Menu
//   const MobileMenu = () => (
//     <div className={`fixed inset-0 z-50 lg:hidden ${showMobileMenu ? "block" : "hidden"}`}>
//       <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setShowMobileMenu(false)}></div>
//       <div className="fixed left-0 top-0 h-full w-80 bg-white shadow-lg">
//         <div className="p-4 border-b border-gray-200">
//           <div className="flex items-center justify-between">
//             <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
//             <button onClick={() => setShowMobileMenu(false)} className="text-gray-500">
//               <X size={24} />
//             </button>
//           </div>
//         </div>

//         {/* Profile Section */}
//         <div className="p-4 border-b border-gray-200">
//           <div className="flex items-center space-x-3">
//             <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
//             <div>
//               <h3 className="font-semibold text-gray-900">HR Professional</h3>
//               <p className="text-sm text-gray-600">HR Specialist</p>
//             </div>
//           </div>
//         </div>

//         {/* Navigation Items */}
//         <div className="p-4 space-y-2">
//           <div className="flex items-center space-x-3 p-3 hover:bg-gray-100 rounded cursor-pointer">
//             <Users size={20} />
//             <span>HR Innovation Group</span>
//           </div>
//           <div className="flex items-center space-x-3 p-3 hover:bg-gray-100 rounded cursor-pointer">
//             <Users size={20} />
//             <span>Talent Acquisition Network</span>
//           </div>
//           <div className="flex items-center space-x-3 p-3 hover:bg-gray-100 rounded cursor-pointer">
//             <Users size={20} />
//             <span>People Operations</span>
//           </div>
//         </div>

//         {/* HR News Section */}
//         <div className="p-4 border-t border-gray-200">
//           <h3 className="text-sm font-semibold text-gray-900 mb-3">HR News</h3>
//           <div className="space-y-3">
//             <div className="cursor-pointer">
//               <h4 className="text-sm font-medium text-gray-900">Remote work policies evolving</h4>
//               <p className="text-xs text-gray-600 mt-1">2h ago • 1,247 readers</p>
//             </div>
//             <div className="cursor-pointer">
//               <h4 className="text-sm font-medium text-gray-900">AI in recruitment trending</h4>
//               <p className="text-xs text-gray-600 mt-1">4h ago • 892 readers</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )

//   return (
//     <>
//       <LinkedInNavigation />
//       <div className="min-h-screen w-full bg-gray-50">
//         <MobileMenu />

//         {/* Main Content */}
//         <div className="max-w-6xl mx-auto px-2 sm:px-4 py-4 lg:py-6">
//           <div className="grid grid-cols-12 gap-4 lg:gap-6">
//             {/* Left Sidebar - Sticky Position */}
//             <div className="hidden lg:block lg:col-span-3">
//               <div className="sticky top-20 space-y-4">
//                 {/* Profile Card */}
//                 <div className="bg-white rounded-lg shadow-sm border border-gray-300">
//                   <div className="h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-t-lg"></div>
//                   <div className="px-4 pb-4 -mt-8">
//                     <div className="w-16 h-16 bg-gray-300 rounded-full border-4 border-white overflow-hidden mb-2">
//                      <img src="/image.png" className="w-full h-full object-cover" alt="Profile" />
//                       </div>

//                     <h3 className="font-semibold text-gray-900 hover:text-blue-600 cursor-pointer">
//                       Welcome, HR Professional!
//                     </h3>
//                     <p className="text-xs text-gray-600 mb-3">HR Specialist</p>
//                   </div>
//                   <div className="border-t border-gray-200 px-4 py-3">
//                     <div className="flex justify-between items-center text-xs text-gray-600 mb-2">
//                       <span>Profile viewers</span>
//                       <span className="text-blue-600 font-semibold">12</span>
//                     </div>
//                     <div className="flex justify-between items-center text-xs text-gray-600">
//                       <span>Post impressions</span>
//                       <span className="text-blue-600 font-semibold">1,247</span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Tip of the Day */}
//                 <div className="bg-white rounded-lg shadow-sm border border-gray-300">
//                   <div className="p-3 border-b border-gray-200">
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center space-x-2">
//                         <Lightbulb size={16} className="text-yellow-500" />
//                         <h3 className="text-sm font-semibold text-gray-900">Tip of the Day</h3>
//                       </div>
//                       <button
//                         onClick={fetchTipOfTheDay}
//                         disabled={isLoadingTip}
//                         className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
//                       >
//                         <RefreshCw size={14} className={isLoadingTip ? "animate-spin" : ""} />
//                       </button>
//                     </div>
//                   </div>
//                   <div className="p-3">
//                     {isLoadingTip ? (
//                       <div className="animate-pulse">
//                         <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
//                         <div className="h-3 bg-gray-200 rounded w-full mb-1"></div>
//                         <div className="h-3 bg-gray-200 rounded w-5/6"></div>
//                       </div>
//                     ) : tipOfTheDay ? (
//                       <div>
//                         <div className="flex items-center justify-between mb-2">
//                           <h4 className="text-sm font-medium text-gray-900">{tipOfTheDay.title}</h4>
//                           <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
//                             {tipOfTheDay.category}
//                           </span>
//                         </div>
//                         <p className="text-xs text-gray-600 leading-relaxed mb-2">{tipOfTheDay.content}</p>
//                         {tipOfTheDay.author && <p className="text-xs text-gray-500 italic">— {tipOfTheDay.author}</p>}
//                       </div>
//                     ) : (
//                       <p className="text-xs text-gray-500">Unable to load tip</p>
//                     )}
//                   </div>
//                 </div>

//                 {/* Upcoming Events Calendar */}
//                 <div className="bg-white rounded-lg shadow-sm border border-gray-300">
//                   <div className="p-3 border-b border-gray-200">
//                     <div className="flex items-center space-x-2">
//                       <CalendarDays size={16} className="text-blue-500" />
//                       <h3 className="text-sm font-semibold text-gray-900">Upcoming Events</h3>
//                     </div>
//                   </div>
//                   <div className="p-3 space-y-3">
//                     {upcomingEvents.slice(0, 3).map((event) => (
//                       <div
//                         key={event.id}
//                         className="border-l-4 border-blue-500 pl-3 hover:bg-gray-50 cursor-pointer rounded-r transition-colors"
//                       >
//                         <div className="flex items-start justify-between">
//                           <div className="flex-1 min-w-0">
//                             <h4 className="text-sm font-medium text-gray-900 truncate">{event.title}</h4>
//                             <div className="flex items-center space-x-2 mt-1">
//                               <div className="flex items-center space-x-1">
//                                 <Calendar size={10} className="text-gray-400" />
//                                 <span className="text-xs text-gray-600">{formatEventDate(event.date)}</span>
//                               </div>
//                               <div className="flex items-center space-x-1">
//                                 <Clock size={10} className="text-gray-400" />
//                                 <span className="text-xs text-gray-600">{event.time}</span>
//                               </div>
//                             </div>
//                             <div className="flex items-center justify-between mt-2">
//                               <div className="flex items-center space-x-1">
//                                 <MapPin size={10} className="text-gray-400" />
//                                 <span className="text-xs text-gray-500 truncate">{event.location}</span>
//                               </div>
//                               <span className={`text-xs px-2 py-1 rounded-full ${getEventTypeColor(event.type)}`}>
//                                 {event.type}
//                               </span>
//                             </div>
//                           </div>
//                         </div>
//                         <div className="flex items-center justify-between mt-2">
//                           <span className="text-xs text-gray-500">{event.attendees} attending</span>
//                           <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">
//                             View Details
//                           </button>
//                         </div>
//                       </div>
//                     ))}
//                     {upcomingEvents.length > 3 && (
//                       <div className="text-center pt-2">
//                         <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">
//                           View all events ({upcomingEvents.length})
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Main Feed - Full width on mobile, 6 columns on desktop */}
//             <div className="col-span-12 lg:col-span-6">
//               {/* New Post */}
//               <div className="bg-white rounded-lg shadow-sm border border-gray-300 mb-4">
//                 <div className="p-4">
//                   <div className="flex items-center space-x-3">
//                     <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
//                     <button
//                       onClick={() => setShowNewPost(!showNewPost)}
//                       className="flex-1 text-left px-4 py-3 border border-gray-300 rounded-full text-gray-600 hover:bg-gray-50 text-sm"
//                     >
//                       Start a post
//                     </button>
//                   </div>
//                   <div className="flex items-center justify-between mt-3 px-1 sm:px-3">
//                     <button className="flex items-center space-x-2 text-gray-600 hover:bg-gray-100 px-2 sm:px-3 py-2 rounded text-xs sm:text-sm">
//                       <div className="w-4 h-4 sm:w-5 sm:h-5 bg-blue-500 rounded"></div>
//                       <span className="hidden sm:inline">Photo</span>
//                     </button>
//                     <button className="flex items-center space-x-2 text-gray-600 hover:bg-gray-100 px-2 sm:px-3 py-2 rounded text-xs sm:text-sm">
//                       <div className="w-4 h-4 sm:w-5 sm:h-5 bg-green-500 rounded"></div>
//                       <span className="hidden sm:inline">Video</span>
//                     </button>
//                     <button className="flex items-center space-x-2 text-gray-600 hover:bg-gray-100 px-2 sm:px-3 py-2 rounded text-xs sm:text-sm">
//                       <div className="w-4 h-4 sm:w-5 sm:h-5 bg-orange-500 rounded"></div>
//                       <span className="hidden sm:inline">Event</span>
//                     </button>
//                     <button className="flex items-center space-x-2 text-gray-600 hover:bg-gray-100 px-2 sm:px-3 py-2 rounded text-xs sm:text-sm">
//                       <div className="w-4 h-4 sm:w-5 sm:h-5 bg-red-500 rounded"></div>
//                       <span className="hidden sm:inline">Article</span>
//                     </button>
//                   </div>
//                 </div>
//               </div>

//               {/* New Post Modal */}
//               {showNewPost && (
//                 <div className="bg-white rounded-lg shadow-sm border border-gray-300 mb-4">
//                   <div className="p-4 border-b border-gray-200">
//                     <div className="flex items-center justify-between">
//                       <h3 className="font-semibold text-gray-900">Create a post</h3>
//                       <button onClick={() => setShowNewPost(false)} className="text-gray-400 hover:text-gray-600">
//                         <X size={20} />
//                       </button>
//                     </div>
//                   </div>
//                   <div className="p-4">
//                     <div className="flex items-start space-x-3">
//                       <div className="w-12 h-12 bg-gray-300 rounded-full flex-shrink-0"></div>
//                       <div className="flex-1">
//                         <textarea
//                           value={newPost}
//                           onChange={(e) => setNewPost(e.target.value)}
//                           placeholder="What do you want to talk about?"
//                           className="w-full p-3 border-none resize-none focus:outline-none text-sm"
//                           rows="3"
//                         />
//                         <div className="flex justify-end mt-3">
//                           <button
//                             onClick={handleNewPost}
//                             disabled={!newPost.trim()}
//                             className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors text-sm font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed"
//                           >
//                             Post
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {/* Posts */}
//               <div>
//                 {posts.map((post) => (
//                   <PostCard key={post.id} post={post} />
//                 ))}
//               </div>
//             </div>

//             {/* Right Sidebar - Sticky Position */}
//             <div className="hidden lg:block lg:col-span-3">
//               <div className="sticky top-20 space-y-4">
//                 {/* LinkedIn News */}
//                 <div className="bg-white rounded-lg shadow-sm border border-gray-300">
//                   <div className="p-3 border-b border-gray-200">
//                     <h3 className="text-sm font-semibold text-gray-900">HR News</h3>
//                   </div>
//                   <div className="p-3 space-y-3">
//                     <div className="cursor-pointer hover:bg-gray-50 p-2 rounded">
//                       <h4 className="text-sm font-medium text-gray-900">Remote work policies evolving</h4>
//                       <p className="text-xs text-gray-600 mt-1">2h ago • 1,247 readers</p>
//                     </div>
//                     <div className="cursor-pointer hover:bg-gray-50 p-2 rounded">
//                       <h4 className="text-sm font-medium text-gray-900">AI in recruitment trending</h4>
//                       <p className="text-xs text-gray-600 mt-1">4h ago • 892 readers</p>
//                     </div>
//                     <div className="cursor-pointer hover:bg-gray-50 p-2 rounded">
//                       <h4 className="text-sm font-medium text-gray-900">Employee wellness programs</h4>
//                       <p className="text-xs text-gray-600 mt-1">6h ago • 1,456 readers</p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* People You May Know */}
//                 <div className="bg-white rounded-lg shadow-sm border border-gray-300">
//                   <div className="p-3 border-b border-gray-200">
//                     <h3 className="text-sm font-semibold text-gray-900">People you may know</h3>
//                   </div>
//                   <div className="p-3 space-y-3">
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center space-x-2">
//                         <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
//                         <div>
//                           <h4 className="text-sm font-medium text-gray-900">Jennifer Smith</h4>
//                           <p className="text-xs text-gray-600">HR Manager</p>
//                         </div>
//                       </div>
//                       <button className="text-blue-600 border border-blue-600 px-3 py-1 rounded text-xs font-semibold hover:bg-blue-50">
//                         Connect
//                       </button>
//                     </div>
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center space-x-2">
//                         <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
//                         <div>
//                           <h4 className="text-sm font-medium text-gray-900">David Lee</h4>
//                           <p className="text-xs text-gray-600">Talent Director</p>
//                         </div>
//                       </div>
//                       <button className="text-blue-600 border border-blue-600 px-3 py-1 rounded text-xs font-semibold hover:bg-blue-50">
//                         Connect
//                       </button>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Email Preview Section */}
//                 <div className="bg-white rounded-lg shadow-sm border border-gray-300">
//                   <div className="p-3 border-b border-gray-200">
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center space-x-2">
//                         <Mail size={16} className="text-blue-500" />
//                         <h3 className="text-sm font-semibold text-gray-900">Recent Emails</h3>
//                       </div>
//                       <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">View All</button>
//                     </div>
//                   </div>
//                   <div className="p-3 space-y-3">
//                     {recentEmails.map((email) => (
//                       <div
//                         key={email.id}
//                         className={`border-l-4 ${getPriorityColor(email.priority)} pl-3 hover:bg-gray-50 cursor-pointer rounded-r transition-colors ${!email.isRead ? "bg-blue-50" : ""}`}
//                       >
//                         <div className="flex items-start justify-between">
//                           <div className="flex-1 min-w-0">
//                             <div className="flex items-center space-x-2 mb-1">
//                               <h4
//                                 className={`text-sm ${!email.isRead ? "font-semibold text-gray-900" : "font-medium text-gray-700"} truncate`}
//                               >
//                                 {email.sender}
//                               </h4>
//                               {email.hasAttachment && <Paperclip size={10} className="text-gray-400 flex-shrink-0" />}
//                               {email.priority === "high" && <Star size={10} className="text-red-500 flex-shrink-0" />}
//                             </div>
//                             <p
//                               className={`text-xs ${!email.isRead ? "font-medium text-gray-800" : "text-gray-600"} truncate mb-1`}
//                             >
//                               {email.subject}
//                             </p>
//                             <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 mb-2">{email.preview}</p>
//                             <div className="flex items-center justify-between">
//                               <span className="text-xs text-gray-400">{email.time}</span>
//                               <div className="flex items-center space-x-1">
//                                 <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">Reply</button>
//                                 <span className="text-gray-300">•</span>
//                                 <button className="text-xs text-gray-500 hover:text-gray-700">
//                                   <Archive size={10} />
//                                 </button>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                   <div className="border-t border-gray-200 p-3">
//                     <button className="w-full text-xs text-blue-600 hover:text-blue-800 font-medium text-center">
//                       Open Email Client
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Add bottom padding to prevent content from being hidden behind mobile nav */}
//         <div className="lg:hidden h-16"></div>
//       </div>
//     </>
//   )
// }

// export default HRPeersDashboard
// "use client"
// import LinkedInNavigation from './LinkedlnNavigation'
// import { useState } from "react"
// import {
//   Heart,
//   MessageCircle,
//   Share2,
//   Search,
//   Home,
//   User,
//   Settings,
//   Bell,
//   MoreHorizontal,
//   Image,
//   Video,
//   Calendar,
//   Bookmark,
//   Send,
//   X,
// } from "lucide-react"

// export default function Dashboard() {

//   const [isSearchExpanded, setIsSearchExpanded] = useState(false)
//   const [newPost, setNewPost] = useState("")
//   const [searchQuery, setSearchQuery] = useState("")
//   const [activeTab, setActiveTab] = useState("home")
//   const [showComments, setShowComments] = useState({})
//   const [newComment, setNewComment] = useState({})
//   const [notifications, setNotifications] = useState([
//     { id: 1, text: "Sarah Johnson liked your post", time: "5m", read: false },
//     { id: 2, text: "New follower: Mike Chen", time: "1h", read: false },
//     { id: 3, text: "You have 3 new messages", time: "2h", read: true },
//   ])
//   const [showNotifications, setShowNotifications] = useState(false)

//   const [posts, setPosts] = useState([
//     {
//       id: 1,
//       author: "Sarah Johnson",
//       avatar: "/placeholder.svg?height=40&width=40",
//       time: "2h",
//       content:
//         "Just finished an amazing project with my team! The collaboration and creativity that went into this was incredible. Grateful to work with such talented people. 🚀",
//       likes: 24,
//       comments: [
//         { id: 1, author: "Mike Chen", content: "Congratulations! Great work!", time: "1h" },
//         { id: 2, author: "Emily Rodriguez", content: "So inspiring! 🎉", time: "30m" }
//       ],
//       shares: 3,
//       liked: false,
//       bookmarked: false,
//     },
//     {
//       id: 2,
//       author: "Mike Chen",
//       avatar: "/placeholder.svg?height=40&width=40",
//       time: "4h",
//       content:
//         "Sharing some insights from today's conference on digital transformation. The future of work is evolving rapidly, and it's exciting to be part of this journey.",
//       likes: 42,
//       comments: [
//         { id: 1, author: "John Doe", content: "Thanks for sharing these insights!", time: "2h" }
//       ],
//       shares: 7,
//       liked: true,
//       bookmarked: false,
//     },
//     {
//       id: 3,
//       author: "Emily Rodriguez",
//       avatar: "/placeholder.svg?height=40&width=40",
//       time: "6h",
//       content:
//         "Celebrating a major milestone today! Our startup just reached 10k users. Thank you to everyone who believed in our vision from day one. 🎉",
//       likes: 89,
//       comments: [
//         { id: 1, author: "Sarah Johnson", content: "Amazing achievement! Congratulations! 🚀", time: "4h" },
//         { id: 2, author: "Mike Chen", content: "Incredible milestone! Well deserved success.", time: "3h" }
//       ],
//       shares: 12,
//       liked: false,
//       bookmarked: true,
//     },
//   ])

//   const quickActions = [
//     { icon: Home, label: "Home", color: "bg-blue-500", id: "home" },
//     { icon: User, label: "Profile", color: "bg-green-500", id: "profile" },
//     { icon: Settings, label: "Settings", color: "bg-purple-500", id: "settings" },
//     { icon: Bell, label: "Notifications", color: "bg-orange-500", id: "notifications" },
//   ]

//   const handlePost = () => {
//     if (newPost.trim()) {
//       const post = {
//         id: Date.now(),
//         author: "John Doe",
//         avatar: "/placeholder.svg?height=40&width=40",
//         time: "now",
//         content: newPost,
//         likes: 0,
//         comments: [],
//         shares: 0,
//         liked: false,
//         bookmarked: false,
//       }
//       setPosts([post, ...posts])
//       setNewPost("")
//     }
//   }

//   const handleLike = (postId) => {
//     setPosts(posts.map(post => 
//       post.id === postId 
//         ? { 
//             ...post, 
//             liked: !post.liked, 
//             likes: post.liked ? post.likes - 1 : post.likes + 1 
//           }
//         : post
//     ))
//   }

//   const handleBookmark = (postId) => {
//     setPosts(posts.map(post => 
//       post.id === postId 
//         ? { ...post, bookmarked: !post.bookmarked }
//         : post
//     ))
//   }

//   const handleShare = (postId) => {
//     setPosts(posts.map(post => 
//       post.id === postId 
//         ? { ...post, shares: post.shares + 1 }
//         : post
//     ))
//     // Simulate sharing
//     alert("Post shared successfully!")
//   }

//   const toggleComments = (postId) => {
//     setShowComments(prev => ({
//       ...prev,
//       [postId]: !prev[postId]
//     }))
//   }

//   const handleComment = (postId) => {
//     const comment = newComment[postId]
//     if (comment && comment.trim()) {
//       setPosts(posts.map(post => 
//         post.id === postId 
//           ? { 
//               ...post, 
//               comments: [...post.comments, {
//                 id: Date.now(),
//                 author: "John Doe",
//                 content: comment,
//                 time: "now"
//               }]
//             }
//           : post
//       ))
//       setNewComment(prev => ({ ...prev, [postId]: "" }))
//     }
//   }

//   const handleQuickAction = (actionId) => {
//     setActiveTab(actionId)
//     if (actionId === "notifications") {
//       setShowNotifications(true)
//     } else {
//       setShowNotifications(false)
//     }
//   }

//   const markNotificationAsRead = (notificationId) => {
//     setNotifications(notifications.map(notif => 
//       notif.id === notificationId ? { ...notif, read: true } : notif
//     ))
//   }

//   const filteredPosts = posts.filter(post => 
//     searchQuery === "" || 
//     post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     post.author.toLowerCase().includes(searchQuery.toLowerCase())
//   )

//   return (
//     <>
//     <LinkedInNavigation/>
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
//       {/* Geometric Background Elements */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200 rounded-full opacity-20 blur-xl"></div>
//         <div className="absolute top-40 right-20 w-24 h-24 bg-purple-200 rounded-full opacity-30 blur-lg"></div>
//         <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-blue-100 rounded-full opacity-25 blur-2xl"></div>
//         <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-purple-100 rounded-full opacity-20 blur-xl"></div>
//       </div>

//       {/* Notifications Overlay */}
//       {showNotifications && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
//           <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 max-h-[80vh] overflow-y-auto">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-xl font-bold">Notifications</h3>
//               <button 
//                 onClick={() => setShowNotifications(false)}
//                 className="text-gray-500 hover:text-gray-700"
//               >
//                 <X className="h-6 w-6" />
//               </button>
//             </div>
//             <div className="space-y-3">
//               {notifications.map(notification => (
//                 <div 
//                   key={notification.id}
//                   className={`p-3 rounded-lg cursor-pointer transition-colors ${
//                     notification.read ? 'bg-gray-50' : 'bg-blue-50'
//                   }`}
//                   onClick={() => markNotificationAsRead(notification.id)}
//                 >
//                   <p className={`text-sm ${notification.read ? 'text-gray-600' : 'text-gray-900 font-medium'}`}>
//                     {notification.text}
//                   </p>
//                   <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 max-w-7xl mx-auto">
//         {/* Left Side - Posts Section */}
//         <div className="lg:col-span-2 space-y-6">
//           {/* Search Bar */}
//           <div className="bg-white/80 backdrop-blur-sm border-0 shadow-lg rounded-lg p-4">
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search posts and people..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded-lg border-0 focus:ring-2 focus:ring-blue-500 outline-none"
//               />
//             </div>
//           </div>

//           {/* Create Post Card */}
//           <div className="bg-white/80 backdrop-blur-sm border-0 shadow-lg rounded-lg">
//             <div className="p-6 pb-4">
//               <div className="flex items-center space-x-3">
//                 <div className="h-12 w-12 ring-2 ring-blue-100 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
//                   JD
//                 </div>
//                 <div className="flex-1">
//                   <textarea
//                     placeholder="What's on your mind?"
//                     value={newPost}
//                     onChange={(e) => setNewPost(e.target.value)}
//                     className="w-full min-h-[60px] border-0 bg-gray-50 resize-none focus:ring-2 focus:ring-blue-500 rounded-xl p-3 outline-none"
//                     onKeyDown={(e) => {
//                       if (e.key === 'Enter' && e.ctrlKey) {
//                         handlePost()
//                       }
//                     }}
//                   />
//                 </div>
//               </div>
//             </div>
//             <div className="px-6 pb-6">
//               <div className="flex items-center justify-between w-full">
//                 <div className="flex space-x-4">
//                   <button className="flex items-center px-2 py-1 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
//                     <Image className="h-4 w-4 mr-2" />
//                     Photo
//                   </button>
//                   <button className="flex items-center px-2 py-1 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
//                     <Video className="h-4 w-4 mr-2" />
//                     Video
//                   </button>
//                   <button className="flex items-center px-2 py-1 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
//                     <Calendar className="h-4 w-4 mr-2" />
//                     Event
//                   </button>
//                 </div>
//                 <button 
//                   onClick={handlePost}
//                   disabled={!newPost.trim()}
//                   className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-xl px-6 py-2 font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   Post
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Posts Feed */}
//           <div className="h-[600px] overflow-y-auto">
//             <div className="space-y-6">
//               {filteredPosts.map((post) => (
//                 <div
//                   key={post.id}
//                   className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg"
//                 >
//                   <div className="p-6 pb-4">
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center space-x-3">
//                         <div className="h-10 w-10 ring-2 ring-blue-100 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold text-sm">
//                           {post.author
//                             .split(" ")
//                             .map((n) => n[0])
//                             .join("")}
//                         </div>
//                         <div>
//                           <h4 className="font-semibold text-gray-900">{post.author}</h4>
//                           <p className="text-sm text-gray-500">{post.time} ago</p>
//                         </div>
//                       </div>
//                       <button className="p-1 hover:bg-gray-100 rounded-md transition-colors">
//                         <MoreHorizontal className="h-4 w-4" />
//                       </button>
//                     </div>
//                   </div>
//                   <div className="px-6 pb-4">
//                     <p className="text-gray-700 leading-relaxed">{post.content}</p>
//                   </div>
//                   <div className="px-6 pb-6">
//                     <div className="flex items-center justify-between w-full">
//                       <div className="flex space-x-6">
//                         <button 
//                           onClick={() => handleLike(post.id)}
//                           className={`flex items-center px-2 py-1 rounded-md transition-colors ${
//                             post.liked 
//                               ? 'text-red-500 bg-red-50' 
//                               : 'text-gray-600 hover:text-red-500 hover:bg-red-50'
//                           }`}
//                         >
//                           <Heart className={`h-4 w-4 mr-2 ${post.liked ? 'fill-current' : ''}`} />
//                           {post.likes}
//                         </button>
//                         <button 
//                           onClick={() => toggleComments(post.id)}
//                           className="flex items-center px-2 py-1 text-gray-600 hover:text-blue-500 hover:bg-blue-50 rounded-md transition-colors"
//                         >
//                           <MessageCircle className="h-4 w-4 mr-2" />
//                           {post.comments.length}
//                         </button>
//                         <button 
//                           onClick={() => handleShare(post.id)}
//                           className="flex items-center px-2 py-1 text-gray-600 hover:text-green-500 hover:bg-green-50 rounded-md transition-colors"
//                         >
//                           <Share2 className="h-4 w-4 mr-2" />
//                           {post.shares}
//                         </button>
//                       </div>
//                       <button 
//                         onClick={() => handleBookmark(post.id)}
//                         className={`p-2 rounded-md transition-colors ${
//                           post.bookmarked 
//                             ? 'text-yellow-500 bg-yellow-50' 
//                             : 'text-gray-600 hover:text-yellow-500 hover:bg-yellow-50'
//                         }`}
//                       >
//                         <Bookmark className={`h-4 w-4 ${post.bookmarked ? 'fill-current' : ''}`} />
//                       </button>
//                     </div>

//                     {/* Comments Section */}
//                     {showComments[post.id] && (
//                       <div className="mt-4 pt-4 border-t border-gray-100">
//                         <div className="space-y-3 mb-4">
//                           {post.comments.map((comment) => (
//                             <div key={comment.id} className="flex space-x-3">
//                               <div className="h-8 w-8 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white font-semibold text-xs">
//                                 {comment.author.split(" ").map(n => n[0]).join("")}
//                               </div>
//                               <div className="flex-1">
//                                 <div className="bg-gray-50 rounded-lg p-3">
//                                   <p className="font-medium text-sm text-gray-900">{comment.author}</p>
//                                   <p className="text-sm text-gray-700">{comment.content}</p>
//                                 </div>
//                                 <p className="text-xs text-gray-500 mt-1">{comment.time} ago</p>
//                               </div>
//                             </div>
//                           ))}
//                         </div>
//                         <div className="flex space-x-3">
//                           <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold text-xs">
//                             JD
//                           </div>
//                           <div className="flex-1 flex space-x-2">
//                             <input
//                               type="text"
//                               placeholder="Write a comment..."
//                               value={newComment[post.id] || ""}
//                               onChange={(e) => setNewComment(prev => ({ ...prev, [post.id]: e.target.value }))}
//                               className="flex-1 px-3 py-2 bg-gray-50 rounded-lg border-0 focus:ring-2 focus:ring-blue-500 outline-none text-sm"
//                               onKeyDown={(e) => {
//                                 if (e.key === 'Enter') {
//                                   handleComment(post.id)
//                                 }
//                               }}
//                             />
//                             <button
//                               onClick={() => handleComment(post.id)}
//                               className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
//                             >
//                               <Send className="h-4 w-4" />
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Right Side */}
//         <div className="space-y-6">
//           {/* Profile Section */}
//           <div className="bg-white/80 backdrop-blur-sm border-0 shadow-lg rounded-lg">
//             <div className="p-6 text-center">
//               <div className="h-24 w-24 mx-auto mb-4 ring-4 ring-blue-100 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold text-2xl">
//                 JD
//               </div>
//               <h3 className="font-bold text-xl text-gray-900 mb-1">John Doe</h3>
//               <p className="text-gray-600 mb-2">Senior Product Manager</p>
//               <p className="text-sm text-gray-500 mb-4">Building amazing products that users love</p>
//               <div className="flex justify-center space-x-4 text-sm">
//                 <div className="text-center">
//                   <div className="font-bold text-gray-900">1.2k</div>
//                   <div className="text-gray-500">Followers</div>
//                 </div>
//                 <div className="text-center">
//                   <div className="font-bold text-gray-900">856</div>
//                   <div className="text-gray-500">Following</div>
//                 </div>
//                 <div className="text-center">
//                   <div className="font-bold text-gray-900">{posts.length}</div>
//                   <div className="text-gray-500">Posts</div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Quick Actions with Expandable Search */}
//           <div className="relative">
//             <div className=" backdrop-blur-sm mt-60 border-0 rounded-lg p-6">
//               <div className="flex justify-end">
//                 <div className="relative">
//                   {/* Main Search Button */}
//                   <button
//                     className={`h-16 w-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center ${
//                       activeTab === 'search' ? 'ring-4 ring-blue-200' : ''
//                     }`}
//                     onMouseEnter={() => setIsSearchExpanded(true)}
//                     onMouseLeave={() => setIsSearchExpanded(false)}
//                     onClick={() => setActiveTab('search')}
//                   >
//                     <Search className="h-7 w-7" />
//                   </button>

//                   {/* Expandable Action Buttons */}
//                   <div
//                     className={`absolute bottom-0 m-10 right-0 transition-all duration-500 ease-out ${
//                       isSearchExpanded ? "opacity-100 scale-100" : "opacity-0 scale-75 pointer-events-none"
//                     }`}
//                   >
//                     {quickActions.map((action, index) => {
//                       // Calculate semi-circular positions
//                       const radius = 120
//                       const startAngle = Math.PI // Start from left (180 degrees)
//                       const endAngle = Math.PI / 2 // End at top (90 degrees)
//                       const angleStep = (startAngle - endAngle) / (quickActions.length - 1)
//                       const angle = startAngle - angleStep * index

//                       const x = Math.cos(angle) * radius
//                       const y = Math.sin(angle) * radius

//                       const unreadNotifications = notifications.filter(n => !n.read).length

//                       return (
//                         <button
//                           key={action.label}
//                           className={`absolute h-14 w-14 rounded-full ${action.color} hover:scale-110 text-white shadow-lg transition-all duration-300 flex items-center justify-center ${
//                             activeTab === action.id ? 'ring-4 ring-white' : ''
//                           }`}
//                           style={{
//                             transform: `translate(${x}px, ${-y}px)`,
//                             transitionDelay: `${index * 100}ms`,
//                           }}
//                           title={action.label}
//                           onClick={() => handleQuickAction(action.id)}
//                         >
//                           <action.icon className="h-6 w-6" />
//                           {action.id === 'notifications' && unreadNotifications > 0 && (
//                             <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
//                               {unreadNotifications}
//                             </span>
//                           )}
//                         </button>
//                       )
//                     })}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

          
//         </div>
//       </div>
//     </div>
//     </>

//   )
// }






// "use client"
// import { useState } from "react"
// import {
//   Heart,
//   MessageCircle,
//   Share2,
//   Search,
//   Home,
//   User,
//   Settings,
//   Bell,
//   MoreHorizontal,
//   Image,
//   Video,
//   Calendar,
//   Bookmark,
//   Send,
//   X,
// } from "lucide-react"

// export default function Dashboard() {
//   const [isSearchExpanded, setIsSearchExpanded] = useState(false)
//   const [newPost, setNewPost] = useState("")
//   const [searchQuery, setSearchQuery] = useState("")
//   const [activeTab, setActiveTab] = useState("home")
//   const [showComments, setShowComments] = useState({})
//   const [newComment, setNewComment] = useState({})
//   const [notifications, setNotifications] = useState([
//     { id: 1, text: "Sarah Johnson liked your post", time: "5m", read: false },
//     { id: 2, text: "New follower: Mike Chen", time: "1h", read: false },
//     { id: 3, text: "You have 3 new messages", time: "2h", read: true },
//   ])
//   const [showNotifications, setShowNotifications] = useState(false)

//   const [posts, setPosts] = useState([
//     {
//       id: 1,
//       author: "Sarah Johnson",
//       avatar: "/placeholder.svg?height=40&width=40",
//       time: "2h",
//       content:
//         "Just finished an amazing project with my team! The collaboration and creativity that went into this was incredible. Grateful to work with such talented people. 🚀",
//       likes: 24,
//       comments: [
//         { id: 1, author: "Mike Chen", content: "Congratulations! Great work!", time: "1h" },
//         { id: 2, author: "Emily Rodriguez", content: "So inspiring! 🎉", time: "30m" }
//       ],
//       shares: 3,
//       liked: false,
//       bookmarked: false,
//     },
//     {
//       id: 2,
//       author: "Mike Chen",
//       avatar: "/placeholder.svg?height=40&width=40",
//       time: "4h",
//       content:
//         "Sharing some insights from today's conference on digital transformation. The future of work is evolving rapidly, and it's exciting to be part of this journey.",
//       likes: 42,
//       comments: [
//         { id: 1, author: "John Doe", content: "Thanks for sharing these insights!", time: "2h" }
//       ],
//       shares: 7,
//       liked: true,
//       bookmarked: false,
//     },
//     {
//       id: 3,
//       author: "Emily Rodriguez",
//       avatar: "/placeholder.svg?height=40&width=40",
//       time: "6h",
//       content:
//         "Celebrating a major milestone today! Our startup just reached 10k users. Thank you to everyone who believed in our vision from day one. 🎉",
//       likes: 89,
//       comments: [
//         { id: 1, author: "Sarah Johnson", content: "Amazing achievement! Congratulations! 🚀", time: "4h" },
//         { id: 2, author: "Mike Chen", content: "Incredible milestone! Well deserved success.", time: "3h" }
//       ],
//       shares: 12,
//       liked: false,
//       bookmarked: true,
//     },
//   ])

//   const quickActions = [
//     { icon: Home, label: "Home", color: "bg-blue-500", id: "home" },
//     { icon: User, label: "Profile", color: "bg-green-500", id: "profile" },
//     { icon: Settings, label: "Settings", color: "bg-purple-500", id: "settings" },
//     { icon: Bell, label: "Notifications", color: "bg-orange-500", id: "notifications" },
//   ]

//   const handlePost = () => {
//     if (newPost.trim()) {
//       const post = {
//         id: Date.now(),
//         author: "John Doe",
//         avatar: "/placeholder.svg?height=40&width=40",
//         time: "now",
//         content: newPost,
//         likes: 0,
//         comments: [],
//         shares: 0,
//         liked: false,
//         bookmarked: false,
//       }
//       setPosts([post, ...posts])
//       setNewPost("")
//     }
//   }

//   const handleLike = (postId) => {
//     setPosts(posts.map(post => 
//       post.id === postId 
//         ? { 
//             ...post, 
//             liked: !post.liked, 
//             likes: post.liked ? post.likes - 1 : post.likes + 1 
//           }
//         : post
//     ))
//   }

//   const handleBookmark = (postId) => {
//     setPosts(posts.map(post => 
//       post.id === postId 
//         ? { ...post, bookmarked: !post.bookmarked }
//         : post
//     ))
//   }

//   const handleShare = (postId) => {
//     setPosts(posts.map(post => 
//       post.id === postId 
//         ? { ...post, shares: post.shares + 1 }
//         : post
//     ))
//     alert("Post shared successfully!")
//   }

//   const toggleComments = (postId) => {
//     setShowComments(prev => ({
//       ...prev,
//       [postId]: !prev[postId]
//     }))
//   }

//   const handleComment = (postId) => {
//     const comment = newComment[postId]
//     if (comment && comment.trim()) {
//       setPosts(posts.map(post => 
//         post.id === postId 
//           ? { 
//               ...post, 
//               comments: [...post.comments, {
//                 id: Date.now(),
//                 author: "John Doe",
//                 content: comment,
//                 time: "now"
//               }]
//             }
//           : post
//       ))
//       setNewComment(prev => ({ ...prev, [postId]: "" }))
//     }
//   }

//   const handleQuickAction = (actionId) => {
//     setActiveTab(actionId)
//     if (actionId === "notifications") {
//       setShowNotifications(true)
//     } else {
//       setShowNotifications(false)
//     }
//   }

//   const markNotificationAsRead = (notificationId) => {
//     setNotifications(notifications.map(notif => 
//       notif.id === notificationId ? { ...notif, read: true } : notif
//     ))
//   }

//   const filteredPosts = posts.filter(post => 
//     searchQuery === "" || 
//     post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     post.author.toLowerCase().includes(searchQuery.toLowerCase())
//   )

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 relative">
//       {/* Geometric Background Elements */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200 rounded-full opacity-20 blur-xl"></div>
//         <div className="absolute top-40 right-20 w-24 h-24 bg-purple-200 rounded-full opacity-30 blur-lg"></div>
//         <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-blue-100 rounded-full opacity-25 blur-2xl"></div>
//         <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-purple-100 rounded-full opacity-20 blur-xl"></div>
//       </div>

//       {/* Floating Search Icon in Corner */}
//       <div className="fixed bottom-6 right-6 z-40">
//         <div className="relative">
//           {/* Main Search Button */}
//           <button
//             className={`h-16 w-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center ${
//               activeTab === 'search' ? 'ring-4 ring-blue-200' : ''
//             }`}
//             onMouseEnter={() => setIsSearchExpanded(true)}
//             onMouseLeave={() => setIsSearchExpanded(false)}
//             onClick={() => setActiveTab('search')}
//           >
//             <Search className="h-7 w-7" />
//           </button>

//           {/* Expandable Action Buttons */}
//           <div
//             className={`absolute bottom-0 right-0 transition-all duration-500 ease-out p-5 ${
//               isSearchExpanded ? "opacity-100 m-8 scale-100" : "opacity-0 scale-75 pointer-events-none"
//             }`}
//           >
//             {quickActions.map((action, index) => {
//               // Calculate semi-circular positions
//               const radius = 120
//               const startAngle = Math.PI // Start from left (180 degrees)
//               const endAngle = Math.PI / 2 // End at top (90 degrees)
//               const angleStep = (startAngle - endAngle) / (quickActions.length - 1)
//               const angle = startAngle - angleStep * index

//               const x = Math.cos(angle) * radius
//               const y = Math.sin(angle) * radius

//               const unreadNotifications = notifications.filter(n => !n.read).length

//               return (
//                 <button
//                   key={action.label}
//                   className={`absolute h-14 w-14 rounded-full ${action.color} hover:scale-110 text-white shadow-lg transition-all duration-300 flex items-center justify-center ${
//                     activeTab === action.id ? 'ring-4 ring-white' : ''
//                   }`}
//                   style={{
//                     transform: `translate(${x}px, ${-y}px)`,
//                     transitionDelay: `${index * 100}ms`,
//                   }}
//                   title={action.label}
//                   onClick={() => handleQuickAction(action.id)}
//                 >
//                   <action.icon className="h-6 w-6" />
//                   {action.id === 'notifications' && unreadNotifications > 0 && (
//                     <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
//                       {unreadNotifications}
//                     </span>
//                   )}
//                 </button>
//               )
//             })}
//           </div>
//         </div>
//       </div>

//       {/* Notifications Overlay */}
//       {showNotifications && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
//           <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 max-h-[80vh] overflow-y-auto">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-xl font-bold">Notifications</h3>
//               <button 
//                 onClick={() => setShowNotifications(false)}
//                 className="text-gray-500 hover:text-gray-700"
//               >
//                 <X className="h-6 w-6" />
//               </button>
//             </div>
//             <div className="space-y-3">
//               {notifications.map(notification => (
//                 <div 
//                   key={notification.id}
//                   className={`p-3 rounded-lg cursor-pointer transition-colors ${
//                     notification.read ? 'bg-gray-50' : 'bg-blue-50'
//                   }`}
//                   onClick={() => markNotificationAsRead(notification.id)}
//                 >
//                   <p className={`text-sm ${notification.read ? 'text-gray-600' : 'text-gray-900 font-medium'}`}>
//                     {notification.text}
//                   </p>
//                   <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Main Content Layout */}
//       <div className="flex h-screen ">
//         {/* Left Side - Scrollable Posts Section */}
//         <div className="flex-1 overflow-y-auto justify-items-center  p-6 pr-">
//           <div className="space-y-6 max-w-2xl">
//             {/* Search Bar */}
//             <div className="bg-white/80 backdrop-blur-sm border-0 shadow-lg rounded-lg  p-4">
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder="Search posts and people..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded-lg border-0 focus:ring-2 focus:ring-blue-500 outline-none"
//                 />
//               </div>
//             </div>

//             {/* Create Post Card */}
//             <div className="bg-white/80 backdrop-blur-sm border-0 shadow-lg rounded-lg">
//               <div className="p-6 pb-4">
//                 <div className="flex items-center space-x-3">
//                   <div className="h-12 w-12 ring-2 ring-blue-100 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
//                     JD
//                   </div>
//                   <div className="flex-1">
//                     <textarea
//                       placeholder="What's on your mind?"
//                       value={newPost}
//                       onChange={(e) => setNewPost(e.target.value)}
//                       className="w-full min-h-[60px] border-0 bg-gray-50 resize-none focus:ring-2 focus:ring-blue-500 rounded-xl p-3 outline-none"
//                       onKeyDown={(e) => {
//                         if (e.key === 'Enter' && e.ctrlKey) {
//                           handlePost()
//                         }
//                       }}
//                     />
//                   </div>
//                 </div>
//               </div>
//               <div className="px-6 pb-6">
//                 <div className="flex items-center justify-between w-full">
//                   <div className="flex space-x-4">
//                     <button className="flex items-center px-2 py-1 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
//                       <Image className="h-4 w-4 mr-2" />
//                       Photo
//                     </button>
//                     <button className="flex items-center px-2 py-1 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
//                       <Video className="h-4 w-4 mr-2" />
//                       Video
//                     </button>
//                     <button className="flex items-center px-2 py-1 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
//                       <Calendar className="h-4 w-4 mr-2" />
//                       Event
//                     </button>
//                   </div>
//                   <button 
//                     onClick={handlePost}
//                     disabled={!newPost.trim()}
//                     className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-xl px-6 py-2 font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     Post
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Posts Feed */}
//             <div className="space-y-6">
//               {filteredPosts.map((post) => (
//                 <div
//                   key={post.id}
//                   className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg"
//                 >
//                   <div className="p-6 pb-4">
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center space-x-3">
//                         <div className="h-10 w-10 ring-2 ring-blue-100 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold text-sm">
//                           {post.author
//                             .split(" ")
//                             .map((n) => n[0])
//                             .join("")}
//                         </div>
//                         <div>
//                           <h4 className="font-semibold text-gray-900">{post.author}</h4>
//                           <p className="text-sm text-gray-500">{post.time} ago</p>
//                         </div>
//                       </div>
//                       <button className="p-1 hover:bg-gray-100 rounded-md transition-colors">
//                         <MoreHorizontal className="h-4 w-4" />
//                       </button>
//                     </div>
//                   </div>
//                   <div className="px-6 pb-4">
//                     <p className="text-gray-700 leading-relaxed">{post.content}</p>
//                   </div>
//                   <div className="px-6 pb-6">
//                     <div className="flex items-center justify-between w-full">
//                       <div className="flex space-x-6">
//                         <button 
//                           onClick={() => handleLike(post.id)}
//                           className={`flex items-center px-2 py-1 rounded-md transition-colors ${
//                             post.liked 
//                               ? 'text-red-500 bg-red-50' 
//                               : 'text-gray-600 hover:text-red-500 hover:bg-red-50'
//                           }`}
//                         >
//                           <Heart className={`h-4 w-4 mr-2 ${post.liked ? 'fill-current' : ''}`} />
//                           {post.likes}
//                         </button>
//                         <button 
//                           onClick={() => toggleComments(post.id)}
//                           className="flex items-center px-2 py-1 text-gray-600 hover:text-blue-500 hover:bg-blue-50 rounded-md transition-colors"
//                         >
//                           <MessageCircle className="h-4 w-4 mr-2" />
//                           {post.comments.length}
//                         </button>
//                         <button 
//                           onClick={() => handleShare(post.id)}
//                           className="flex items-center px-2 py-1 text-gray-600 hover:text-green-500 hover:bg-green-50 rounded-md transition-colors"
//                         >
//                           <Share2 className="h-4 w-4 mr-2" />
//                           {post.shares}
//                         </button>
//                       </div>
//                       <button 
//                         onClick={() => handleBookmark(post.id)}
//                         className={`p-2 rounded-md transition-colors ${
//                           post.bookmarked 
//                             ? 'text-yellow-500 bg-yellow-50' 
//                             : 'text-gray-600 hover:text-yellow-500 hover:bg-yellow-50'
//                         }`}
//                       >
//                         <Bookmark className={`h-4 w-4 ${post.bookmarked ? 'fill-current' : ''}`} />
//                       </button>
//                     </div>

//                     {/* Comments Section */}
//                     {showComments[post.id] && (
//                       <div className="mt-4 pt-4 border-t border-gray-100">
//                         <div className="space-y-3 mb-4">
//                           {post.comments.map((comment) => (
//                             <div key={comment.id} className="flex space-x-3">
//                               <div className="h-8 w-8 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white font-semibold text-xs">
//                                 {comment.author.split(" ").map(n => n[0]).join("")}
//                               </div>
//                               <div className="flex-1">
//                                 <div className="bg-gray-50 rounded-lg p-3">
//                                   <p className="font-medium text-sm text-gray-900">{comment.author}</p>
//                                   <p className="text-sm text-gray-700">{comment.content}</p>
//                                 </div>
//                                 <p className="text-xs text-gray-500 mt-1">{comment.time} ago</p>
//                               </div>
//                             </div>
//                           ))}
//                         </div>
//                         <div className="flex space-x-3">
//                           <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold text-xs">
//                             JD
//                           </div>
//                           <div className="flex-1 flex space-x-2">
//                             <input
//                               type="text"
//                               placeholder="Write a comment..."
//                               value={newComment[post.id] || ""}
//                               onChange={(e) => setNewComment(prev => ({ ...prev, [post.id]: e.target.value }))}
//                               className="flex-1 px-3 py-2 bg-gray-50 rounded-lg border-0 focus:ring-2 focus:ring-blue-500 outline-none text-sm"
//                               onKeyDown={(e) => {
//                                 if (e.key === 'Enter') {
//                                   handleComment(post.id)
//                                 }
//                               }}
//                             />
//                             <button
//                               onClick={() => handleComment(post.id)}
//                               className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
//                             >
//                               <Send className="h-4 w-4" />
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Right Side - Static Profile Section */}
//         <div className="w-80 p-6 pl-3">
//           <div className="sticky top-6">
//             <div className="bg-white/80 backdrop-blur-sm border-0 shadow-lg rounded-lg">
//               <div className="p-6 text-center">
//                 <div className="h-24 w-24 mx-auto mb-4 ring-4 ring-blue-100 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold text-2xl">
//                   JD
//                 </div>
//                 <h3 className="font-bold text-xl text-gray-900 mb-1">John Doe</h3>
//                 <p className="text-gray-600 mb-2">Senior Product Manager</p>
//                 <p className="text-sm text-gray-500 mb-4">Building amazing products that users love</p>
//                 <div className="flex justify-center space-x-4 text-sm">
//                   <div className="text-center">
//                     <div className="font-bold text-gray-900">1.2k</div>
//                     <div className="text-gray-500">Followers</div>
//                   </div>
//                   <div className="text-center">
//                     <div className="font-bold text-gray-900">856</div>
//                     <div className="text-gray-500">Following</div>
//                   </div>
//                   <div className="text-center">
//                     <div className="font-bold text-gray-900">{posts.length}</div>
//                     <div className="text-gray-500">Posts</div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }



"use client"
import { useState } from "react"
import {
  Heart,
  MessageCircle,
  Share2,
  Search,
  Home,
  User,
  Settings,
  Bell,
  MoreHorizontal,
  Image,
  Video,
  Calendar,
  Bookmark,
  Send,
  X,
} from "lucide-react"
import LinkedInNavigation from "./LinkedlnNavigation"
// import { PostContext } from "./PostContext"
export default function Dashboard() {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false)
  const [newPost, setNewPost] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("home")
  const [showComments, setShowComments] = useState({})
  const [newComment, setNewComment] = useState({})
  const [notifications, setNotifications] = useState([
    { id: 1, text: "Sarah Johnson liked your post", time: "5m", read: false },
    { id: 2, text: "New follower: Mike Chen", time: "1h", read: false },
    { id: 3, text: "You have 3 new messages", time: "2h", read: true },
  ])
  const [showNotifications, setShowNotifications] = useState(false)
  // const { posts } = useContext(PostContext);
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      time: "2h",
      content:
        "Just finished an amazing project with my team! The collaboration and creativity that went into this was incredible. Grateful to work with such talented people. 🚀",
      likes: 24,
      comments: [
        { id: 1, author: "Mike Chen", content: "Congratulations! Great work!", time: "1h" },
        { id: 2, author: "Emily Rodriguez", content: "So inspiring! 🎉", time: "30m" }
      ],
      shares: 3,
      liked: false,
      bookmarked: false,
    },
    {
      id: 2,
      author: "Mike Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      time: "4h",
      content:
        "Sharing some insights from today's conference on digital transformation. The future of work is evolving rapidly, and it's exciting to be part of this journey.",
      likes: 42,
      comments: [
        { id: 1, author: "John Doe", content: "Thanks for sharing these insights!", time: "2h" }
      ],
      shares: 7,
      liked: true,
      bookmarked: false,
    },
    {
      id: 3,
      author: "Emily Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
      time: "6h",
      content:
        "Celebrating a major milestone today! Our startup just reached 10k users. Thank you to everyone who believed in our vision from day one. 🎉",
      likes: 89,
      comments: [
        { id: 1, author: "Sarah Johnson", content: "Amazing achievement! Congratulations! 🚀", time: "4h" },
        { id: 2, author: "Mike Chen", content: "Incredible milestone! Well deserved success.", time: "3h" }
      ],
      shares: 12,
      liked: false,
      bookmarked: true,
    },
  ])

  const quickActions = [
    { icon: Home, label: "Home", color: "bg-blue-500", id: "home" },
    { icon: User, label: "Profile", color: "bg-green-500", id: "profile" },
    { icon: Settings, label: "Settings", color: "bg-purple-500", id: "settings" },
    { icon: Bell, label: "Notifications", color: "bg-orange-500", id: "notifications" },
  ]

  const handlePost = () => {
    if (newPost.trim()) {
      const post = {
        id: Date.now(),
        author: "John Doe",
        avatar: "/placeholder.svg?height=40&width=40",
        time: "now",
        content: newPost,
        likes: 0,
        comments: [],
        shares: 0,
        liked: false,
        bookmarked: false,
      }
      setPosts([post, ...posts])
      setNewPost("")
    }
  }

  const handleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            liked: !post.liked, 
            likes: post.liked ? post.likes - 1 : post.likes + 1 
          }
        : post
    ))
  }

  const handleBookmark = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, bookmarked: !post.bookmarked }
        : post
    ))
  }

  const handleShare = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, shares: post.shares + 1 }
        : post
    ))
    alert("Post shared successfully!")
  }

  const toggleComments = (postId) => {
    setShowComments(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }))
  }

  const handleComment = (postId) => {
    const comment = newComment[postId]
    if (comment && comment.trim()) {
      setPosts(posts.map(post => 
        post.id === postId 
          ? { 
              ...post, 
              comments: [...post.comments, {
                id: Date.now(),
                author: "John Doe",
                content: comment,
                time: "now"
              }]
            }
          : post
      ))
      setNewComment(prev => ({ ...prev, [postId]: "" }))
    }
  }

  const handleQuickAction = (actionId) => {
    setActiveTab(actionId)
    if (actionId === "notifications") {
      setShowNotifications(true)
    } else {
      setShowNotifications(false)
    }
  }

  const markNotificationAsRead = (notificationId) => {
    setNotifications(notifications.map(notif => 
      notif.id === notificationId ? { ...notif, read: true } : notif
    ))
  }

  const filteredPosts = posts.filter(post => 
    searchQuery === "" || 
    post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.author.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <>
    <LinkedInNavigation/>
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 relative">
      {/* Geometric Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200 rounded-full opacity-20 blur-xl"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-purple-200 rounded-full opacity-30 blur-lg"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-blue-100 rounded-full opacity-25 blur-2xl"></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-purple-100 rounded-full opacity-20 blur-xl"></div>
      </div>

      {/* Floating Search Icon in Corner */}
      <div className="fixed bottom-6 right-6 z-40">
        <div className="relative">
          {/* Main Search Button */}
          <button
            className={`h-16 w-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center ${
              activeTab === 'search' ? 'ring-4 ring-blue-200' : ''
            }`}
            onMouseEnter={() => setIsSearchExpanded(true)}
            onMouseLeave={() => setIsSearchExpanded(false)}
            onClick={() => setActiveTab('search')}
          >
            <Search className="h-7 w-7" />
          </button>

          {/* Expandable Action Buttons */}
          <div
            className={`absolute bottom-0 right-0 transition-all duration-500 ease-out ${
              isSearchExpanded ? "opacity-100 m-8 scale-100" : "opacity-0 scale-75 pointer-events-none"
            }`}
            onMouseEnter={() => setIsSearchExpanded(true)}
            onMouseLeave={() => setIsSearchExpanded(false)}
          >
            {quickActions.map((action, index) => {
              // Calculate semi-circular positions
              const radius = 100
              const startAngle = Math.PI // Start from left (180 degrees)
              const endAngle = Math.PI / 2 // End at top (90 degrees)
              const angleStep = (startAngle - endAngle) / (quickActions.length - 1)
              const angle = startAngle - angleStep * index

              const x = Math.cos(angle) * radius
              const y = Math.sin(angle) * radius

              const unreadNotifications = notifications.filter(n => !n.read).length

              return (
                <button
                  key={action.label}
                  className={`absolute h-12 w-12 rounded-full ${action.color} hover:scale-110 text-white shadow-lg transition-all duration-300 flex items-center justify-center ${
                    activeTab === action.id ? 'ring-4 ring-white' : ''
                  }`}
                  style={{
                    transform: `translate(${x}px, ${-y}px)`,
                    transitionDelay: `${index * 100}ms`,
                  }}
                  title={action.label}
                  onClick={() => handleQuickAction(action.id)}
                >
                  <action.icon className="h-5 w-5" />
                  {action.id === 'notifications' && unreadNotifications > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {unreadNotifications}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Notifications Overlay */}
      {showNotifications && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Notifications</h3>
              <button 
                onClick={() => setShowNotifications(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="space-y-3">
              {notifications.map(notification => (
                <div 
                  key={notification.id}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    notification.read ? 'bg-gray-50' : 'bg-blue-50'
                  }`}
                  onClick={() => markNotificationAsRead(notification.id)}
                >
                  <p className={`text-sm ${notification.read ? 'text-gray-600' : 'text-gray-900 font-medium'}`}>
                    {notification.text}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Content Layout */}
      <div className="flex h-screen">
        {/* Left Side - Scrollable Posts Section */}
        <div className="flex-1 overflow-y-auto justify-items-center p-6 pr-3">
          <div className="space-y-6 max-w-2xl">
            {/* Search Bar */}
            <div className="bg-white/80 backdrop-blur-sm border-0 shadow-lg rounded-lg p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search posts and people..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded-lg border-0 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            {/* Create Post Card */}
            <div className="bg-white/80 backdrop-blur-sm border-0 shadow-lg rounded-lg">
              <div className="p-6 pb-4">
                <div className="flex items-center space-x-3">
                  <div className="h-12 w-12 ring-2 ring-blue-100 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                    JD
                  </div>
                  <div className="flex-1">
                    <textarea
                      placeholder="What's on your mind?"
                      value={newPost}
                      onChange={(e) => setNewPost(e.target.value)}
                      className="w-full min-h-[60px] border-0 bg-gray-50 resize-none focus:ring-2 focus:ring-blue-500 rounded-xl p-3 outline-none"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && e.ctrlKey) {
                          handlePost()
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="px-6 pb-6">
                <div className="flex items-center justify-between w-full">
                  <div className="flex space-x-4">
                    <button className="flex items-center px-2 py-1 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
                      <Image className="h-4 w-4 mr-2" />
                      Photo
                    </button>
                    <button className="flex items-center px-2 py-1 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
                      <Video className="h-4 w-4 mr-2" />
                      Video
                    </button>
                    <button className="flex items-center px-2 py-1 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
                      <Calendar className="h-4 w-4 mr-2" />
                      Event
                    </button>
                  </div>
                  <button 
                    onClick={handlePost}
                    disabled={!newPost.trim()}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-xl px-6 py-2 font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>

            {/* Posts Feed */}
            <div className="space-y-6">
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg"
                >
                  <div className="p-6 pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 ring-2 ring-blue-100 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold text-sm">
                          {post.author
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{post.author}</h4>
                          <p className="text-sm text-gray-500">{post.time} ago</p>
                        </div>
                      </div>
                      <button className="p-1 hover:bg-gray-100 rounded-md transition-colors">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="px-6 pb-4">
                    <p className="text-gray-700 leading-relaxed">{post.content}</p>
                  </div>
                  <div className="px-6 pb-6">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex space-x-6">
                        <button 
                          onClick={() => handleLike(post.id)}
                          className={`flex items-center px-2 py-1 rounded-md transition-colors ${
                            post.liked 
                              ? 'text-red-500 bg-red-50' 
                              : 'text-gray-600 hover:text-red-500 hover:bg-red-50'
                          }`}
                        >
                          <Heart className={`h-4 w-4 mr-2 ${post.liked ? 'fill-current' : ''}`} />
                          {post.likes}
                        </button>
                        <button 
                          onClick={() => toggleComments(post.id)}
                          className="flex items-center px-2 py-1 text-gray-600 hover:text-blue-500 hover:bg-blue-50 rounded-md transition-colors"
                        >
                          <MessageCircle className="h-4 w-4 mr-2" />
                          {post.comments.length}
                        </button>
                        <button 
                          onClick={() => handleShare(post.id)}
                          className="flex items-center px-2 py-1 text-gray-600 hover:text-green-500 hover:bg-green-50 rounded-md transition-colors"
                        >
                          <Share2 className="h-4 w-4 mr-2" />
                          {post.shares}
                        </button>
                      </div>
                      <button 
                        onClick={() => handleBookmark(post.id)}
                        className={`p-2 rounded-md transition-colors ${
                          post.bookmarked 
                            ? 'text-yellow-500 bg-yellow-50' 
                            : 'text-gray-600 hover:text-yellow-500 hover:bg-yellow-50'
                        }`}
                      >
                        <Bookmark className={`h-4 w-4 ${post.bookmarked ? 'fill-current' : ''}`} />
                      </button>
                    </div>

                    {/* Comments Section */}
                    {showComments[post.id] && (
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="space-y-3 mb-4">
                          {post.comments.map((comment) => (
                            <div key={comment.id} className="flex space-x-3">
                              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white font-semibold text-xs">
                                {comment.author.split(" ").map(n => n[0]).join("")}
                              </div>
                              <div className="flex-1">
                                <div className="bg-gray-50 rounded-lg p-3">
                                  <p className="font-medium text-sm text-gray-900">{comment.author}</p>
                                  <p className="text-sm text-gray-700">{comment.content}</p>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">{comment.time} ago</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="flex space-x-3">
                          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold text-xs">
                            JD
                          </div>
                          <div className="flex-1 flex space-x-2">
                            <input
                              type="text"
                              placeholder="Write a comment..."
                              value={newComment[post.id] || ""}
                              onChange={(e) => setNewComment(prev => ({ ...prev, [post.id]: e.target.value }))}
                              className="flex-1 px-3 py-2 bg-gray-50 rounded-lg border-0 focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  handleComment(post.id)
                                }
                              }}
                            />
                            <button
                              onClick={() => handleComment(post.id)}
                              className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                            >
                              <Send className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Static Profile Section */}
        <div className="w-80 p-6 pl-3">
          <div className="sticky top-6">
            <div className="bg-white/80 backdrop-blur-sm border-0 shadow-lg rounded-lg">
              <div className="p-6 text-center">
                <div className="h-24 w-24 mx-auto mb-4 ring-4 ring-blue-100 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold text-2xl">
                  JD
                </div>
                <h3 className="font-bold text-xl text-gray-900 mb-1">John Doe</h3>
                <p className="text-gray-600 mb-2">Senior Product Manager</p>
                <p className="text-sm text-gray-500 mb-4">Building amazing products that users love</p>
                <div className="flex justify-center space-x-4 text-sm">
                  <div className="text-center">
                    <div className="font-bold text-gray-900">1.2k</div>
                    <div className="text-gray-500">Followers</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-gray-900">856</div>
                    <div className="text-gray-500">Following</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-gray-900">{posts.length}</div>
                    <div className="text-gray-500">Posts</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>

  )
}