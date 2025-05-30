'use client';

import { Resource } from '@/types/resource'; // adjust the path as per your structure
import {
  FaLink,
  FaFileAlt,
  FaUser,
  FaExternalLinkAlt,
  FaBook,
  FaGraduationCap,
} from 'react-icons/fa';
import { motion } from 'framer-motion';

interface Props {
  resource: Resource;
}

const ResourceCard: React.FC<Props> = ({ resource }) => {
  return (
    <motion.div
      className="p-6 border border-cyan-300/40 rounded-xl shadow-2xl bg-cyan-500/20 backdrop-blur-2xl hover:scale-105 transition-transform duration-300 ease-in-out w-full max-w-md mx-auto"
      whileHover={{ scale: 1.05 }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        {resource.resourceType === 'link' ? (
          <FaLink className="text-cyan-400 text-4xl" />
        ) : (
          <FaFileAlt className="text-yellow-500 text-4xl" />
        )}
        <h2 className="font-extrabold text-xl text-white leading-tight">
          {resource.resourceName}
        </h2>
      </div>

      {/* Details */}
      <div className="space-y-2 text-gray-300">
        <p className="flex items-center gap-2">
          <FaExternalLinkAlt className="text-cyan-400" />
          <span>Type: {resource.resourceType}</span>
        </p>
        <p className="flex items-center gap-2">
          <FaUser className="text-yellow-400" />
          <span>Uploaded by: {resource.userEmail}</span>
        </p>
        <p className="flex items-center gap-2">
          <FaGraduationCap className="text-purple-400" />
          <span>
            Year: {resource.year}, Semester: {resource.semester}
          </span>
        </p>
        <p className="flex items-center gap-2">
          <FaBook className="text-green-400" />
          <span>
            Branch: {resource.branch}, Subject: {resource.subject}
          </span>
        </p>
      </div>

      {/* Action Buttons */}
      <div className="mt-4 space-y-2">
        {resource.shareableLink && (
          <a
            href={resource.shareableLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-cyan-500/30 backdrop-blur-xl text-white font-semibold transition-all border border-cyan-300/50 shadow-lg hover:bg-cyan-500/50 hover:shadow-xl"
          >
            <FaExternalLinkAlt /> Shareable Link
          </a>
        )}
      </div>
    </motion.div>
  );
};

export default ResourceCard;
