import React from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { portfolioData } from '../data/mock';

const Skills = () => {
  const { skills } = portfolioData;

  const skillCategories = [
    { title: 'Programming Languages', items: skills.languages, color: 'blue' },
    { title: 'Frameworks & Libraries', items: skills.frameworks, color: 'purple' },
    { title: 'Databases', items: skills.databases, color: 'green' },
    { title: 'Tools & Platforms', items: skills.tools, color: 'orange' },
    { title: 'APIs & Integrations', items: skills.apis, color: 'cyan' },
    { title: 'Concepts & Technologies', items: skills.concepts, color: 'pink' }
  ];

  const getColorClass = (color) => {
    const colors = {
      blue: 'bg-blue-50 text-blue-700 border-blue-200',
      purple: 'bg-purple-50 text-purple-700 border-purple-200',
      green: 'bg-green-50 text-green-700 border-green-200',
      orange: 'bg-orange-50 text-orange-700 border-orange-200',
      cyan: 'bg-cyan-50 text-cyan-700 border-cyan-200',
      pink: 'bg-pink-50 text-pink-700 border-pink-200'
    };
    return colors[color] || colors.blue;
  };

  return (
    <section id="skills" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Skills & Technologies</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            A comprehensive toolkit for building intelligent AI applications and scalable solutions
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <Card
              key={index}
              className="p-6 border-2 border-slate-200 hover:border-blue-400 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <h3 className="text-xl font-bold text-slate-900 mb-4">{category.title}</h3>
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
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
