import React from 'react';
import { Code2, Sparkles, Zap } from 'lucide-react';
import { portfolioData } from '../data/mock';

const About = () => {
  const { personal } = portfolioData;

  const highlights = [
    {
      icon: <Sparkles className="text-blue-400" size={32} />,
      title: "Generative AI",
      description: "Building intelligent applications with LLMs, RAG systems, and AI agents"
    },
    {
      icon: <Code2 className="text-cyan-400" size={32} />,
      title: "Full-Stack Development",
      description: "Creating scalable solutions with React, FastAPI, and modern databases"
    },
    {
      icon: <Zap className="text-blue-400" size={32} />,
      title: "Automation & Optimization",
      description: "Designing workflows that enhance efficiency and user experience"
    }
  ];

  return (
    <section id="about" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">About Me</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-cyan-400 mx-auto"></div>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Summary */}
          <div>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              {personal.summary}
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              Currently pursuing <span className="font-semibold text-white bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">B.E. in Artificial Intelligence & Data Science</span> at VESIT Mumbai, I'm passionate about leveraging cutting-edge AI technologies to solve real-world problems.
            </p>
          </div>

          {/* Right: Highlights */}
          <div className="space-y-6">
            {highlights.map((item, index) => (
              <div
                key={index}
                className="border-light-sweep hover:scale-105 transition-all duration-300"
              >
                <div className="border-light-sweep-content p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">{item.icon}</div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                      <p className="text-gray-400">{item.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;