import React from 'react'
import { Link } from 'react-router-dom';

function Project({ project }) {
  return (
    <div>
      <div className="project-component-container">
        <Link to={`/projectdetails/${project.id}`}>
        <img className='project-component-img' src={project.project_img} alt={project.project_title} key= {project.project_title} style={{ width: '10em' }} />
        </Link>
      </div>
    </div>
  );
}

export default Project