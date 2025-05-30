'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { dbA } from '@/services/firebaseConfig';
import ResourceCard from '@/components/ResourceCard';
import { Search, Filter, Book, GraduationCap, Calendar } from 'lucide-react';

type Resource = {
  id: string;
  year: string;
  semester: number;
  branch: string;
  subject: string;
  [key: string]: any; // For any extra fields
};

const Home = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [filteredResources, setFilteredResources] = useState<Resource[]>([]);
  const [year, setYear] = useState('');
  const [semester, setSemester] = useState('');
  const [branch, setBranch] = useState('');
  const [subject, setSubject] = useState('');

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const querySnapshot = await getDocs(collection(dbA, 'resources'));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Resource[];
        setResources(data);
        setFilteredResources(data);
      } catch (error) {
        console.error('Error fetching resources:', error);
      }
    };

    fetchResources();
  }, []);

  useEffect(() => {
    let filtered = resources;

    if (year) filtered = filtered.filter((res) => res.year === year);
    if (semester) filtered = filtered.filter((res) => res.semester.toString() === semester);
    if (branch) {
      const b = branch.trim().toLowerCase();
      filtered = filtered.filter((res) => res.branch?.trim().toLowerCase() === b);
    }
    if (subject) {
      const s = subject.trim().toLowerCase();
      filtered = filtered.filter((res) => res.subject?.trim().toLowerCase().includes(s));
    }

    setFilteredResources(filtered);
  }, [year, semester, branch, subject, resources]);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-cyan-400 mb-6">
        📚 Explore Resources
      </h1>

      <div className="flex flex-wrap md:flex-row flex-col gap-4 justify-center bg-opacity-80 bg-gray-900 p-6 rounded-xl shadow-lg backdrop-blur-md border border-gray-700 mb-10 overflow-x-auto whitespace-nowrap">
        {/* Year */}
        <div className="relative flex items-center w-full md:w-auto">
          <GraduationCap className="absolute left-3 text-gray-400" size={20} />
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="w-full md:w-auto pl-10 pr-4 py-2 border rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-cyan-400"
          >
            <option value="">Year</option>
            <option value="1st">1st Year</option>
            <option value="2nd">2nd Year</option>
            <option value="3rd">3rd Year</option>
            <option value="4th">4th Year</option>
          </select>
        </div>

        {/* Semester */}
        <div className="relative flex items-center w-full md:w-auto">
          <Calendar className="absolute left-3 text-gray-400" size={20} />
          <select
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            className="w-full md:w-auto pl-10 pr-4 py-2 border rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-cyan-400"
          >
            <option value="">Semester</option>
            {Array.from({ length: 8 }, (_, i) => (
              <option key={i} value={`${i + 1}`}>{`${i + 1}th Semester`}</option>
            ))}
          </select>
        </div>

        {/* Branch */}
        <div className="relative flex items-center w-full md:w-auto">
          <Filter className="absolute left-3 text-gray-400" size={20} />
          <select
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            className="w-full md:w-auto pl-10 pr-4 py-2 border rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-cyan-400"
          >
            <option value="">Branch</option>
            <option value="CSE">CSE</option>
            <option value="CSE-FSD">CSE Full Stack Development</option>
            <option value="ISE">ISE</option>
            <option value="AIML">AIML</option>
            <option value="AIDS">AIDS</option>
            <option value="CyberSecurity">Cyber Security</option>
            <option value="CEC">CEC</option>
            <option value="ECE">ECE</option>
            <option value="ECE-VLSI">ECE VLSI</option>
            <option value="ME">Mechanical</option>
            <option value="Biotechnology">Biotechnology</option>
            <option value="CE">Civil</option>
            <option value="EEE">EEE</option>
          </select>
        </div>

        {/* Subject */}
        <div className="relative flex items-center w-full md:w-auto">
          <Book className="absolute left-3 text-gray-400" size={20} />
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Search Subject"
            className="w-full md:w-auto pl-10 pr-4 py-2 border rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-cyan-400"
          />
        </div>
      </div>

      {/* Resource Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredResources.length > 0 ? (
          filteredResources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))
        ) : (
          <div className="col-span-3 text-center">
            <p className="text-gray-400 text-lg font-semibold">
              ❌ No resources found. Try adjusting the filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
