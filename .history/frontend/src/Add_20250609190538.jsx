
import React, { useState, useRef } from 'react';
import { X, ChevronDown, Clock, Image, Video, FileText, Smile } from 'lucide-react';
import { Link } from 'react-router-dom';

const UploadPage = () => {
  const [postText, setPostText] = useState('');
  const [selectedCommunity, setSelectedCommunity] = useState('All HR Team');
  const [showCommunityDropdown, setShowCommunityDropdown] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);

  const fileInputRef = useRef(null);
  const videoInputRef = useRef(null);
  const genericFileInputRef = useRef(null);

  const communities = [
    'All HR Team',
    'Management Only',
    'Department Heads',
    'HR Partners',
    'Recruiting Team',
    'Employee Relations'
  ];

  const handleFileUpload = (event, type) => {
    const files = Array.from(event.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedFiles(prev => [...prev, {
          id: Date.now() + Math.random(),
          type: type,
          url: e.target.result,
          name: file.name,
          size: file.size
        }]);
      };
      reader.readAsDataURL(file);
    });
    event.target.value = null; // reset input so same file can be uploaded again if needed
  };

  const removeFile = (id) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== id));
  };

  const emojis = ['😊', '😂', '😍', '🤔', '👍', '👎', '❤', '🎉', '🔥', '💪', '👏', '🙌', '😎', '🤝', '💼', '📊', '📈', '✅', '⭐', '🚀'];

  const addEmoji = (emoji) => {
    setPostText(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handlePost = () => {
    console.log('Posting...', {
      text: postText,
      community: selectedCommunity,
      files: uploadedFiles,
      scheduled: showSchedule
    });
    // Reset form
    setPostText('');
    setUploadedFiles([]);
    setShowSchedule(false);
    alert('Post published successfully!');
  };

  return (
    <div className="max-w-md mx-auto bg-blue-50 min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white px-5 py-3 flex items-center justify-between border-b border-gray-300 shadow-sm">
        <Link to="/dashboard" aria-label="Close upload page" className="p-1 hover:bg-gray-100 rounded-full transition">
          <X className="w-6 h-6 text-gray-700" />
        </Link>

        {/* Community Selector */}
        <div className="relative">
          <button
            onClick={() => setShowCommunityDropdown(!showCommunityDropdown)}
            className="flex items-center space-x-2 text-blue-700 bg-blue-100 rounded-full px-4 py-1.5 font-medium shadow-sm hover:bg-blue-200 transition"
            aria-haspopup="listbox"
            aria-expanded={showCommunityDropdown}
          >
            <div className="w-7 h-7 bg-blue-500 rounded-full flex items-center justify-center text-xs font-semibold text-white select-none">
              C
            </div>
            <span className="text-sm">{selectedCommunity}</span>
            <ChevronDown className="w-4 h-4" />
          </button>

          {showCommunityDropdown && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowCommunityDropdown(false)}
              ></div>
              <ul
                className="absolute top-full mt-2 left-0 w-52 bg-white rounded-lg shadow-lg border border-gray-300 z-20 overflow-auto max-h-52"
                role="listbox"
                tabIndex={-1}
              >
                {communities.map((community, index) => (
                  <li
                    key={index}
                    role="option"
                    aria-selected={selectedCommunity === community}
                    tabIndex={0}
                    className={`px-4 py-3 cursor-pointer hover:bg-blue-50 ${
                      selectedCommunity === community ? 'bg-blue-100 font-semibold' : ''
                    }`}
                    onClick={() => {
                      setSelectedCommunity(community);
                      setShowCommunityDropdown(false);
                    }}
                    onKeyDown={e => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        setSelectedCommunity(community);
                        setShowCommunityDropdown(false);
                      }
                    }}
                  >
                    {community}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        {/* Schedule and Post */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowSchedule(!showSchedule)}
            className={`p-2 rounded-full transition ${
              showSchedule ? 'bg-blue-200 text-blue-700' : 'text-gray-400 hover:text-blue-600'
            }`}
            aria-pressed={showSchedule}
            aria-label="Toggle schedule post"
            type="button"
          >
            <Clock className="w-5 h-5" />
          </button>
          <button
            onClick={handlePost}
            disabled={!postText.trim() && uploadedFiles.length === 0}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition
              ${
                postText.trim() || uploadedFiles.length > 0
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }
            `}
          >
            Post
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-5 space-y-4 overflow-auto">
        {/* Textarea with Emoji Button */}
        <div className="relative">
          <textarea
            value={postText}
            onChange={e => setPostText(e.target.value)}
            placeholder={`Share an update with your ${selectedCommunity}...`}
            className="w-full min-h-[100px] resize-none rounded-md border border-gray-300 p-3 pr-12 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="button"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            aria-label="Toggle emoji picker"
            className="absolute top-3 right-3 text-gray-500 hover:text-blue-600 transition"
          >
            <Smile className="w-6 h-6" />
          </button>

          {showEmojiPicker && (
            <div className="absolute bottom-full mb-2 right-0 bg-white rounded-md shadow-lg border border-gray-300 p-3 max-w-xs max-h-40 overflow-auto z-30 grid grid-cols-6 gap-2">
              {emojis.map((emoji, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => addEmoji(emoji)}
                  className="text-2xl hover:bg-blue-100 rounded-md transition"
                  aria-label={`Add emoji ${emoji}`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Upload Buttons */}
        <div className="flex space-x-5 text-gray-600">
          <button
            type="button"
            onClick={() => fileInputRef.current.click()}
            className="flex items-center space-x-1 hover:text-blue-600 transition"
          >
            <Image className="w-6 h-6" />
            <span className="text-sm font-medium">Images</span>
          </button>
          <button
            type="button"
            onClick={() => videoInputRef.current.click()}
            className="flex items-center space-x-1 hover:text-blue-600 transition"
          >
            <Video className="w-6 h-6" />
            <span className="text-sm font-medium">Videos</span>
          </button>
          <button
            type="button"
            onClick={() => genericFileInputRef.current.click()}
            className="flex items-center space-x-1 hover:text-blue-600 transition"
          >
            <FileText className="w-6 h-6" />
            <span className="text-sm font-medium">Files</span>
          </button>
        </div>

        {/* Hidden File Inputs */}
        <input
          type="file"
          accept="image/*"
          multiple
          ref={fileInputRef}
          className="hidden"
          onChange={(e) => handleFileUpload(e, 'image')}
        />
        <input
          type="file"
          accept="video/*"
          multiple
          ref={videoInputRef}
          className="hidden"
          onChange={(e) => handleFileUpload(e, 'video')}
        />
        <input
          type="file"
          multiple
          ref={genericFileInputRef}
          className="hidden"
          onChange={(e) => handleFileUpload(e, 'file')}
        />

        {/* Uploaded Files Preview */}
        {uploadedFiles.length > 0 && (
          <div className="border border-gray-300 rounded-md p-3 bg-white max-h-56 overflow-auto">
            <h3 className="text-sm font-semibold mb-2 text-gray-700">Attachments</h3>
            <ul className="space-y-3">
              {uploadedFiles.map(({ id, type, url, name, size }) => (
                <li key={id} className="flex items-center space-x-3">
                  {type === 'image' && (
                    <img
                      src={url}
                      alt={name}
                      className="w-12 h-12 object-cover rounded-md border border-gray-200"
                    />
                  )}
                  {type === 'video' && (
                    <video
                      src={url}
                      controls
                      className="w-16 h-12 rounded-md border border-gray-200 object-cover"
                    />
                  )}
                  {type === 'file' && (
                    <FileText className="w-12 h-12 text-gray-400" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">{name}</p>
                    <p className="text-xs text-gray-500">{formatFileSize(size)}</p>
                  </div>
                  <button
                    onClick={() => removeFile(id)}
                    aria-label={`Remove file ${name}`}
                    className="p-1 hover:text-red-600 transition"
                    type="button"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Schedule Input */}
        {showSchedule && (
          <div className="mt-4 p-3 bg-white border border-gray-300 rounded-md shadow-sm">
            <label htmlFor="schedule-date" className="block text-gray-700 font-medium mb-1">
              Schedule Post
            </label>
            <input
              type="datetime-local"
              id="schedule-date"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default UploadPage;
