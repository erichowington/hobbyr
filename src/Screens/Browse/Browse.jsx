import "./Browse.css"
import React, { useState, useEffect } from 'react';
import { getProjects } from "../../Services/project";
import Project from "../../Components/Project/Project";


const Browse = () => {

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    }
  };

  return (
    <div className="browse-wrapper">
      <h1 className="browse-title">Projects</h1>
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



