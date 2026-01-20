import React, { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ExternalLink, Star } from 'lucide-react';
import { portfolioData } from '../data/mock';

const Projects = () => {
  const { projects } = portfolioData;
  const [filter, setFilter] = useState('all');

  const categories = ['all', ...new Set(projects.map(p => p.category))];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Featured Projects</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-8"></div>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            A showcase of my AI/ML projects, from intelligent agents to RAG pipelines and automation systems
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <Button
              key={cat}
              onClick={() => setFilter(cat)}
              variant={filter === cat ? 'default' : 'outline'}
              className={`${
                filter === cat
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'border-slate-300 text-slate-700 hover:border-blue-600 hover:text-blue-600'
              }`}
            >
              {cat === 'all' ? 'All Projects' : cat}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <Card
              key={project.id}
              className="overflow-hidden border-2 border-slate-200 hover:border-blue-400 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
            >
              {/* Project Image */}
              <div className="relative h-64 overflow-hidden bg-slate-100">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {project.featured && (
                  <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full flex items-center gap-1 text-sm font-semibold">
                    <Star size={14} fill="white" />
                    Featured
                  </div>
                )}
              </div>

              {/* Project Content */}
              <div className="p-6">
                {/* Category Badge */}
                <Badge className="mb-3 bg-blue-50 text-blue-700 hover:bg-blue-100">
                  {project.category}
                </Badge>

                {/* Title */}
                <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-slate-700 leading-relaxed mb-4">{project.description}</p>

                {/* Tech Stack */}
                <div className="mb-4">
                  <p className="text-sm font-semibold text-slate-600 mb-2">Tech Stack:</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div className="mb-4">
                  <p className="text-sm font-semibold text-slate-600 mb-2">Key Features:</p>
                  <ul className="space-y-1 text-sm text-slate-600">
                    {project.features.slice(0, 3).map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-blue-600 mt-1">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Link */}
                <Button
                  onClick={() => window.open(project.link, '_blank')}
                  variant="outline"
                  className="w-full group/btn hover:bg-blue-600 hover:text-white hover:border-blue-600"
                >
                  View Project
                  <ExternalLink className="ml-2 group-hover/btn:translate-x-1 transition-transform" size={16} />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
