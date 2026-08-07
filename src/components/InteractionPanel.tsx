"use client";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { MessageSquare, Send, X, Trash2, Hand } from "lucide-react";
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
  const [reactions, setReactions] = useState({ question: 0 });
  const [myQuestionActive, setMyQuestionActive] = useState(false);
  const [comments, setComments] = useState<(string | CommentData)[]>([]);
  const [newComment, setNewComment] = useState("");
  const [commentName, setCommentName] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Restore local state
    const savedState = localStorage.getItem(`question-active-global`);
    if (savedState === 'true') {
      setMyQuestionActive(true);
    } else {
      setMyQuestionActive(false);
    }
    
    // Fetch initial data
    const fetchData = async () => {
      try {
        const [reactionsRes, commentsRes] = await Promise.all([
          fetch(`/api/reactions?slideId=global&t=${Date.now()}`, { cache: "no-store" }),
          fetch(`/api/comments?slideId=${slideId}&t=${Date.now()}`, { cache: "no-store" })
        ]);
        
        if (reactionsRes.ok) {
          const rData = await reactionsRes.json();
          setReactions(rData.reactions || { question: 0 });
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

  // Live polling for comments and reactions
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const [res, rRes] = await Promise.all([
          fetch(`/api/comments?slideId=${slideId}&t=${Date.now()}`, { cache: "no-store" }),
          fetch(`/api/reactions?slideId=global&t=${Date.now()}`, { cache: "no-store" })
        ]);
        
        if (res.ok) {
          const data = await res.json();
          setComments(data.comments || []);
        }
        if (rRes.ok) {
          const rData = await rRes.json();
          setReactions(rData.reactions || { question: 0 });
        }
      } catch (err) {}
    }, 1000);
    return () => clearInterval(interval);
  }, [showComments, slideId]);

  const handleToggleQuestion = async () => {
    const newState = !myQuestionActive;
    setMyQuestionActive(newState);
    localStorage.setItem(`question-active-global`, String(newState));
    
    // Optimistic update
    setReactions(prev => ({ 
      ...prev, 
      question: Math.max(0, prev.question + (newState ? 1 : -1)) 
    }));
    
    try {
      await fetch('/api/reactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slideId: 'global', type: 'question', increment: newState ? 1 : -1 })
      });
    } catch (e) {
      // Revert on error
      setMyQuestionActive(!newState);
      localStorage.setItem(`question-active-global`, String(!newState));
      setReactions(prev => ({ 
        ...prev, 
        question: Math.max(0, prev.question + (!newState ? 1 : -1)) 
      }));
    }
  };

  const isQuestionActiveGlobal = reactions.question > 0 || myQuestionActive;

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
      <div className="flex items-center gap-3 justify-end w-full">
        {/* Question Toggle Button */}
        <button 
          onClick={handleToggleQuestion}
          title={isQuestionActiveGlobal ? "Someone has a question!" : "I have a question"}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl shadow-md backdrop-blur-md border transition-all duration-300 ${
            isQuestionActiveGlobal 
              ? 'bg-[var(--color-brand-seafoam-light)]/30 border-[var(--color-brand-seafoam)] text-[var(--color-brand-navy)] shadow-inner transform translate-y-0.5' 
              : 'bg-white border-gray-200 text-gray-500 hover:text-[var(--color-brand-navy)] hover:bg-gray-50 hover:-translate-y-0.5'
          }`}
        >
          <Hand size={20} className={isQuestionActiveGlobal ? 'text-[var(--color-brand-seafoam)] stroke-[2.5]' : ''} />
          {isQuestionActiveGlobal && <span className="font-medium text-sm">Question</span>}
        </button>
        
        {/* Comments Toggle Button */}
        <button 
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white backdrop-blur-md border border-gray-200 text-[var(--color-brand-blue)] hover:text-[var(--color-brand-navy)] hover:bg-gray-50 shadow-md transition-all duration-300 hover:-translate-y-0.5"
        >
          <MessageSquare size={20} />
          <span className="font-medium text-sm">{comments.length} Comments</span>
        </button>
      </div>

      {mounted && createPortal(
        <AnimatePresence>
          {showComments && (
          <motion.div 
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 w-80 h-full bg-[#F9F9F9]/95 backdrop-blur-xl border-l border-gray-200 shadow-[rgba(12,19,58,0.1)_0px_10px_40px] z-[100] flex flex-col text-left font-satoshi"
          >
            <div className="p-5 border-b border-gray-200 flex justify-between items-center bg-white">
              <h3 className="text-[var(--color-brand-navy)] font-bold flex items-center gap-2 font-montserrat">
                <MessageSquare size={18} className="text-[var(--color-brand-blue)]" />
                Comments
              </h3>
              <button 
                onClick={() => setShowComments(false)}
                className="text-gray-400 hover:text-[var(--color-brand-navy)] transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {comments.length === 0 ? (
                <p className="text-gray-400 text-sm italic text-center py-8">No comments yet. Be the first!</p>
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
                    <div key={isLegacy ? i : (c as CommentData).id} className="group bg-white p-4 rounded-xl text-sm text-[var(--color-brand-navy)] shadow-sm border border-gray-100 relative">
                      <div className="flex justify-between items-start mb-1.5">
                        <span className="font-bold text-[var(--color-brand-blue)]">{name}</span>
                        <div className="flex items-center gap-3">
                          {timestamp && (
                            <span className="text-[10px] text-gray-400 font-mono">
                              {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          )}
                          <button
                            onClick={() => handleDeleteComment(c)}
                            className="opacity-0 group-hover:opacity-100 text-gray-300 hover:text-red-500 transition-all focus:opacity-100"
                            title="Delete comment"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                      <div className="text-[var(--color-brand-navy-light)] leading-relaxed">
                        {text}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
            
            <div className="p-5 border-t border-gray-200 bg-white">
              <form onSubmit={handleCommentSubmit} className="flex flex-col gap-3">
                <input
                  type="text"
                  value={commentName}
                  onChange={(e) => setCommentName(e.target.value)}
                  placeholder="Your Name (optional)"
                  className="bg-[#F9F9F9] border border-gray-200 rounded-xl px-4 py-2 text-sm text-[var(--color-brand-navy)] placeholder:text-gray-400 focus:outline-none focus:border-[var(--color-brand-blue)] focus:ring-1 focus:ring-[var(--color-brand-blue)] transition-all"
                />
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a live comment..."
                    className="flex-1 bg-[#F9F9F9] border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-[var(--color-brand-navy)] placeholder:text-gray-400 focus:outline-none focus:border-[var(--color-brand-blue)] focus:ring-1 focus:ring-[var(--color-brand-blue)] transition-all"
                  />
                  <button 
                    type="submit"
                    disabled={!newComment.trim() || isSubmitting}
                    className="bg-[var(--color-brand-blue)] hover:bg-[#1E306E] disabled:bg-gray-200 disabled:text-gray-400 text-white p-2.5 px-4 rounded-xl shadow-sm transition-colors flex items-center justify-center"
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
