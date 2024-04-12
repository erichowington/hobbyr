import React from 'react'
import "/.Project.css"
import { Link } from 'react-router-dom';

function Project({ project }) {
  return (
    <div>
      <div className="image-container">
        <Link to={`/projectdetails/${project.id}`}>
          <img className="icon" src={typeof project_img == "string" ? 
          project.project_img: project.project_img} 
          alt={project.title} 
          />
        </Link>
      </div>
    </div>
  );
}

export default Project