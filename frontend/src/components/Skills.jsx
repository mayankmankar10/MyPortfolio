import React from 'react';
import { Badge } from './ui/badge';
import { portfolioData } from '../data/mock';

const Skills = () => {
  const { skills } = portfolioData;

  const skillCategories = [
    { title: 'Programming Languages', items: skills.languages, color: 'blue' },
    { title: 'Frameworks & Libraries', items: skills.frameworks, color: 'cyan' },
    { title: 'Databases', items: skills.databases, color: 'blue' },
    { title: 'Tools & Platforms', items: skills.tools, color: 'cyan' },
    { title: 'APIs & Integrations', items: skills.apis, color: 'blue' },
    { title: 'Concepts & Technologies', items: skills.concepts, color: 'cyan' }
  ];

  const getColorClass = (color) => {
    const colors = {
      blue: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      cyan: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30'
    };
    return colors[color] || colors.blue;
  };

  return (
    <section id="skills" className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Skills & Technologies</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-cyan-400 mx-auto mb-6"></div>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            A comprehensive toolkit for building intelligent AI applications and scalable solutions
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className="border-light-sweep hover:scale-105 transition-all duration-300"
            >
              <div className="border-light-sweep-content p-6">
                <h3 className="text-xl font-bold text-white mb-4">{category.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.items.map((skill, idx) => (
                    <Badge
                      key={idx}
                      className={`${getColorClass(category.color)} border font-medium px-3 py-1`}
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;