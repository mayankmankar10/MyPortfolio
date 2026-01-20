import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { ArrowRight, Download, Github, Linkedin, Mail } from 'lucide-react';
import { portfolioData } from '../data/mock';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { personal } = portfolioData;

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-20 text-center">
        <div
          className={`transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          {/* Greeting */}
          <p className="text-blue-600 font-medium text-lg mb-4">Hi there, I'm</p>

          {/* Name */}
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-slate-900 mb-6 tracking-tight">
            {personal.name}
          </h1>

          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-semibold text-slate-700 mb-6">
            {personal.title}
          </h2>

          {/* Tagline */}
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed">
            {personal.tagline}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button
              onClick={() => scrollToSection('projects')}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg group"
            >
              View My Work
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </Button>
            <Button
              onClick={() => scrollToSection('contact')}
              size="lg"
              variant="outline"
              className="border-2 border-slate-300 hover:border-blue-600 hover:text-blue-600 px-8 py-6 text-lg"
            >
              Get In Touch
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-6">
            <a
              href={personal.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-blue-600 transition-colors transform hover:scale-110 duration-200"
            >
              <Github size={28} />
            </a>
            <a
              href={personal.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-blue-600 transition-colors transform hover:scale-110 duration-200"
            >
              <Linkedin size={28} />
            </a>
            <a
              href={`mailto:${personal.email}`}
              className="text-slate-600 hover:text-blue-600 transition-colors transform hover:scale-110 duration-200"
            >
              <Mail size={28} />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-slate-400 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-slate-400 rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
