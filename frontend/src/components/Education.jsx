import React from 'react';
import { Card } from './ui/card';
import { GraduationCap, Award } from 'lucide-react';
import { portfolioData } from '../data/mock';

const Education = () => {
  const { education, achievements } = portfolioData;

  return (
    <section id="education" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Education & Achievements</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Education - Takes 2 columns */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <GraduationCap className="text-blue-600" size={32} />
              <h3 className="text-2xl font-bold text-slate-900">Education</h3>
            </div>
            <div className="space-y-6">
              {education.map((edu) => (
                <Card
                  key={edu.id}
                  className="p-6 border-2 border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="text-xl font-bold text-slate-900">{edu.degree}</h4>
                    <span className="text-sm text-slate-600 whitespace-nowrap ml-4">{edu.duration}</span>
                  </div>
                  <p className="text-slate-700 mb-2">{edu.institution}</p>
                  {edu.cgpa && (
                    <p className="text-blue-600 font-semibold">CGPA: {edu.cgpa}</p>
                  )}
                  {edu.percentage && (
                    <p className="text-blue-600 font-semibold">Percentage: {edu.percentage}</p>
                  )}
                </Card>
              ))}
            </div>
          </div>

          {/* Achievements - Takes 1 column */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Award className="text-blue-600" size={32} />
              <h3 className="text-2xl font-bold text-slate-900">Achievements</h3>
            </div>
            <div className="space-y-4">
              {achievements.map((achievement) => (
                <Card
                  key={achievement.id}
                  className="p-5 border-2 border-blue-200 bg-blue-50 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                      {achievement.id}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">{achievement.title}</h4>
                      <p className="text-sm text-blue-700 font-semibold">{achievement.organization}</p>
                      <p className="text-sm text-slate-600 mt-1">{achievement.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
