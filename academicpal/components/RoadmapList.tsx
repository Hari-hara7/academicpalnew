"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { ShineBorder } from "@/components/magicui/shine-border";
import { ExternalLink, Bookmark, ThumbsUp, MessageCircle } from "lucide-react";
import { getSessionId } from "@/lib/session";

type Roadmap = {
  id: string;
  title: string;
  description?: string;
  link: string;
  upvotes: number;
  bookmarks: number;
  comments: number;
  hasUpvoted: boolean;
  hasBookmarked: boolean;
};

type Comment = {
  id: string;
  content: string;
  createdAt: string;
};

export default function RoadmapList() {
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeCommentsRoadmapId, setActiveCommentsRoadmapId] = useState<string | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const sessionId = typeof window !== "undefined" ? getSessionId() : "";

  const fetchRoadmaps = async () => {
    const res = await axios.get("/api/roadmaps", { params: { sessionId } });
    setRoadmaps(res.data);
  };

  const fetchComments = async (roadmapId: string) => {
    const res = await axios.get("/api/comment", { params: { roadmapId } });
    setComments(res.data);
  };

  useEffect(() => {
    fetchRoadmaps();
  }, []);

  const handleBookmark = async (roadmapId: string) => {
    setLoading(true);
    await axios.post("/api/bookmark", { roadmapId, sessionId });
    await fetchRoadmaps();
    setLoading(false);
  };

  const handleUpvote = async (roadmapId: string) => {
    setLoading(true);
    await axios.post("/api/upvote", { roadmapId, sessionId });
    await fetchRoadmaps();
    setLoading(false);
  };

  const toggleComments = async (roadmapId: string) => {
    if (activeCommentsRoadmapId === roadmapId) {
      // close if open
      setActiveCommentsRoadmapId(null);
      setComments([]);
    } else {
      setActiveCommentsRoadmapId(roadmapId);
      await fetchComments(roadmapId);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    setLoading(true);
    await axios.post("/api/comment", {
      roadmapId: activeCommentsRoadmapId,
      sessionId,
      content: newComment,
    });
    setNewComment("");
    await fetchComments(activeCommentsRoadmapId!);
    await fetchRoadmaps();
    setLoading(false);
  };

  if (roadmaps.length === 0)
    return (
      <p className="text-gray-400 text-center mt-10 font-inter text-lg">
        No roadmaps available yet.
      </p>
    );

  return (
   <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 px-4 sm:px-6 max-w-6xl mx-auto font-inter">

      {roadmaps.map((r) => (
        <Card
          key={r.id}
          className="relative bg-black text-white border-white/20 hover:shadow-blue-500/40 transition-shadow duration-300"
          style={{ fontFeatureSettings: '"liga" 1' }}
        >
          <ShineBorder shineColor={["#3b82f6", "#60a5fa", "#93c5fd"]} />
          <CardHeader>
            <CardTitle className="text-white font-semibold text-xl tracking-wide drop-shadow-sm">
              {r.title}
            </CardTitle>
            {r.description && (
              <CardDescription className="text-gray-400 mt-1 leading-relaxed">
                {r.description}
              </CardDescription>
            )}
          </CardHeader>

          <CardFooter className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 w-full">

              <div className="flex gap-3 items-center text-sm">
                <Button
                  size="icon"
                  onClick={() => handleBookmark(r.id)}
                  disabled={loading}
                  className={`bg-transparent ${
                    r.hasBookmarked ? "text-yellow-400" : "text-blue-400"
                  } hover:text-white border border-blue-400`}
                >
                  <Bookmark className="w-5 h-5" />
                </Button>
                <span>{r.bookmarks}</span>

                <Button
                  size="icon"
                  onClick={() => handleUpvote(r.id)}
                  disabled={loading}
                  className={`bg-transparent ${
                    r.hasUpvoted ? "text-green-400" : "text-white"
                  } hover:text-white border border-green-400`}
                >
                  <ThumbsUp className="w-5 h-5" />
                </Button>
                <span>{r.upvotes}</span>

                <Button
                  size="icon"
                  onClick={() => toggleComments(r.id)}
                  className="bg-transparent text-white hover:text-white border border-gray-400"
                >
                  <MessageCircle className="w-5 h-5" />
                </Button>
                <span>{r.comments}</span>
              </div>

              <Button
                asChild
                variant="outline"
                className="flex items-center gap-2 bg-black text-white border-blue-400 hover:bg-black hover:text-white transition-colors duration-300"
              >
                <a
                  href={r.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  Open
                  <ExternalLink className="w-5 h-5" />
                </a>
              </Button>
            </div>

            {/* Comments section */}
            {activeCommentsRoadmapId === r.id && (
              <div className="bg-gray-900 p-4 rounded-md max-h-72 overflow-y-auto">
                {comments.length === 0 && (
                  <p className="text-gray-500 text-sm">No comments yet.</p>
                )}
                {comments.map((c) => (
                  <div
                    key={c.id}
                    className="border-b border-gray-700 py-2 last:border-b-0"
                  >
                    <p className="text-gray-300 text-sm">{c.content}</p>
                    <p className="text-gray-500 text-xs">
                      {new Date(c.createdAt).toLocaleString()}
                    </p>
                  </div>
                ))}
           <div className="mt-2 flex flex-col sm:flex-row gap-2">

                  <textarea
                    className="flex-grow rounded-md bg-black text-white border border-gray-600 p-2 resize-none"
                    rows={2}
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    disabled={loading}
                  />
                  <Button
                    onClick={handleAddComment}
                    disabled={loading || !newComment.trim()}
                  >
                    Add
                  </Button>
                </div>
              </div>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
