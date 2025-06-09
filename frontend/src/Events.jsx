"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  Plus, Search, Calendar, MapPin, Users, MoreHorizontal, Bell, Navigation, Map, ExternalLink,
  Zap, Clock, Star, MessageCircle, Share2, Heart, Eye, Sparkles, FlameIcon as Fire, ArrowLeft, X
} from "lucide-react";
import LinkedInNavigation from "./LinkedlnNavigation";

const eventTemplates = [
  {
    titles: ["Coffee & Code", "Tech Meetup", "Startup Mixer", "Networking Brunch", "Coding Bootcamp", "AI Discussion", "Web Dev Workshop"],
    locations: ["Starbucks Downtown", "WeWork Hub", "Community Center", "Local Library", "Tech Incubator", "Coworking Space", "University Campus"],
    descriptions: ["Connect with fellow developers", "Learn new technologies", "Network with professionals", "Share your projects", "Collaborate on ideas"],
    categories: ["Professional", "Social", "Education"],
    organizers: ["TechHub", "DevCommunity", "StartupGroup", "CodeCafe", "InnovationLab"],
  },
  {
    titles: ["Food Truck Friday", "Farmers Market", "Live Music", "Art Gallery Opening", "Book Club", "Yoga in the Park", "Movie Night"],
    locations: ["Central Park", "Main Street", "Community Garden", "Local Brewery", "Art District", "Public Library", "Rooftop Terrace"],
    descriptions: ["Enjoy local cuisine", "Support local artists", "Relax and unwind", "Meet like-minded people", "Discover new experiences"],
    categories: ["Social", "Entertainment", "Health"],
    organizers: ["Community Events", "Local Artists", "Neighborhood Group", "Cultural Center", "Wellness Club"],
  },
  {
    titles: ["Business Workshop", "Investment Forum", "Entrepreneur Meetup", "Industry Conference", "Sales Training", "Leadership Summit"],
    locations: ["Business Center", "Conference Hall", "Executive Lounge", "Innovation Hub", "Corporate Campus", "Hotel Ballroom"],
    descriptions: ["Grow your business", "Learn from experts", "Expand your network", "Discover opportunities", "Develop new skills"],
    categories: ["Business", "Professional", "Education"],
    organizers: ["Business Council", "Entrepreneur Society", "Industry Leaders", "Chamber of Commerce", "Professional Association"],
  },
];

const LiveEventsApp = () => {
  const [events, setEvents] = useState([]);
  const [liveStats, setLiveStats] = useState({ totalEvents: 0, activeUsers: 0, newEventsToday: 0, totalRSVPs: 0 });
  const [recentActivity, setRecentActivity] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showMapView, setShowMapView] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [currentView, setCurrentView] = useState("events");
  const [filterDistance, setFilterDistance] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterTime, setFilterTime] = useState("all");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [newEvent, setNewEvent] = useState({
    title: "", date: "", time: "", location: "", description: "", organizer: "You", category: "Social", isPublic: true, tags: [],
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [isLiveMode, setIsLiveMode] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [trendingTopics, setTrendingTopics] = useState([]);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  const eventsRef = useRef([]);
  const isLiveModeRef = useRef(true);

  // PWA: Register service worker and handle offline status
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("Service Worker registered with scope:", registration.scope);
        })
        .catch((error) => {
          console.error("Service Worker registration failed:", error);
        });
    }

    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  useEffect(() => {
    eventsRef.current = events;
  }, [events]);

  useEffect(() => {
    isLiveModeRef.current = isLiveMode;
  }, [isLiveMode]);

  const generateRandomEvent = useCallback(() => {
    const template = eventTemplates[Math.floor(Math.random() * eventTemplates.length)];
    const now = new Date();
    const futureDate = new Date(now.getTime() + Math.random() * 7 * 24 * 60 * 60 * 1000);
    const event = {
      id: Date.now() + Math.random(),
      title: template.titles[Math.floor(Math.random() * template.titles.length)],
      date: futureDate.toISOString().split("T")[0],
      time: `${String(Math.floor(Math.random() * 12) + 9).padStart(2, "0")}:${Math.random() < 0.5 ? "00" : "30"}`,
      location: template.locations[Math.floor(Math.random() * template.locations.length)],
      description: template.descriptions[Math.floor(Math.random() * template.descriptions.length)],
      organizer: template.organizers[Math.floor(Math.random() * template.organizers.length)],
      category: template.categories[Math.floor(Math.random() * template.categories.length)],
      rsvpCount: Math.floor(Math.random() * 50) + 1,
      userRsvp: false,
      coordinates: { lat: 40.7128 + (Math.random() - 0.5) * 0.1, lng: -74.006 + (Math.random() - 0.5) * 0.1 },
      distance: Math.round((Math.random() * 5 + 0.1) * 10) / 10,
      placeId: `place_${Math.random().toString(36).substr(2, 9)}`,
      isPublic: true,
      createdAt: new Date(),
      isLive: Math.random() > 0.7,
      isHotEvent: Math.random() > 0.8,
      attendees: Math.floor(Math.random() * 10),
      views: Math.floor(Math.random() * 100) + 10,
      likes: Math.floor(Math.random() * 25),
      tags: [],
    };
    return event;
  }, []);

  // Initialize events and check location, load from cache if offline
  useEffect(() => {
    const loadEvents = async () => {
      let cachedEvents = [];
      if ("caches" in window) {
        const cache = await caches.open("eventpulse-cache");
        const cachedResponse = await cache.match("events-data");
        if (cachedResponse) {
          cachedEvents = await cachedResponse.json();
        }
      }

      const initialEvents = cachedEvents.length > 0 ? cachedEvents : Array.from({ length: 8 }, () => generateRandomEvent());
      setEvents(initialEvents);

      if ("caches" in window && !isOffline) {
        const cache = await caches.open("eventpulse-cache");
        await cache.put("events-data", new Response(JSON.stringify(initialEvents)));
      }

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const coords = { lat: position.coords.latitude, lng: position.coords.longitude };
            setUserLocation(coords);
            setLocationEnabled(true);
          },
          () => setLocationEnabled(false)
        );
      }
    };
    loadEvents();
  }, [generateRandomEvent, isOffline]);

  // Live mode intervals, pause if offline
  useEffect(() => {
    if (!isLiveMode || isOffline) return;

    const eventInterval = setInterval(() => {
      if (Math.random() > 0.3 && isLiveModeRef.current) {
        const newEvent = generateRandomEvent();
        setEvents((prev) => [newEvent, ...prev].slice(0, 20));
        setRecentActivity((prev) => [{ type: "new_event", event: newEvent.title, time: new Date() }, ...prev.slice(0, 4)]);
        setNotifications((prev) => [
          { id: Date.now(), message: `New event: ${newEvent.title}`, type: "new_event" },
          ...prev.slice(0, 2)],
        );
      }
    }, 5000);

    const rsvpInterval = setInterval(() => {
      if (isLiveModeRef.current) {
        setEvents((prev) =>
          prev.map((event) => {
            if (Math.random() > 0.7) {
              const change = Math.random() > 0.5 ? 1 : -1;
              return { ...event, rsvpCount: Math.max(0, event.rsvpCount + change), views: event.views + Math.floor(Math.random() * 3) };
            }
            return event;
          })
        );
      }
    }, 3000);

    const statsInterval = setInterval(() => {
      if (isLiveModeRef.current) {
        setLiveStats({
          totalEvents: eventsRef.current.length,
          activeUsers: Math.floor(Math.random() * 50) + 200,
          newEventsToday: Math.floor(Math.random() * 10) + 15,
          totalRSVPs: eventsRef.current.reduce((sum, event) => sum + event.rsvpCount, 0),
        });
      }
    }, 2000);

    const trendingInterval = setInterval(() => {
      if (isLiveModeRef.current) {
        const topics = ["Tech", "Coffee", "Networking", "Startup", "AI", "Web3", "Design", "Music", "Food", "Art"];
        setTrendingTopics(
          topics.sort(() => Math.random() - 0.5).slice(0, 4).map((topic) => ({ name: topic, count: Math.floor(Math.random() * 20) + 5 }))
        );
      }
    }, 8000);

    return () => {
      clearInterval(eventInterval);
      clearInterval(rsvpInterval);
      clearInterval(statsInterval);
      clearInterval(trendingInterval);
    };
  }, [isLiveMode, generateRandomEvent, isOffline]);

  useEffect(() => {
    notifications.forEach((notification) => {
      setTimeout(() => {
        setNotifications((prev) => prev.filter((n) => n.id !== notification.id));
      }, 4000);
    });
  }, [notifications]);

  const updateEventDistances = useCallback((userLat, userLng) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) => ({
        ...event,
        distance: calculateDistance(userLat, userLng, event.coordinates.lat, event.coordinates.lng),
      }))
    );
  }, []);

  useEffect(() => {
    if (userLocation && events.length > 0) {
      updateEventDistances(userLocation.lat, userLocation.lng);
    }
  }, [userLocation, updateEventDistances]);

  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(R * c * 10) / 10;
  };

  const handleLocationSearch = async (query) => {
    if (query.length > 2) {
      const mockSuggestions = [
        { placeId: "mock1", description: `${query} - Coffee Shop, Main St` },
        { placeId: "mock2", description: `${query} - Community Center, Oak Ave` },
        { placeId: "mock3", description: `${query} - Park, Downtown` },
      ];
      setLocationSuggestions(mockSuggestions);
    } else {
      setLocationSuggestions([]);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = date.toLocaleDateString("en-US", { month: "short" }).toUpperCase();
    const day = date.getDate();
    return { month, day };
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(":");
    const hour = Number.parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const handleRSVP = (eventId) => {
    setEvents(
      events.map((event) =>
        event.id === eventId
          ? { ...event, userRsvp: !event.userRsvp, rsvpCount: event.userRsvp ? event.rsvpCount - 1 : event.rsvpCount + 1 }
          : event
      )
    );
    const eventTitle = events.find((e) => e.id === eventId)?.title;
    setRecentActivity((prev) => [{ type: "rsvp", event: eventTitle, time: new Date() }, ...prev.slice(0, 4)]);
  };

  const handleCreateEvent = async () => {
    if (newEvent.title && newEvent.date && newEvent.time && newEvent.location) {
      const event = {
        id: Date.now(),
        ...newEvent,
        rsvpCount: 0,
        userRsvp: false,
        coordinates: userLocation || { lat: 40.7128, lng: -74.006 },
        distance: 0,
        placeId: "new_place_id",
        createdAt: new Date(),
        isPublic: newEvent.isPublic,
        isLive: true,
        views: 1,
        likes: 0,
        attendees: 0,
      };
      setEvents([event, ...events]);
      setRecentActivity((prev) => [{ type: "created", event: event.title, time: new Date() }, ...prev.slice(0, 4)]);
      setNotifications((prev) => [
        { id: Date.now(), message: `Event "${event.title}" created successfully!`, type: "success" },
        ...prev.slice(0, 2)],
      );
      if ("caches" in window && !isOffline) {
        caches.open("eventpulse-cache").then((cache) => {
          cache.put("events-data", new Response(JSON.stringify([event, ...events])));
        });
      }
      setNewEvent({ title: "", date: "", time: "", location: "", description: "", organizer: "You", category: "Social", isPublic: true, tags: [] });
      setShowCreateModal(false);
      setCurrentView("events");
    }
  };

  const handleLikeEvent = (eventId) => {
    setEvents((prev) => prev.map((event) => (event.id === eventId ? { ...event, likes: event.likes + 1 } : event)));
  };

  const openInMaps = (event) => {
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location)}`;
    window.open(mapsUrl, "_blank");
  };

  const handleBackNavigation = () => {
    if (showCreateModal) setShowCreateModal(false);
    else if (showNotifications) setShowNotifications(false);
    else if (showMapView) setShowMapView(false);
    else if (selectedEvent) setSelectedEvent(null);
    else setCurrentView("events");
  };

  const filteredEvents = events
    .filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.organizer.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDistance =
        filterDistance === "all" ||
        (filterDistance === "nearby" && event.distance <= 2) ||
        (filterDistance === "walking" && event.distance <= 1);
      const matchesCategory = filterCategory === "all" || event.category === filterCategory;
      const now = new Date();
      const eventDate = new Date(event.date);
      const matchesTime =
        filterTime === "all" ||
        (filterTime === "today" && eventDate.toDateString() === now.toDateString()) ||
        (filterTime === "this_week" && eventDate <= new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000));
      return matchesSearch && matchesDistance && matchesCategory && matchesTime && event.isPublic;
    })
    .sort((a, b) => {
      if (a.isHotEvent && !b.isHotEvent) return -1;
      if (!a.isHotEvent && b.isHotEvent) return 1;
      if (a.isLive && !b.isLive) return -1;
      if (!a.isLive && b.isLive) return 1;
      return a.distance - b.distance;
    });

  return (
    <>
    <div className="bg-blue-100">

   
    <LinkedInNavigation/>
    <div className="max-w-md mx-auto bg-gradient-to-br from-slate-50 via-blue-500 to-indigo-50 min-h-screen  relative">
      {/* Offline Indicator */}
      {isOffline && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-4 py-3 rounded-xl shadow-lg text-white text-sm font-medium backdrop-blur-sm border border-white/20 bg-gradient-to-r from-red-500 to-orange-500">
          <div className="flex items-center gap-2">
            <span>📴 Offline Mode</span>
          </div>
        </div>
      )}

      {/* Live Notifications */}
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 space-y-2">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`px-4 py-3 rounded-xl shadow-lg text-white text-sm font-medium backdrop-blur-sm border border-white/20 ${
              notification.type === "new_event"
                ? "bg-gradient-to-r from-blue-500 to-purple-500"
                : notification.type === "success"
                ? "bg-gradient-to-r from-green-500 to-emerald-500"
                : "bg-gradient-to-r from-gray-500 to-slate-500"
            } animate-in slide-in-from-top duration-300`}
          >
            <div className="flex items-center gap-2">
              {notification.type === "new_event" && <Sparkles size={16} />}
              {notification.type === "success" && <Star size={16} />}
              {notification.message}
            </div>
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md px-4 py-4 border-b border-white/20  top-0 z-40">
        {(showCreateModal || showNotifications || showMapView || selectedEvent) && (
          <div className="flex items-center gap-3 mb-4">
            <button onClick={handleBackNavigation} className="p-2 hover:bg-gray-100 rounded-xl transition-all">
              <ArrowLeft size={20} className="text-gray-600" />
            </button>
            <span className="text-lg font-semibold text-gray-900">
              {showCreateModal && "Create Event"}
              {showNotifications && "Notifications"}
              {showMapView && "Map View"}
              {selectedEvent && "Event Details"}
            </span>
          </div>
        )}

        {!showCreateModal && !showNotifications && !selectedEvent && (
          <>
            <div className="flex items-center justify-between mb-4 p-3 bg-gradient-to-r from-emerald-50 via-blue-50 to-purple-50 rounded-xl border border-white/30 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                    <div className="absolute inset-0 w-3 h-3 bg-emerald-400 rounded-full animate-ping"></div>
                  </div>
                  <span className="text-sm font-bold text-emerald-700">LIVE</span>
                </div>
                <div className="text-xs text-gray-600 flex items-center gap-2">
                  <span className="flex items-center gap-1">
                    <Users size={12} />
                    {liveStats.activeUsers}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Calendar size={12} />
                    {liveStats.totalEvents}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Heart size={12} />
                    {liveStats.totalRSVPs}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsLiveMode(!isLiveMode)}
                className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all ${
                  isLiveMode ? "bg-emerald-100 text-emerald-700 shadow-sm" : "bg-gray-100 text-gray-600"
                }`}
              >
                {isLiveMode ? "🔴 Live" : "⏸️ Paused"}
              </button>
            </div>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Zap size={20} className="text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    EventPulse
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  </h1>
                  <p className="text-xs text-gray-600">Real-time community events</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowMapView(!showMapView)}
                  className={`p-2 rounded-xl transition-all ${
                    showMapView ? "bg-blue-100 text-blue-600" : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Map size={20} />
                </button>
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-xl transition-all">
                  <MoreHorizontal size={20} />
                </button>
              </div>
            </div>

            {!showMapView && (
              <>
                <div className="relative mb-4">
                  <Search size={16} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search events, locations, organizers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-white/70 backdrop-blur-sm rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-300 border border-white/30 shadow-sm"
                  />
                </div>

                {trendingTopics.length > 0 && (
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Fire size={16} className="text-orange-500" />
                      <span className="text-sm font-bold text-gray-700">Trending Now</span>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {trendingTopics.map((topic, index) => (
                        <button
                          key={index}
                          onClick={() => setSearchTerm(topic.name)}
                          className="px-3 py-1.5 bg-gradient-to-r from-orange-100 to-red-100 text-orange-700 rounded-full text-xs font-medium hover:from-orange-200 hover:to-red-200 transition-all shadow-sm border border-orange-200"
                        >
                          #{topic.name} ({topic.count})
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between mb-4 p-3 bg-white/50 rounded-xl border border-white/30">
                  <div className="flex items-center gap-2">
                    <Navigation size={14} className={locationEnabled ? "text-emerald-600" : "text-gray-400"} />
                    <span className="text-xs text-gray-600">
                      {locationEnabled ? "📍 Live location enabled" : "📍 Enable location for nearby events"}
                    </span>
                  </div>
                  {locationEnabled && (
                    <div className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full animate-pulse font-medium">
                      Live
                    </div>
                  )}
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    <button
                      onClick={() => setFilterDistance("all")}
                      className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                        filterDistance === "all"
                          ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-md"
                          : "bg-white/70 text-gray-600 hover:bg-white"
                      }`}
                    >
                      All ({events.filter((e) => e.isPublic).length})
                    </button>
                    <button
                      onClick={() => setFilterDistance("walking")}
                      className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                        filterDistance === "walking"
                          ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-md"
                          : "bg-white/70 text-gray-600 hover:bg-white"
                      }`}
                    >
                      🚶 Walking (≤1km)
                    </button>
                    <button
                      onClick={() => setFilterDistance("nearby")}
                      className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                        filterDistance === "nearby"
                          ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-md"
                          : "bg-white/70 text-gray-600 hover:bg-white"
                      }`}
                    >
                      📍 Nearby (≤2km)
                    </button>
                  </div>

                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {["all", "Social", "Professional", "Business", "Entertainment", "Health", "Education"].map((category) => (
                      <button
                        key={category}
                        onClick={() => setFilterCategory(category)}
                        className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                          filterCategory === category
                            ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-md"
                            : "bg-white/70 text-gray-600 hover:bg-white"
                        }`}
                      >
                        {category === "all" ? "🏷️ All Categories" : category === "Social" ? "🎉 Social" : category === "Professional" ? "💼 Professional" : category === "Business" ? "📈 Business" : category === "Entertainment" ? "🎭 Entertainment" : category === "Health" ? "🏃‍♂️ Health" : "📚 Education"}
                      </button>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    {[{ key: "all", label: "🕐 All Time" }, { key: "today", label: "📅 Today" }, { key: "this_week", label: "📆 This Week" }].map((time) => (
                      <button
                        key={time.key}
                        onClick={() => setFilterTime(time.key)}
                        className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                          filterTime === time.key
                            ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md"
                            : "bg-white/70 text-gray-600 hover:bg-white"
                        }`}
                      >
                        {time.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-gray-900">{filteredEvents.length} Events</span>
                    {filteredEvents.some((e) => e.isLive) && (
                      <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full font-medium">
                        {filteredEvents.filter((e) => e.isLive).length} Live
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => setShowCreateModal(true)}
                    className="bg-gradient-to-r from-violet-500 to-purple-500 text-white px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 hover:from-violet-600 hover:to-purple-600 transition-all shadow-lg"
                  >
                    <Plus size={16} />
                    Create
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </div>

      {recentActivity.length > 0 && !showCreateModal && !showNotifications && !showMapView && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100 p-4">
          <div className="flex items-center gap-2 mb-3">
            <Clock size={16} className="text-blue-600" />
            <span className="text-sm font-bold text-blue-700">Live Activity</span>
          </div>
          <div className="space-y-2">
            {recentActivity.slice(0, 3).map((activity, index) => (
              <div key={index} className="text-sm text-blue-600 bg-white/50 rounded-lg p-2">
                {activity.type === "new_event" && `🆕 New: ${activity.event}`}
                {activity.type === "rsvp" && `✅ Someone joined: ${activity.event}`}
                {activity.type === "created" && `🎉 You created: ${activity.event}`}
              </div>
            ))}
          </div>
        </div>
      )}

      {showMapView && (
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-blue-100 p-4">
          <div className="flex items-center justify-center gap-3 text-blue-700 mb-4">
            <Map size={24} />
            <div>
              <div className="text-sm font-bold">Live Map View</div>
              <div className="text-xs text-blue-600">🗺️ Google Maps with real-time event markers</div>
            </div>
          </div>
          <div className="bg-white/70 rounded-xl p-8 text-center">
            <div className="text-gray-500 mb-4">
              <Map size={48} className="mx-auto" />
            </div>
            <p className="text-gray-600">Interactive map would be integrated here</p>
            <p className="text-sm text-gray-500 mt-2">Showing {filteredEvents.length} events in your area</p>
          </div>
        </div>
      )}

      {showNotifications && (
        <div className="px-4 py-4">
          <div className="space-y-4">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <div key={notification.id} className="bg-white/80 rounded-xl p-4 border border-white/30">
                  <div className="flex items-center gap-3">
                    {notification.type === "new_event" && <Sparkles size={20} className="text-blue-500" />}
                    {notification.type === "success" && <Star size={20} className="text-green-500" />}
                    <div>
                      <p className="text-sm font-medium text-gray-900">{notification.message}</p>
                      <p className="text-xs text-gray-500">Just now</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <Bell size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-bold text-gray-700 mb-2">No notifications</h3>
                <p className="text-gray-600">You're all caught up!</p>
              </div>
            )}
          </div>
        </div>
      )}

      {!showCreateModal && !showNotifications && !showMapView && (
        <div className="px-4 py-4 space-y-4 pb-24">
          {filteredEvents.map((event) => {
            const { month, day } = formatDate(event.date);
            const isNewEvent = new Date() - event.createdAt < 24 * 60 * 60 * 1000;

            return (
              <div
                key={event.id}
                className={`bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/30 p-5 relative transition-all hover:shadow-xl hover:scale-[1.02] cursor-pointer ${
                  event.isHotEvent ? "ring-2 ring-orange-300 bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50" : ""
                } ${event.isLive ? "ring-2 ring-emerald-300" : ""}`}
                onClick={() => setSelectedEvent(event)}
              >
                <div className="absolute top-3 left-3 flex gap-2">
                  {isNewEvent && (
                    <div className="bg-gradient-to-r from-emerald-500 to-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                      ✨ New
                    </div>
                  )}
                  {event.isLive && (
                    <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-md">
                      <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>🔴 Live
                    </div>
                  )}
                  {event.isHotEvent && (
                    <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-md">
                      <Fire size={12} />🔥 Hot
                    </div>
                  )}
                </div>

                <div className="absolute top-3 right-3 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 px-3 py-1 rounded-full text-xs font-bold border border-purple-200">
                  📍 {event.distance}km
                </div>

                <div className="flex gap-4 mt-10">
                  <div className="flex-shrink-0">
                    <div
                      className={`w-14 h-18 border-2 rounded-2xl flex flex-col items-center justify-center shadow-md ${
                        event.isHotEvent ? "bg-gradient-to-br from-orange-100 to-red-100 border-orange-300" : "bg-gradient-to-br from-purple-100 to-blue-100 border-purple-300"
                      }`}
                    >
                      <div className={`text-xs font-bold ${event.isHotEvent ? "text-orange-700" : "text-purple-700"}`}>
                        {month}
                      </div>
                      <div className={`text-xl font-black ${event.isHotEvent ? "text-orange-700" : "text-purple-700"}`}>
                        {day}
                      </div>
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <h3 className="font-bold text-gray-900 text-lg">{event.title}</h3>
                      <span className="text-xs bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 px-2 py-1 rounded-full font-medium">
                        {event.category}
                      </span>
                      {event.attendees > 0 && (
                        <span className="text-xs bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 px-2 py-1 rounded-full flex items-center gap-1 font-medium">
                          <Users size={10} />
                          {event.attendees} here
                        </span>
                      )}
                    </div>

                    <div className="text-sm text-gray-600 mb-2 flex items-center gap-2">
                      <Clock size={14} />
                      <span className="font-medium">{formatTime(event.time)}</span>
                      {event.isLive && <span className="text-emerald-600 text-xs font-bold">• Happening now!</span>}
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                      <MapPin size={14} />
                      <span className="flex-1 font-medium">{event.location}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openInMaps(event);
                        }}
                        className="text-blue-600 hover:text-blue-700 p-1 hover:bg-blue-50 rounded-lg transition-all"
                        title="Open in Google Maps"
                      >
                        <ExternalLink size={14} />
                      </button>
                    </div>

                    <p className="text-sm text-gray-700 mb-4 leading-relaxed">{event.description}</p>

                    <div className="flex items-center gap-4 mb-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Eye size={12} />
                        <span className="font-medium">{event.views}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart size={12} />
                        <span className="font-medium">{event.likes}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle size={12} />
                        <span className="font-medium">{Math.floor(Math.random() * 10)}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-500">
                        <span className="font-medium">By {event.organizer}</span>
                        {isNewEvent && <span className="text-emerald-600 ml-2 font-bold">• Just posted</span>}
                        {event.isLive && <span className="text-red-600 ml-2 font-bold">• Live event</span>}
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLikeEvent(event.id);
                          }}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                        >
                          <Heart size={16} />
                        </button>
                        <button
                          onClick={(e) => e.stopPropagation()}
                          className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-xl transition-all"
                        >
                          <Share2 size={16} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRSVP(event.id);
                          }}
                          className={`px-5 py-2 rounded-xl text-sm font-bold transition-all shadow-md ${
                            event.userRsvp
                              ? "bg-gradient-to-r from-emerald-500 to-green-500 text-white hover:from-emerald-600 hover:to-green-600"
                              : event.isHotEvent
                              ? "bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600"
                              : "bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600"
                          }`}
                        >
                          {event.userRsvp ? "✅ Going" : event.isHotEvent ? "🔥 Join Hot Event!" : "🎉 Join Event"}
                        </button>
                      </div>
                    </div>

                    {event.rsvpCount > 0 && (
                      <div className="text-xs text-gray-500 mt-3 flex items-center gap-1 bg-gray-50 rounded-lg p-2">
                        <Users size={12} />
                        <span className="font-medium">{event.rsvpCount} people attending</span>
                        {event.rsvpCount > 20 && <span className="text-orange-600 ml-2 font-bold">• Popular!</span>}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {filteredEvents.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Calendar size={64} className="mx-auto" />
              </div>
              <h3 className="text-xl font-bold text-gray-700 mb-2">No events found</h3>
              <p className="text-gray-600 mb-2">No events match your current filters</p>
              <p className="text-sm text-gray-500 mb-6">Try adjusting your search or create a new event!</p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="bg-gradient-to-r from-violet-500 to-purple-500 text-white px-6 py-3 rounded-xl text-sm font-bold hover:from-violet-600 hover:to-purple-600 transition-all shadow-lg"
              >
                🚀 Create First Event
              </button>
            </div>
          )}
        </div>
      )}

      {selectedEvent && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl w-full max-w-md p-6 max-h-[90vh] overflow-y-auto shadow-2xl border border-white/30">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">{selectedEvent.title}</h2>
              <button
                onClick={() => setSelectedEvent(null)}
                className="p-2 hover:bg-gray-100 rounded-xl transition-all"
              >
                <X size={20} className="text-gray-600" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-600">
                <Clock size={20} />
                <div>
                  <p className="font-medium">{formatTime(selectedEvent.time)}</p>
                  <p className="text-sm">{selectedEvent.date}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-gray-600">
                <MapPin size={20} />
                <div className="flex-1">
                  <p className="font-medium">{selectedEvent.location}</p>
                  <p className="text-sm">{selectedEvent.distance}km away</p>
                </div>
                <button
                  onClick={() => openInMaps(selectedEvent)}
                  className="text-blue-600 hover:text-blue-700 p-2 hover:bg-blue-50 rounded-lg transition-all"
                >
                  <ExternalLink size={16} />
                </button>
              </div>

              <div className="flex items-center gap-3 text-gray-600">
                <Users size={20} />
                <div>
                  <p className="font-medium">{selectedEvent.rsvpCount} attending</p>
                  <p className="text-sm">Organized by {selectedEvent.organizer}</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="font-bold text-gray-900 mb-2">About this event</h3>
                <p className="text-gray-700 leading-relaxed">{selectedEvent.description}</p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => handleLikeEvent(selectedEvent.id)}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-medium flex items-center justify-center gap-2"
                >
                  <Heart size={16} />
                  Like ({selectedEvent.likes})
                </button>
                <button
                  onClick={() => handleRSVP(selectedEvent.id)}
                  className={`flex-1 px-4 py-3 rounded-xl transition-all font-bold ${
                    selectedEvent.userRsvp
                      ? "bg-gradient-to-r from-emerald-500 to-green-500 text-white hover:from-emerald-600 hover:to-green-600"
                      : "bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600"
                  }`}
                >
                  {selectedEvent.userRsvp ? "✅ Going" : "🎉 Join Event"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white/90 backdrop-blur-md border-t border-white/30 px-4 py-3 shadow-2xl">
        <div className="flex justify-around">
          <button
            onClick={() => {
              setCurrentView("events");
              setShowMapView(false);
              setShowNotifications(false);
            }}
            className={`p-3 flex flex-col items-center transition-all rounded-xl ${
              currentView === "events" && !showMapView && !showNotifications
                ? "text-purple-600 bg-purple-50"
                : "text-gray-500 hover:text-purple-600 hover:bg-purple-50"
            }`}
          >
            <Calendar size={22} />
            <span className="text-xs mt-1 font-bold">Events</span>
          </button>
          <button
            onClick={() => setShowCreateModal(true)}
            className="p-3 text-gray-500 hover:text-purple-600 hover:bg-purple-50 flex flex-col items-center transition-all rounded-xl"
          >
            <Plus size={22} />
            <span className="text-xs mt-1 font-medium">Create</span>
          </button>
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowMapView(false);
              setCurrentView("notifications");
            }}
            className={`p-3 flex flex-col items-center relative transition-all rounded-xl ${
              showNotifications
                ? "text-purple-600 bg-purple-50"
                : "text-gray-500 hover:text-purple-600 hover:bg-purple-50"
            }`}
          >
            <Bell size={22} />
            <span className="text-xs mt-1 font-medium">Alerts</span>
            {notifications.length > 0 && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-md">
                {notifications.length}
              </div>
            )}
          </button>
          <button
            onClick={() => {
              setShowMapView(!showMapView);
              setShowNotifications(false);
              setCurrentView("map");
            }}
            className={`p-3 flex flex-col items-center transition-all rounded-xl ${
              showMapView ? "text-blue-600 bg-blue-50" : "text-gray-500 hover:text-blue-600 hover:bg-blue-50"
            }`}
          >
            <Map size={22} />
            <span className="text-xs mt-1 font-medium">Map</span>
          </button>
        </div>
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl w-full max-w-md p-6 max-h-[90vh] overflow-y-auto shadow-2xl border border-white/30">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Create Live Event</h2>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-emerald-600 font-bold">Going Live</span>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 p-4 rounded-xl mb-6 border border-purple-200">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={16} className="text-purple-600" />
                <span className="text-sm font-bold text-purple-700">Live Event Features</span>
              </div>
              <p className="text-sm text-gray-700">
                🌐 Your event will be visible to everyone nearby and appear in real-time feeds with instant notifications
              </p>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Event Title *</label>
                <input
                  type="text"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white/70 backdrop-blur-sm"
                  placeholder="What's happening?"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
                <select
                  value={newEvent.category}
                  onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white/70 backdrop-blur-sm"
                >
                  <option value="Social">🎉 Social</option>
                  <option value="Professional">💼 Professional</option>
                  <option value="Business">📈 Business</option>
                  <option value="Sports">⚽ Sports</option>
                  <option value="Education">📚 Education</option>
                  <option value="Entertainment">🎭 Entertainment</option>
                  <option value="Health">🏃‍♂️ Health & Fitness</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Date *</label>
                  <input
                    type="date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white/70 backdrop-blur-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Time *</label>
                  <input
                    type="time"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white/70 backdrop-blur-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Location * 📍 Google Places</label>
                <input
                  type="text"
                  value={newEvent.location}
                  onChange={(e) => {
                    setNewEvent({ ...newEvent, location: e.target.value });
                    handleLocationSearch(e.target.value);
                  }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white/70 backdrop-blur-sm"
                  placeholder="Search for a place or enter address"
                />

                {locationSuggestions.length > 0 && (
                  <div className="mt-2 border border-gray-200 rounded-xl bg-white/90 backdrop-blur-sm shadow-lg">
                    {locationSuggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setNewEvent({ ...newEvent, location: suggestion.description });
                          setLocationSuggestions([]);
                        }}
                        className="w-full text-left px-4 py-3 hover:bg-purple-50 text-sm border-b last:border-b-0 transition-all"
                      >
                        <MapPin size={14} className="inline mr-2 text-gray-400" />
                        {suggestion.description}
                      </button>
                    ))}
                  </div>
                )}

                <p className="text-xs text-gray-500 mt-2">📍 Auto-complete powered by Google Places API</p>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                <textarea
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white/70 backdrop-blur-sm"
                  placeholder="Tell people what to expect at your event..."
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isPublic"
                    checked={newEvent.isPublic}
                    onChange={(e) => setNewEvent({ ...newEvent, isPublic: e.target.checked })}
                    className="mr-3 w-4 h-4 text-purple-600 rounded"
                  />
                  <label htmlFor="isPublic" className="text-sm text-gray-700 font-medium">
                    🌍 Make this event public (visible to everyone nearby)
                  </label>
                </div>

                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-xl border border-yellow-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap size={16} className="text-yellow-600" />
                    <span className="text-sm font-bold text-yellow-700">Live Event Features</span>
                  </div>
                  <ul className="text-xs text-yellow-700 space-y-1">
                    <li>• Real-time RSVP updates</li>
                    <li>• Instant notifications to nearby users</li>
                    <li>• Live attendee count</li>
                    <li>• Trending algorithm inclusion</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateEvent}
                disabled={!newEvent.title || !newEvent.date || !newEvent.time || !newEvent.location}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-xl hover:from-violet-600 hover:to-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg font-bold"
              >
                🚀 Go Live!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
     </div>
    </>
  );
};

export default LiveEventsApp;