import React from 'react'
import { getProjectsByFollowedUsers } from '../../Services/project';
import { useState, useEffect } from 'react';
import Project from '../../Components/Project/Project';
import { useParams, useNavigate } from 'react-router-dom';
import "./Feed.css"

function Feed() {

    const [projects, setProjects] = useState([]);
  
    useEffect(() => {
      const fetchProjects = async () => {
        try {
          const data = await getProjectsByFollowedUsers();
          setProjects(data);
        } catch (error) {
          console.error('Failed to fetch projects:', error);
        }
      };
  
      fetchProjects();
    }, []);


  
  
  return (
    <div>
   <div className="feed-content">
        
        {projects.map((project) => (
          <Project key={project.id} project={project} />

          // <div key={project.id} className="browse-project-card">
          //   <h2 className="browse-project-title">{project.project_title}</h2>
          //   {project.project_img && <img src={project.project_img} alt={project.project_title} style={{ width: '10em' }} />}
          //   <p>{project.body}</p>
          //   {project.link && <a href={project.link} target="_blank" rel="noopener noreferrer">More Info</a>}
          //   <p>Created on: {new Date(project.created_at).toLocaleDateString()}</p>
          // </div>
        ))};
        
      </div>

    </div>
  )
}

export default Feed