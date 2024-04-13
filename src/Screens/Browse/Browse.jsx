import "./Browse.css"
import React, { useState, useEffect } from 'react';

import { getProjects, getProjectsByType } from "../../Services/project";

import Project from "../../Components/Project/Project";


const PROJECT_TYPES = [
  { code: 'T', name: 'Tech' },
  { code: 'C', name: 'Carpentry' },
  { code: 'R', name: 'Renovations' },
  { code: 'A', name: 'Art & Design' },
  { code: 'J', name: 'Jewelry' },
  { code: 'H', name: 'Homegoods' }
];

const Browse = () => {
  const [projects, setProjects] = useState([]);
  const [projectType, setProjectType] = useState('');

  useEffect(() => {
    if (projectType) {
      loadProjectsByType();
    } else {
      loadProjects();
    }
  }, [projectType]);

  const loadProjects = async () => {
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    }
  };

  const loadProjectsByType = async () => {
    try {
      const data = await getProjectsByType(projectType);
      setProjects(data);
    } catch (error) {
      console.error("Failed to fetch projects by type:", error);
      
    }
  };

  return (
    <div className="browse-wrapper">
      <h1 className="browse-title">Browse</h1>
      <select
        value={projectType}
        onChange={e => setProjectType(e.target.value)}
        className="dropdown-select"
      >
        <option value="">Select a Project Type</option>
        {PROJECT_TYPES.map(type => (
          <option key={type.code} value={type.code}>{type.name}</option>
        ))}
      </select>
      <div className="browse-content">
        
        {projects.map((project) => (
          <Project project={project} />

          // <div key={project.id} className="browse-project-card">
          //   <h2 className="browse-project-title">{project.project_title}</h2>
          //   {project.project_img && <img src={project.project_img} alt={project.project_title} style={{ width: '10em' }} />}
          //   <p>{project.body}</p>
          //   {project.link && <a href={project.link} target="_blank" rel="noopener noreferrer">More Info</a>}
          //   <p>Created on: {new Date(project.created_at).toLocaleDateString()}</p>
          // </div>
        ))}
        
      </div>
    </div>
  );
};

export default Browse;