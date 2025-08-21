"use client";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-white to-purple-200 flex flex-col font-sans">
      {/* Hero Section with Glassmorphism */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6 py-16 relative overflow-hidden">
        {/* Animated SVG background */}
        <div className="absolute inset-0 -z-10 animate-pulse opacity-30 pointer-events-none">
          <svg width="100%" height="100%" viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="400" cy="200" rx="340" ry="120" fill="#a78bfa" />
            <ellipse cx="400" cy="200" rx="220" ry="80" fill="#38bdf8" />
            <ellipse cx="400" cy="200" rx="120" ry="40" fill="#fbbf24" />
          </svg>
        </div>
        <div className="backdrop-blur-lg bg-white/60 rounded-3xl shadow-2xl p-10 flex flex-col items-center gap-6 border border-blue-200 animate-fade-in">
          <div className="relative">
            <Image src="/file.svg" alt="ShieldRoom Logo" width={72} height={72} className="drop-shadow-lg animate-bounce" />
            <span className="absolute -top-4 -right-4 bg-yellow-400 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">NEW</span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-extrabold text-blue-900 drop-shadow-lg tracking-tight">ShieldRoom</h1>
          <p className="text-xl sm:text-2xl text-gray-700 max-w-2xl mx-auto animate-fade-in">
            The most secure, collaborative family document vault. Create rooms, invite loved ones, and share important files with confidence.
          </p>
          <div className="flex gap-4 mt-4 justify-center">
            <Link href="/signup" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-full shadow-lg transition-all duration-200 animate-fade-in">Get Started</Link>
            <Link href="/login" className="bg-white border border-blue-600 text-blue-700 font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-blue-50 transition-all duration-200 animate-fade-in">Login</Link>
          </div>
        </div>
        {/* Animated shield/family illustration */}
        <div className="mt-12 flex justify-center animate-fade-in">
          <svg width="160" height="120" viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-xl animate-spin-slow">
            <path d="M80 10 L140 40 V80 C140 110 80 120 80 120 C80 120 20 110 20 80 V40 L80 10 Z" fill="#38bdf8" stroke="#1e40af" strokeWidth="3" />
            <circle cx="80" cy="60" r="18" fill="#fbbf24" stroke="#fff" strokeWidth="3" />
            <circle cx="60" cy="80" r="10" fill="#a78bfa" />
            <circle cx="100" cy="80" r="10" fill="#a78bfa" />
            <text x="50%" y="65%" textAnchor="middle" fill="#fff" fontSize="22" fontWeight="bold">SR</text>
          </svg>
        </div>
      </section>

      {/* How it Works Timeline */}
      <section className="bg-white py-12 px-6 shadow-inner rounded-t-3xl">
        <h2 className="text-3xl font-bold text-blue-800 mb-10 text-center">How It Works</h2>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 max-w-4xl mx-auto">
          <div className="flex flex-col items-center">
            <div className="bg-blue-100 p-4 rounded-full shadow-lg mb-2">
              <svg width="32" height="32" fill="none" viewBox="0 0 32 32"><circle cx="16" cy="16" r="16" fill="#38bdf8"/><text x="16" y="21" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="bold">1</text></svg>
            </div>
            <h3 className="font-semibold text-lg text-blue-700 mb-1">Sign Up</h3>
            <p className="text-gray-600 text-center">Create your ShieldRoom account in seconds.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-purple-100 p-4 rounded-full shadow-lg mb-2">
              <svg width="32" height="32" fill="none" viewBox="0 0 32 32"><circle cx="16" cy="16" r="16" fill="#a78bfa"/><text x="16" y="21" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="bold">2</text></svg>
            </div>
            <h3 className="font-semibold text-lg text-purple-700 mb-1">Create Family Room</h3>
            <p className="text-gray-600 text-center">Start a secure space for your family to manage documents together.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-yellow-100 p-4 rounded-full shadow-lg mb-2">
              <svg width="32" height="32" fill="none" viewBox="0 0 32 32"><circle cx="16" cy="16" r="16" fill="#fbbf24"/><text x="16" y="21" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="bold">3</text></svg>
            </div>
            <h3 className="font-semibold text-lg text-yellow-700 mb-1">Invite & Share</h3>
            <p className="text-gray-600 text-center">Invite members, upload, edit, and securely share documents.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Carousel (static) */}
      <section className="bg-gradient-to-r from-blue-50 via-white to-purple-50 py-12 px-6">
        <h2 className="text-2xl font-bold text-blue-800 mb-8 text-center">What Families Say</h2>
        <div className="flex flex-col sm:flex-row gap-8 justify-center items-stretch max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-6 flex-1 hover:scale-105 transition-transform duration-200 border-t-4 border-blue-400">
            <p className="text-gray-700 italic mb-4">“ShieldRoom made sharing our family documents so easy and safe. The design is beautiful and inviting!”</p>
            <div className="flex items-center gap-2">
              <Image src="/window.svg" alt="User" width={24} height={24} className="rounded-full" />
              <span className="font-semibold text-blue-700">Priya S.</span>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 flex-1 hover:scale-105 transition-transform duration-200 border-t-4 border-purple-400">
            <p className="text-gray-700 italic mb-4">“Inviting my parents and siblings was a breeze. We finally have a digital family vault!”</p>
            <div className="flex items-center gap-2">
              <Image src="/globe.svg" alt="User" width={24} height={24} className="rounded-full" />
              <span className="font-semibold text-purple-700">Rahul M.</span>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 flex-1 hover:scale-105 transition-transform duration-200 border-t-4 border-yellow-400">
            <p className="text-gray-700 italic mb-4">“The animations and security features are top-notch. Highly recommend ShieldRoom!”</p>
            <div className="flex items-center gap-2">
              <Image src="/file.svg" alt="User" width={24} height={24} className="rounded-full" />
              <span className="font-semibold text-yellow-700">Amit K.</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer with gradient border and social links */}
      <footer className="py-8 text-center text-gray-500 text-sm bg-white border-t-4 border-gradient-to-r from-blue-400 via-purple-400 to-yellow-400 mt-auto">
        <div className="mb-2">
          <Link href="/about" className="underline hover:text-blue-700 mx-2">About</Link>
          <Link href="/contact" className="underline hover:text-blue-700 mx-2">Contact</Link>
          <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="mx-2 hover:text-blue-400">Twitter</a>
          <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" className="mx-2 hover:text-pink-400">Instagram</a>
        </div>
        &copy; {new Date().getFullYear()} ShieldRoom. All rights reserved.
      </footer>
      {/* Animations */}
      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 1.2s ease-in;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
