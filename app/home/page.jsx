"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Loader from "@/app/components/Loader";
import SpeakOnLoad from "@/app/components/SpeakOnLoad";
import SpeechRecognitionComponent from "@/app/components/SpeechRecognitionComponent";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@/app/styles/HomePage.css";
import LikeButton from "@/app/components/LikeButton";
import ChatBox from "@/app/components/ChatBox";
import ProfileModal from "@/app/components/ProfileModal";
import Image from 'next/image';

const DeleteToast = ({ countdown, onUndo }) => (
  <div>
    Post deleted. Undo in {countdown} seconds.{" "}
    <button
      onClick={onUndo}
      style={{
        textDecoration: "underline",
        color: "#0073b1",
        background: "none",
        border: "none",
        cursor: "pointer",
      }}
    >
      Undo
    </button>
  </div>
);

export default function HomePage() {
  const currentUserId = "679a5168c3568d0ad4797b9f"; // Example user ID

  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [video, setVideo] = useState("");
  const [mediaPreview, setMediaPreview] = useState("");
  const [mediaType, setMediaType] = useState("");
  const [deletingPost, setDeletingPost] = useState(null);
  const { data: session } = useSession();
  const [showChat, setShowChat] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  
  const modalRef = useRef();
  // const handleSearchClick = () => setShowModal(true);
  // const handleCloseModal = () => setShowModal(false);
  const [searchTerm, setSearchTerm] = useState("");
  // const [user, setUser] = useState(null);
  const router = useRouter(); // ✅ Define router here

  // For comments: declare these only once.
  const [expandedComments, setExpandedComments] = useState({});
  const [commentInputs, setCommentInputs] = useState({});

  const deleteTimeoutRef = useRef(null);
  const countdownIntervalRef = useRef(null);

  const allSuggestions = [
    "Web Developer",
    "Full Stack Engineer",
    "Junior Web Developer",
    "Front End Developer",
    "Software Engineer",
    "Web Designer",
    "Full Stack Developer",
  ];

  // Fetch posts from MongoDB
  useEffect(() => {
    fetchPosts();
  }, []);

  // Simulate loading process
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);


    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/posts");
        if (res.ok) {
          const data = await res.json();
          setPosts(data);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

 // Fetch user data when the component mounts
 useEffect(() => {
  async function fetchUser() {
    try {
      const res = await fetch("/api/auth/user");
      const data = await res.json();
      if (res.ok) {
        setUser(data);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  }

  fetchUser();
}, []);

  const handleMediaUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewURL = URL.createObjectURL(file);
      const fileType = file.type;
      if (fileType.startsWith("image/")) {
        setMediaType("image");
        setImage(previewURL);
        setVideo("");
      } else if (fileType.startsWith("video/")) {
        setMediaType("video");
        setVideo(previewURL);
        setImage("");
      }
      setMediaPreview(previewURL);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return alert("Post content is required!");

    const newPost = { content, image, video };

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      });
      const data = await res.json();
      if (data.success) {
        setContent("");
        setImage("");
        setVideo("");
        setMediaPreview("");
        setMediaType("");
        fetchPosts();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const deletePostFromDB = async (postId) => {
    try {
      const res = await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!data.success) {
        toast.error(data.message || "Failed to delete post");
        fetchPosts();
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error("Error deleting post");
      fetchPosts();
    }
  };

  const handleDelete = (postId) => {
    toast.info("Post will be deleted soon. You can undo this action below.", {
      autoClose: false,
      closeButton: false,
    });

    const postToDelete = posts.find((p) => p._id === postId);
    setPosts((prev) => prev.filter((p) => p._id !== postId));
    setDeletingPost({ post: postToDelete, id: postId });

    let countdown = 5;
    const toastId = toast.info(
      <DeleteToast countdown={countdown} onUndo={handleUndo} />,
      { autoClose: false, closeButton: false }
    );

    countdownIntervalRef.current = setInterval(() => {
      countdown--;
      toast.update(toastId, {
        render: <DeleteToast countdown={countdown} onUndo={handleUndo} />,
      });
    }, 1000);

    deleteTimeoutRef.current = setTimeout(() => {
      clearInterval(countdownIntervalRef.current);
      toast.dismiss(toastId);
      deletePostFromDB(postId);
      setDeletingPost(null);
    }, 5000);
  };

  const handleUndo = () => {
    clearTimeout(deleteTimeoutRef.current);
    clearInterval(countdownIntervalRef.current);
    if (deletingPost) {
      setPosts((prev) => [deletingPost.post, ...prev]);
      toast.dismiss();
      setDeletingPost(null);
    }
  };

  const handleReaction = async (postId, reaction) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post._id === postId) {
          const updatedLikes = { ...post.likes, [reaction]: (post.likes?.[reaction] || 0) + 1 };
          return { ...post, likes: updatedLikes };
        }
        return post;
      })
    );
    try {
      await fetch(`/api/posts/${postId}/reaction`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reaction }),
      });
    } catch (error) {
      console.error("Error updating reaction:", error);
    }
  };

  const toggleComments = (postId) => {
    setExpandedComments((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  const handleCommentInput = (e, postId) => {
    setCommentInputs((prev) => ({ ...prev, [postId]: e.target.value }));
  };

  const handleComment = async (e, postId) => {
    e.preventDefault();
    const commentContent = commentInputs[postId];
    if (!commentContent.trim()) {
      return alert("Comment cannot be empty!");
    }
    try {
      const res = await fetch(`/api/posts/${postId}/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ commentContent, userId: currentUserId }),
      });
      const data = await res.json();
      if (data.success) {
        setPosts((prevPosts) =>
          prevPosts.map((post) => {
            if (post._id === postId) {
              return { ...post, comments: data.comments };
            }
            return post;
          })
        );
        setCommentInputs((prev) => ({ ...prev, [postId]: "" }));
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };
  
    // Dummy User Data (Replace with actual DB user data)
  const user = {
    username: "Khushal Acharya",
    email: "khushal.acharya29@gmail.com",
    profilePicture: "/profile.jpg",
    otherAccounts: [
      { username: "Riya Acharya", email: "acharya.riya16@gmail.com" },
      { username: "Khushal Acharya", email: "khushalacharya783@gmail.com" },
    ],
  };

// Handle Sign Out
const handleSignOut = async () => {
  try {
    const res = await fetch("/api/auth/logout", { method: "POST" });
    if (res.ok) {
      toast.success("Successfully signed out!");
      router.push("/"); // Redirect to homepage
    }
  } catch (error) {
    console.error("Error signing out:", error);
  }
};

const handleManageAccount = () => {
  if (!router) return;
  router.push("/profile");
  setTimeout(() => {
    window.location.reload(); // ✅ Force reload
  }, 500);
};

const filteredSuggestions = searchTerm.trim()
  ? allSuggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(searchTerm.toLowerCase())
    )
  : allSuggestions;




const handleSearchClick = (item) => {
  router.push("/feed"); // Redirect to feed page
};

const handleCloseModal = () => {
  setShowModal(false);
  setSearchTerm("");
};

// Close modal when clicking outside
useEffect(() => {
  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      handleCloseModal();
    }
  };
  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);




  return (
    <div className="min-h-screen bg-gray-100">
      <ToastContainer />
      {/* Header */}
      <header className="bg-white shadow-sm p-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center space-x-4">
          <Image src="/logo.jpg" alt="5" className="w-8 h-8" />
          <input
              type="text"
              placeholder="Campus search..."
              className="w-full bg-gray-100 px-4 py-2 rounded-full text-sm shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              value={searchTerm}
              onClick={handleSearchClick}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setShowModal(true);
              }}
            />
          </div>

          {/* Modal */}
          {showModal && (
            <div
              ref={modalRef}
              className="absolute top-14 left-12 w-64 bg-white border rounded-xl shadow-lg p-4 z-50 transition-all duration-200 ease-in-out animate-fade-in"
            >
              <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
                <span className="font-semibold">
                  {searchTerm.trim() ? "Suggestions" : "Recent"}
                </span>
                <button
                  onClick={handleCloseModal}
                  className="text-blue-500 text-xs hover:underline"
                >
                  Clear
                </button>
              </div>

              <ul className="text-sm text-gray-700 space-y-2 max-h-60 overflow-y-auto">
                {filteredSuggestions.length > 0 ? (
                  filteredSuggestions.map((item, index) => (
                    <li
  key={index}
  className="cursor-pointer hover:bg-gray-100 p-2 rounded-lg flex items-center gap-2 transition"
  onClick={() => {
    setSearchTerm(item);
    handleCloseModal();
    router.push(`/feed?search=${encodeURIComponent(item)}`); // pass as query
  }}
>
  <span role="img" aria-label="search">🔍</span> {item}
</li>
                  ))
                ) : (
                  <li className="text-gray-400 italic px-2 py-1">No results found</li>
                )}
              </ul>
            </div>
          )}
        <nav className="flex items-center space-x-6">
          <a href="/home" className="text-gray-600 hover:text-gray-900">Home</a>
          {/* <a href="#" className="text-gray-600 hover:text-gray-900">My Network</a> */}
          <Link href="/jobs" className="text-gray-600 hover:text-gray-900">Jobs</Link>

          <Link href="/messages" className="text-gray-600 hover:text-gray-900">Messaging</Link>
      {user && (
        <div className="relative">
          <Image
            src="user7.jpg"
            alt="Profile"
            className="w-10 h-10 rounded-full cursor-pointer"
            onClick={() => setIsModalOpen(!isModalOpen)}
          />
          {isModalOpen && (
            <ProfileModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              user={user}
              onManageAccount={handleManageAccount} 
              onSignOut={handleSignOut} // Pass sign-out function
            />
          )}
        </div>
      )}
        </nav>
      </header>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row container mx-auto p-4 space-y-6 lg:space-y-0 lg:space-x-6">
        {/* Left Sidebar */}
        <aside className="bg-white p-4 rounded-lg shadow w-full lg:w-1/4 space-y-4">
          <div className="text-center">
            <Image src="/user7.jpg" alt="Profile" className="w-20 h-20 rounded-full mx-auto mb-4" />
            <h2 className="font-semibold text-lg">Khushal Acharya</h2>
            <p className="text-sm text-gray-500">Full Stack Developer</p>
          </div>
          <div className="space-y-2">
            <p className="text-gray-700">Profile viewers: <span className="font-bold">25</span></p>
            <p className="text-gray-700">Post impressions: <span className="font-bold">+19</span></p>
          </div>
          <hr />
          <div>
            <p className="font-semibold text-gray-700">Try Premium For:</p>
            <ul className="text-gray-500 space-y-2">
              <li>Career</li>
              <li>AI Powered Agent</li>
              <li>Recruiter Support</li>
            </ul>
          </div>
        </aside>

        {/* Main Feed */}
        <main className="bg-white p-4 rounded-lg shadow w-full lg:w-2/4 space-y-6">
          {/* Post Form */}
          <div className="post-form-container bg-gray-100 p-4 rounded-lg shadow">
            <h2 className="text-gray-700">Create a Post</h2>
            <form onSubmit={handleSubmit} className="post-form space-y-4">
              <textarea
                placeholder="What's on your mind?"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="post-input w-full p-2 border rounded-lg"
                required
              />
              <div className="media-upload flex items-center gap-4">
                <label htmlFor="media-upload" className="media-upload-label bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer">
                  <span role="img" aria-label="upload media">📷</span> Upload Media
                </label>
                <input
                  type="file"
                  id="media-upload"
                  accept="image/*,video/*"
                  onChange={handleMediaUpload}
                  hidden
                />
                {mediaPreview && (
                  <div className="media-preview">
                    {mediaType === "image" ? (
                      <Image src={mediaPreview} alt="Preview" className="w-16 h-16 rounded" />
                    ) : (
                      <video src={mediaPreview} className="w-16 h-16 rounded" controls />
                    )}
                  </div>
                )}
              </div>
              <button type="submit" className="post-button bg-blue-500 text-white px-4 py-2 rounded-lg w-full">
                {loading ? "Posting..." : "Post"}
              </button>
            </form>
          </div>

          {/* Display Posts */}
          <div>
            <h2 className="font-semibold text-lg">New Posts</h2>
            <ul className="space-y-4">
              {posts.length === 0 ? (
                <p className="text-center text-gray-500">No posts yet.</p>
              ) : (
                posts.map((post) => (
                  <li key={post._id} className="post-card p-4 border rounded-lg relative">
                    <div className="post-header flex justify-between items-center">
                      <h3 className="font-semibold">{post.author?.username || "Unknown User"}</h3>
                      <button onClick={() => handleDelete(post._id)} className="delete-btn text-red-500">
                        Delete
                      </button>
                    </div>
                    <p>{post.content}</p>
                    {post.image && (
                      <Image src={post.image} alt="Post" className="w-full h-auto rounded-lg mt-2" />
                    )}
                    {post.video && (
                      <video src={post.video} controls className="w-full h-auto rounded-lg mt-2" />
                    )}
                    {/* Post Actions */}
                    <div className="post-actions flex justify-around mt-4">
                    <div className="mt-2">
              <LikeButton postId={post._id} />
            </div>
                      <button onClick={() => toggleComments(post._id)} className="comment-btn">
                        💬 Comment
                      </button>
                      <button className="share-btn">🔗 Share</button>
                    </div>
                    {/* Comment Section */}
                    {expandedComments[post._id] && (
                      <div className="comment-section mt-2">
                        <ul className="comment-list space-y-2">
                          {post.comments && post.comments.length > 0 ? (
                            post.comments.map((comment) => (
                              <li key={comment._id} className="p-2 border rounded">
                               <p className="font-bold">{comment.username || 'Anonymous'}</p>
                               <p>{comment.content}</p>
                              </li>
                            ))
                          ) : (
                            <p className="text-gray-500 text-sm">No comments yet.</p>
                          )}
                        </ul>
                        <form onSubmit={(e) => handleComment(e, post._id)} className="mt-2 flex gap-2">
                          <input
                            type="text"
                            placeholder="Write a comment..."
                            value={commentInputs[post._id] || ""}
                            onChange={(e) => handleCommentInput(e, post._id)}
                            className="w-full border p-2 rounded"
                          />
                          <button type="submit" className="bg-blue-500 text-white px-3 py-2 rounded">
                            Post
                          </button>
                        </form>
                      </div>
                    )}
                  </li>
                ))
              )}
            </ul>
          </div>

           {/* Floating Rooms Button */}
      <Link href="/apartments">
        <button className="fixed bottom-20 right-10 bg-blue-500 text-white px-5 py-3 rounded-full shadow-lg hover:bg-blue-600">
         🏠 Apartments
        </button>
      </Link>
      

      
        </main>

        {/* Right Sidebar */}
        <aside className="bg-white p-4 rounded-lg shadow w-full lg:w-1/4 space-y-4">
          <h2 className="font-semibold text-lg">Trending Now</h2>
          <ul className="text-gray-500 space-y-2">
            <li>India's 25 fastest-growing jobs</li>
            <li>Fintech funding: India ranks third</li>
            <li>M&A deals surge</li>
          </ul>
          <hr />
          <div>
            <h2 className="font-semibold text-lg">Today's puzzles</h2>
            <ul className="text-gray-500 space-y-2">
              <li>Tango</li>
              <li>Queens</li>
              <li>Pinpoint</li>
            </ul>
          </div>
        </aside>
      </div>

      
      

      {/* Undo Deletion Notification */}
      {deletingPost && (
        <div className="undo-notification fixed bottom-0 left-1/2 transform -translate-x-1/2 bg-yellow-200 p-4 rounded shadow">
          <p>
            Post deleted.{" "}
            <button onClick={handleUndo} className="underline text-blue-600">
              Undo
            </button>
          </p>
        </div>
      )}

      {/* Simple fade-in animation */}
      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.2s ease-in-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      
    </div>
  );
}
