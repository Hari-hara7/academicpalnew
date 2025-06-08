import { UploadCloud, FileStack, MessageSquareHeart } from "lucide-react";
import RoadmapForm from "@/components/RoadmapForm";
import RoadmapList from "@/components/RoadmapList";
import FeedbackForm from "@/components/FeedbackForm";

export default function RoadmapsPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-10 space-y-14">
      <h1 className="text-4xl font-extrabold text-center text-blue-500 drop-shadow-lg animate-pulse mt-8">
         Tech Roadmaps
      </h1>

      <section className="border border-white/20 rounded-xl p-6 bg-black/60 backdrop-blur-sm shadow-xl hover:shadow-blue-500/20 transition duration-300">
        <div className="flex items-center gap-2 mb-4">
          <UploadCloud className="text-blue-500" />
          <h2 className="text-2xl font-semibold">Upload Roadmap <span className="text-sm text-gray-400">(Admin Only)</span></h2>
        </div>
        <RoadmapForm />
      </section>

      <section className="border border-white/20 rounded-xl p-6 bg-black/60 backdrop-blur-sm shadow-xl hover:shadow-blue-500/20 transition duration-300">
        <div className="flex items-center gap-2 mb-4">
          <FileStack className="text-blue-500" />
          <h2 className="text-2xl font-semibold">Available Roadmaps</h2>
        </div>
        <RoadmapList />
      </section>

      <section className="border border-white/20 rounded-xl p-6 bg-black/60 backdrop-blur-sm shadow-xl hover:shadow-blue-500/20 transition duration-300">
        <div className="flex items-center gap-2 mb-4">
          <MessageSquareHeart className="text-blue-500" />
          <h2 className="text-2xl font-semibold">Give Feedback on Roadmaps</h2>
        </div>
        <FeedbackForm />
      </section>
    </main>
  );
}
