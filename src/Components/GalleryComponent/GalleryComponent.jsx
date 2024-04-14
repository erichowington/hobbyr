import React from "react";
import "./GalleryComponent.css";
import Project from "../Project/Project.jsx";

function ProjectGallery({ projects }) {
  return (
    <div className="gallery-wrapper">
      <div className="gallery">
        {projects.map((project, index) => (
          <Project key={index} project={project} />
        ))}
      </div>
    </div>
  );
}

export default ProjectGallery;
