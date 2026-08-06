"use client";
import { useState, useEffect } from "react";
import { ThumbsUp, Heart, MessageSquare, Send, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function InteractionPanel({ slideId }: { slideId: string }) {
  const [reactions, setReactions] = useState({ thumbsUp: 0, heart: 0 });
  const [comments, setComments] = useState<string[]>([]);
  const [newComment, setNewComment] = useState("");
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
          fetch(`/api/reactions?slideId=${slideId}`),
          fetch(`/api/comments?slideId=${slideId}`)
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
    const commentText = newComment.trim();
    
    setComments(prev => [...prev, commentText]);
    setNewComment("");
    
    try {
      await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slideId, comment: commentText })
      });
    } catch (err) {
      setComments(prev => prev.filter(c => c !== commentText));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
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
                comments.map((c, i) => (
                  <div key={i} className="bg-zinc-800/60 p-4 rounded-xl text-sm text-zinc-200 shadow-sm border border-zinc-700/50">
                    {c}
                  </div>
                ))
              )}
            </div>
            
            <div className="p-5 border-t border-zinc-800 bg-zinc-900">
              <form onSubmit={handleCommentSubmit} className="flex gap-3">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="flex-1 bg-black border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
                />
                <button 
                  type="submit"
                  disabled={!newComment.trim() || isSubmitting}
                  className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-zinc-800 disabled:text-zinc-500 text-white p-2.5 px-4 rounded-xl transition-colors flex items-center justify-center"
                >
                  <Send size={18} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
