"use client";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { ThumbsUp, Heart, MessageSquare, Send, X, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export type CommentData = {
  id: string;
  name: string;
  text: string;
  timestamp: string;
};

export function InteractionPanel({ slideId }: { slideId: string }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const [reactions, setReactions] = useState({ thumbsUp: 0, heart: 0 });
  const [comments, setComments] = useState<(string | CommentData)[]>([]);
  const [newComment, setNewComment] = useState("");
  const [commentName, setCommentName] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Reset state when slide changes
    setShowComments(false);
    setNewComment("");
    
    // Fetch initial data
    const fetchData = async () => {
      try {
        const [reactionsRes, commentsRes] = await Promise.all([
          fetch(`/api/reactions?slideId=${slideId}&t=${Date.now()}`, { cache: "no-store" }),
          fetch(`/api/comments?slideId=${slideId}&t=${Date.now()}`, { cache: "no-store" })
        ]);
        
        if (reactionsRes.ok) {
          const rData = await reactionsRes.json();
          setReactions(rData.reactions || { thumbsUp: 0, heart: 0 });
        }
        
        if (commentsRes.ok) {
          const cData = await commentsRes.json();
          setComments(cData.comments || []);
        }
      } catch (err) {
        console.error("Failed to fetch interactions", err);
      }
    };
    
    fetchData();
  }, [slideId]);

  // Live polling for comments
  useEffect(() => {
    if (!showComments) return;
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/comments?slideId=${slideId}&t=${Date.now()}`, { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          setComments(data.comments || []);
        }
      } catch (err) {}
    }, 3000);
    return () => clearInterval(interval);
  }, [showComments, slideId]);

  const handleReact = async (type: 'thumbsUp' | 'heart') => {
    setReactions(prev => ({ ...prev, [type]: prev[type] + 1 }));
    try {
      await fetch('/api/reactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slideId, type })
      });
    } catch (e) {
      setReactions(prev => ({ ...prev, [type]: prev[type] - 1 }));
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || isSubmitting) return;
    
    setIsSubmitting(true);
    const displayName = commentName.trim() || "Anonymous";
    
    const commentObj: CommentData = {
      id: crypto.randomUUID(),
      name: displayName,
      text: newComment.trim(),
      timestamp: new Date().toISOString()
    };
    
    const commentPayload = JSON.stringify(commentObj);
    
    setComments(prev => [...prev, commentPayload]);
    setNewComment("");
    
    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slideId, comment: commentPayload })
      });
      if (!res.ok) throw new Error("POST failed");
    } catch (err) {
      setComments(prev => prev.filter(c => c !== commentPayload));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteComment = async (c: string | CommentData) => {
    const commentPayload = typeof c === 'string' ? c : JSON.stringify(c);
    setComments(prev => prev.filter(item => {
      const itemPayload = typeof item === 'string' ? item : JSON.stringify(item);
      return itemPayload !== commentPayload;
    }));
    try {
      await fetch('/api/comments', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slideId, comment: commentPayload })
      });
    } catch (err) {
    }
  };

  return (
    <>
      <div className="bg-zinc-900/90 backdrop-blur-md border border-zinc-800 rounded-2xl shadow-2xl p-4 w-full max-w-2xl mx-auto transition-all">
      <div className="flex items-center justify-between">
        <div className="flex gap-4">
          <button 
            onClick={() => handleReact('thumbsUp')}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-zinc-800 transition-colors text-zinc-300 hover:text-white"
          >
            <ThumbsUp size={18} className="text-yellow-500" />
            <span className="font-mono text-sm">{reactions.thumbsUp}</span>
          </button>
          
          <button 
            onClick={() => handleReact('heart')}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-zinc-800 transition-colors text-zinc-300 hover:text-white"
          >
            <Heart size={18} className="text-pink-500" />
            <span className="font-mono text-sm">{reactions.heart}</span>
          </button>
        </div>
        
        <button 
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 transition-colors"
        >
          <MessageSquare size={18} />
          <span className="font-medium text-sm">{comments.length} Comments</span>
        </button>
      </div>
      </div>

      {mounted && createPortal(
        <AnimatePresence>
          {showComments && (
          <motion.div 
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 w-80 h-full bg-zinc-900/95 backdrop-blur-xl border-l border-zinc-800 shadow-2xl z-[100] flex flex-col text-left"
          >
            <div className="p-5 border-b border-zinc-800 flex justify-between items-center bg-zinc-900">
              <h3 className="text-zinc-200 font-medium flex items-center gap-2">
                <MessageSquare size={18} className="text-indigo-400" />
                Comments
              </h3>
              <button 
                onClick={() => setShowComments(false)}
                className="text-zinc-500 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {comments.length === 0 ? (
                <p className="text-zinc-500 text-sm italic text-center py-8">No comments yet. Be the first!</p>
              ) : (
                comments.map((rawC, i) => {
                  let c = rawC;
                  if (typeof rawC === 'string' && rawC.trim().startsWith('{')) {
                    try { c = JSON.parse(rawC); } catch (e) {}
                  }
                  
                  const isLegacy = typeof c === 'string';
                  const name = isLegacy ? (c as string).split(': ')[0] : (c as CommentData).name;
                  const text = isLegacy ? (c as string).substring((c as string).indexOf(': ') + 2) : (c as CommentData).text;
                  const timestamp = isLegacy ? null : new Date((c as CommentData).timestamp);

                  return (
                    <div key={isLegacy ? i : (c as CommentData).id} className="group bg-zinc-800/60 p-4 rounded-xl text-sm text-zinc-200 shadow-sm border border-zinc-700/50 relative">
                      <div className="flex justify-between items-start mb-1.5">
                        <span className="font-bold text-indigo-400">{name}</span>
                        <div className="flex items-center gap-3">
                          {timestamp && (
                            <span className="text-[10px] text-zinc-500 font-mono">
                              {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          )}
                          <button
                            onClick={() => handleDeleteComment(c)}
                            className="opacity-0 group-hover:opacity-100 text-zinc-500 hover:text-red-400 transition-all focus:opacity-100"
                            title="Delete comment"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                      <div className="text-zinc-300 leading-relaxed">
                        {text}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
            
            <div className="p-5 border-t border-zinc-800 bg-zinc-900">
              <form onSubmit={handleCommentSubmit} className="flex flex-col gap-3">
                <input
                  type="text"
                  value={commentName}
                  onChange={(e) => setCommentName(e.target.value)}
                  placeholder="Your Name (optional)"
                  className="bg-black border border-zinc-700 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
                />
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a live comment..."
                    className="flex-1 bg-black border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                  <button 
                    type="submit"
                    disabled={!newComment.trim() || isSubmitting}
                    className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-zinc-800 disabled:text-zinc-500 text-white p-2.5 px-4 rounded-xl transition-colors flex items-center justify-center"
                  >
                    <Send size={18} />
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
