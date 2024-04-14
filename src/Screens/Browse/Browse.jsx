import "./Browse.css";
import React, { useState, useEffect } from "react";

import { getProjects, getProjectsByType } from "../../Services/project";

import ProjectGallery from "../../Components/GalleryComponent/GalleryComponent";

const PROJECT_TYPES = [
  { code: "T", name: "Tech" },
  { code: "C", name: "Carpentry" },
  { code: "R", name: "Renovations" },
  { code: "A", name: "Art & Design" },
  { code: "J", name: "Jewelry" },
  { code: "H", name: "Homegoods" },
];

const Browse = () => {
  const [projects, setProjects] = useState([]);
  const [projectType, setProjectType] = useState("");

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
      <div className="siginin-logo-wrapper">
        <img
          className="signin-logo-img"
          src="https://github.com/erichowington/hobbyr/blob/dev/public/images/hobbyr-logos/hobbyr-logo-orange.png?raw=true"
        />
      </div>
      <h1 className="browse-title">Browse</h1>
      <select
        value={projectType}
        onChange={(e) => setProjectType(e.target.value)}
        className="dropdown-select"
      >
        <option value="">Select a Project Type</option>
        {PROJECT_TYPES.map((type) => (
          <option key={type.code} value={type.code}>
            {type.name}
          </option>
        ))}
      </select>
      <div className="scrollable-gallery">
        <ProjectGallery projects={projects.slice(0, 5)} />
      </div>
      {projects.length > 5 && (
        <div className="scrollable-gallery">
          <ProjectGallery projects={projects.slice(5)} />
        </div>
      )}
    </div>
  );
};

export default Browse;
