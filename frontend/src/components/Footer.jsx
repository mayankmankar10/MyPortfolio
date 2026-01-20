import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center justify-center space-y-4">
          {/* Copyright */}
          <p className="text-slate-400 text-center">
            © {currentYear} Mayank Mankar. All rights reserved.
          </p>

          {/* Made with love */}
          <p className="flex items-center gap-2 text-slate-400 text-sm">
            Made with <Heart className="text-red-500" size={16} fill="currentColor" /> using React & FastAPI
          </p>

          {/* Quick Links */}
          <div className="flex gap-6 text-sm">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-slate-400 hover:text-white transition-colors"
            >
              Back to Top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
