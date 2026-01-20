import React, { useState } from 'react';
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
    <section id="projects" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Featured Projects</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-cyan-400 mx-auto mb-8"></div>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
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
              className={`${filter === cat
                  ? 'bg-blue-600 hover:bg-blue-700 text-white border-0'
                  : 'border-gray-600 text-gray-300 hover:border-blue-500 hover:text-blue-400 bg-transparent'
                }`}
            >
              {cat === 'all' ? 'All Projects' : cat}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="border-light-sweep hover:scale-105 transition-all duration-300"
            >
              <div className="border-light-sweep-content overflow-hidden">
                {/* Project Image */}
                <div className="relative h-64 overflow-hidden bg-gray-800">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                  {project.featured && (
                    <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full flex items-center gap-1 text-sm font-semibold">
                      <Star size={14} fill="white" />
                      Featured
                    </div>
                  )}
                </div>

                {/* Project Content */}
                <div className="p-6 bg-gradient-to-br from-gray-900 to-black">
                  {/* Category Badge */}
                  <Badge className="mb-3 bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 border-0">
                    {project.category}
                  </Badge>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-white mb-3 hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-300 leading-relaxed mb-4">{project.description}</p>

                  {/* Tech Stack */}
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-gray-400 mb-2">Tech Stack:</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs border-gray-600 text-gray-300 bg-transparent">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-gray-400 mb-2">Key Features:</p>
                    <ul className="space-y-1 text-sm text-gray-400">
                      {project.features.slice(0, 3).map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-blue-400 mt-1">•</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Link */}
                  {project.link && (
                    <Button
                      onClick={() => window.open(project.link, '_blank')}
                      variant="outline"
                      className="w-full group/btn hover:bg-blue-600 hover:text-white border-gray-600 text-gray-300 bg-transparent"
                    >
                      View Project
                      <ExternalLink className="ml-2 group-hover/btn:translate-x-1 transition-transform" size={16} />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;