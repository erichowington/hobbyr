import React from 'react'
import "/.Project.css"

function Project({ project }) {
  return (
    <div>
      <div className="image-container">
        <Link to={`/projects/${project._id}`}>
          <img className="icon" src={typeof project_img == "string" ? 
          project_img: project_img} 
          alt={character.name} 
          />
        </Link>
      </div>
    </div>
  );
}

export default Project