

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