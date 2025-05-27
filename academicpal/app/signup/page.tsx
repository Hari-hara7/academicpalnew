'use client';

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
import { auth } from "@/lib/firebase"; // adjust path as needed
import { FaGoogle, FaGithub, FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { Typewriter } from "react-simple-typewriter";
import ReCAPTCHA from "react-google-recaptcha";


const SignUp: React.FC = () => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [usn, setUsn] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isVerified, setIsVerified] = useState(false);

  const handleCaptchaChange = (value: string | null) => {
    setIsVerified(!!value);
  };

  const handleGoogleSignUp = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Google User:", user);
      router.push("/dashboard"); // Navigate to home page (adjust path)
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  const handleGitHubSignUp = async () => {
    const provider = new GithubAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("GitHub User:", user);
      router.push("/dashboard");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isVerified) {
      setError("Please complete the CAPTCHA verification.");
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@nmamit\.in$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email ending with @nmamit.in");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-black text-white p-6">
      {/* Sign-Up Section */}
      <div className="md:w-1/2 flex flex-col items-center">
        <div className="text-center mb-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            Join{" "}
            <span className="text-yellow-400">
              <Typewriter
                words={[
                  "Academic Pal",
                  "Your Learning Companion",
                  "A Smarter Future",
                ]}
                loop={0}
                cursor
                cursorStyle="|"
                typeSpeed={80}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </span>
          </h1>
          <p className="mt-2 text-base sm:text-lg md:text-xl text-gray-400">
            Sign up to access personalized academic tools and resources.
          </p>
        </div>

        <form
          onSubmit={handleSignUp}
          className="w-full sm:w-3/4 md:w-2/3 lg:w-full flex flex-col gap-6 bg-gray-900 p-8 rounded-xl shadow-2xl"
        >
          {/* Full Name Input */}
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="text-sm sm:text-base font-semibold text-gray-300"
            >
              Full Name:
            </label>
            <div className="flex items-center bg-gray-800 p-3 rounded-lg border border-gray-700 hover:border-gray-600 transition-all">
              <FaUser className="text-gray-400 mr-3" />
              <input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-transparent text-white placeholder-gray-500 outline-none text-sm sm:text-base"
                required
              />
            </div>
          </div>

          {/* USN Input */}
          <div className="space-y-2">
            <label
              htmlFor="usn"
              className="text-sm sm:text-base font-semibold text-gray-300"
            >
              USN:
            </label>
            <div className="flex items-center bg-gray-800 p-3 rounded-lg border border-gray-700 hover:border-gray-600 transition-all">
              <FaUser className="text-gray-400 mr-3" />
              <input
                id="usn"
                type="text"
                placeholder="Enter your USN"
                value={usn}
                onChange={(e) => setUsn(e.target.value)}
                className="w-full bg-transparent text-white placeholder-gray-500 outline-none text-sm sm:text-base"
                required
              />
            </div>
          </div>

          {/* Email Input */}
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm sm:text-base font-semibold text-gray-300"
            >
              Email Address:
            </label>
            <div className="flex items-center bg-gray-800 p-3 rounded-lg border border-gray-700 hover:border-gray-600 transition-all">
              <FaEnvelope className="text-gray-400 mr-3" />
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent text-white placeholder-gray-500 outline-none text-sm sm:text-base"
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-sm sm:text-base font-semibold text-gray-300"
            >
              Password:
            </label>
            <div className="flex items-center bg-gray-800 p-3 rounded-lg border border-gray-700 hover:border-gray-600 transition-all">
              <FaLock className="text-gray-400 mr-3" />
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent text-white placeholder-gray-500 outline-none text-sm sm:text-base"
                required
              />
            </div>
          </div>

          {/* reCAPTCHA */}
          <div className="flex justify-center mb-4">
            <ReCAPTCHA
              sitekey="6LfOfOUqAAAAABLxxBJJ9636ZFZ-tKVBKx2VU0Uq"
              onChange={handleCaptchaChange}
            />
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-red-500 text-center text-sm sm:text-base animate-pulse">
              {error}
            </p>
          )}

          {/* Sign Up Button */}
          <button
            type="submit"
            className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 text-white py-3 rounded-lg text-sm sm:text-base font-semibold hover:from-green-300 hover:to-purple-400 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Sign Up
          </button>
        </form>

        {/* Social Sign-Up Buttons */}
        <div className="mt-6 space-y-4 w-full sm:w-3/4 md:w-2/3 lg:w-full">
          <button
            onClick={handleGoogleSignUp}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-yellow-500 text-white py-3 rounded-lg text-base sm:text-lg font-semibold hover:from-red-400 hover:to-yellow-400 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            <FaGoogle className="text-xl" />
            <span>Sign Up with Google</span>
          </button>
          <button
            onClick={handleGitHubSignUp}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-gray-700 to-gray-900 text-white py-3 rounded-lg text-base sm:text-lg font-semibold hover:from-gray-600 hover:to-gray-800 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            <FaGithub className="text-xl" />
            <span>Sign Up with GitHub</span>
          </button>
        </div>

        {/* Login Link */}
        <div className="mt-6 text-center">
          <p className="text-sm sm:text-base text-gray-400">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-yellow-500 font-semibold hover:underline hover:text-yellow-400 transition-all"
            >
              Login
            </Link>
          </p>
        </div>
      </div>

      {/* Image Section */}
      <div className="hidden md:flex w-1/2 justify-center">
        <Image
             src="/image1.png"//academicpal/public/image1.png
             alt="Login Illustration"
             width={400}       // specify your image width here
             height={300}      // specify your image height here
             className="w-3/4 h-auto"
           />
      </div>
    </div>
  );
};

export default SignUp;
