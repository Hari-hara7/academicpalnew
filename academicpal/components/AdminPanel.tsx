'use client';

import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { dbA } from "@/services/firebaseConfig"; // Adjust path to your Project A firebase config
import { FaLink, FaFileAlt, FaCloudUploadAlt, FaBook } from "react-icons/fa";

export default function AdminPanel({ user }: { user: any }) {
  const [resourceName, setResourceName] = useState("");
  const [shareableLink, setShareableLink] = useState("");
  const [year, setYear] = useState("");
  const [semester, setSemester] = useState("");
  const [branch, setBranch] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (user && user.email?.endsWith("@nmamit.in")) {
      try {
        await addDoc(collection(dbA, "resources"), {
          userEmail: user.email,
          resourceName,
          resourceUrl: shareableLink, // using this as main field
          year,
          semester,
          branch,
          subject,
          createdAt: new Date(),
        });

        setMessage("Resource uploaded successfully!");
        setResourceName("");
        setShareableLink("");
        setYear("");
        setSemester("");
        setBranch("");
        setSubject("");
      } catch (error) {
        console.error("Error uploading resource:", error);
        setMessage("Upload failed. Try again.");
      }
    } else {
      alert("Only @nmamit.in emails are allowed to upload resources.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-900/70 backdrop-blur-lg p-8 rounded-2xl shadow-2xl max-w-2xl mx-auto mt-8 border border-gray-700"
    >
      <h2 className="text-3xl font-extrabold text-cyan-400 mb-6 text-center flex items-center justify-center gap-2">
        <FaCloudUploadAlt className="text-4xl text-cyan-400" />
        Upload Resource
      </h2>

      {message && (
        <div className="text-center text-sm text-green-400 mb-4">
          {message}
        </div>
      )}

      {/* Resource Name */}
      <div className="mb-4">
        <label htmlFor="resourceName" className="text-gray-300 font-medium mb-2 block">
          <FaFileAlt className="inline-block mr-2 text-gray-400" />
          Resource Name
        </label>
        <input
          id="resourceName"
          type="text"
          value={resourceName}
          onChange={(e) => setResourceName(e.target.value)}
          placeholder="Enter Resource Name"
          className="w-full p-3 border border-gray-600 bg-gray-800/80 text-white rounded-xl focus:ring-2 focus:ring-cyan-400 outline-none"
          required
        />
      </div>

      {/* Shareable Link */}
      <div className="mb-4">
        <label htmlFor="shareableLink" className="text-gray-300 font-medium mb-2 block">
          <FaLink className="inline-block mr-2 text-gray-400" />
          Shareable Link (Drive, etc.)
        </label>
        <input
          id="shareableLink"
          type="url"
          value={shareableLink}
          onChange={(e) => setShareableLink(e.target.value)}
          placeholder="Enter Shareable Link"
          className="w-full p-3 border border-gray-600 bg-gray-800/80 text-white rounded-xl focus:ring-2 focus:ring-cyan-400 outline-none"
          required
        />
      </div>

      {/* Dropdowns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="text-gray-300 font-medium mb-2 block">Year</label>
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="w-full p-3 border border-gray-600 bg-gray-800/80 text-white rounded-xl focus:ring-2 focus:ring-cyan-400 outline-none"
            required
          >
            <option value="">Select Year</option>
            <option value="1st">1st Year</option>
            <option value="2nd">2nd Year</option>
            <option value="3rd">3rd Year</option>
            <option value="4th">4th Year</option>
          </select>
        </div>

        <div>
          <label className="text-gray-300 font-medium mb-2 block">Semester</label>
          <select
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            className="w-full p-3 border border-gray-600 bg-gray-800/80 text-white rounded-xl focus:ring-2 focus:ring-cyan-400 outline-none"
            required
          >
            <option value="">Select Semester</option>
            {[...Array(8)].map((_, i) => (
              <option key={i + 1} value={`${i + 1}`}>
                {`${i + 1}th Semester`}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Branch */}
      <div className="mb-4">
        <label className="text-gray-300 font-medium mb-2 block">Branch</label>
        <select
          value={branch}
          onChange={(e) => setBranch(e.target.value)}
          className="w-full p-3 border border-gray-600 bg-gray-800/80 text-white rounded-xl focus:ring-2 focus:ring-cyan-400 outline-none"
          required
        >
          <option value="">Branch</option>
          {[
            "CSE",
            "CSE-FSD",
            "ISE",
            "AIML",
            "AIDS",
            "CyberSecurity",
            "CEC",
            "ECE",
            "ECE-VLSI",
            "ME",
            "Biotechnology",
            "CE",
            "EEE",
          ].map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      {/* Subject */}
      <div className="mb-6">
        <label className="text-gray-300 font-medium mb-2 block">
          <FaBook className="inline-block mr-2 text-gray-400" />
          Subject
        </label>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Enter Subject Name"
          className="w-full p-3 border border-gray-600 bg-gray-800/80 text-white rounded-xl focus:ring-2 focus:ring-cyan-400 outline-none"
          required
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full px-6 py-3 bg-cyan-500 text-white font-semibold rounded-xl hover:bg-cyan-400 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
      >
        <FaCloudUploadAlt className="text-lg" />
        Upload Resource
      </button>
    </form>
  );
}
