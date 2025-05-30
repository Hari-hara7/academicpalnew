import { motion } from "framer-motion";
import logo from "../assets/logo_academic_pal-removebg-preview.png";

const LogoLoader: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-black text-cyan-400 p-4 font-[Poppins] sm:font-[Orbitron]">
      
      {/* Glowing Logo */}
      <motion.img
        src={logo}
        alt="Academic Pal Logo"
        className="w-40 h-40 sm:w-52 sm:h-52 mb-6 sm:mb-8"
        animate={{
          scale: [1, 1.2, 1],
          filter: [
            "drop-shadow(0 0 20px cyan)",
            "drop-shadow(0 0 40px cyan)",
            "drop-shadow(0 0 20px cyan)",
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Interactive Title */}
      <motion.h1
        className="text-4xl sm:text-6xl font-extrabold tracking-wide relative z-10 text-center sm:font-bold"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
      >
        Academic Pal
      </motion.h1>

      {/* Shimmer Effect */}
      <motion.div
        className="w-36 sm:w-48 h-1 bg-gradient-to-r from-cyan-400 to-transparent rounded-full mt-3 sm:mt-4"
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      ></motion.div>

      {/* Loading Pulse */}
      <motion.div
        className="flex space-x-2 mt-4 sm:mt-6"
        animate={{ opacity: [1, 0.5, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-cyan-400"
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          ></motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default LogoLoader;
