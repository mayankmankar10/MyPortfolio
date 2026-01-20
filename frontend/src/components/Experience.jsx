import React from 'react';
import { Badge } from './ui/badge';
import { Briefcase, Calendar } from 'lucide-react';
import { portfolioData } from '../data/mock';

const Experience = () => {
  const { experience } = portfolioData;

  return (
    <section id="experience" className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Experience</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-cyan-400 mx-auto"></div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center Line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-blue-500 to-cyan-500"></div>

          {/* Experience Items */}
          <div className="space-y-12">
            {experience.map((exp, index) => (
              <div
                key={exp.id}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline Dot */}
                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-500 rounded-full border-4 border-gray-900 shadow-lg shadow-blue-500/50 z-10"></div>

                {/* Content Card */}
                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                  <div className="border-light-sweep hover:scale-105 transition-all duration-300">
                    <div className="border-light-sweep-content p-6">
                      {/* Company Icon */}
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-blue-500/20 rounded-lg">
                          <Briefcase className="text-blue-400" size={24} />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                          <p className="text-lg text-blue-400 font-semibold">{exp.company}</p>
                        </div>
                      </div>

                      {/* Duration */}
                      <div className="flex items-center gap-2 text-gray-400 mb-4">
                        <Calendar size={16} />
                        <span className="text-sm">{exp.duration}</span>
                      </div>

                      {/* Description */}
                      <p className="text-gray-300 leading-relaxed mb-4">{exp.description}</p>

                      {/* Skills */}
                      <div className="flex flex-wrap gap-2">
                        {exp.skills.map((skill, idx) => (
                          <Badge key={idx} variant="secondary" className="bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 border-0">
                            {skill}
                          </Badge>
                        ))}
                      </div>
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

export default Experience;