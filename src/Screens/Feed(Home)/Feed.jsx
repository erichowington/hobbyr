import React from "react";
import { getProjectsByFollowedUsers } from "../../Services/project";
import { useState, useEffect } from "react";
import Project from "../../Components/Project/Project";
import { useParams, useNavigate } from "react-router-dom";
import "./Feed.css";

function Feed() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjectsByFollowedUsers();
        setProjects(data);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="feed-wrapper">
      <div className="feed-header-container">
        <div className="siginin-logo-wrapper">
          <img
            className="signin-logo-img"
            src="https://github.com/erichowington/hobbyr/blob/dev/public/images/hobbyr-logos/hobbyr-logo-orange.png?raw=true"
          />
        </div>
        <div className="feed-header">My Feed</div>
      </div>
      <div className="feed-content">
        {projects.map((project) => (
          <Project classname="feed-image" key={project.id} project={project} />
        ))}
        
      </div>
    </div>
  );
}

export default Feed;
