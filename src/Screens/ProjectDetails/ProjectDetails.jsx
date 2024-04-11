import { useState, useEffect } from "react";
import { getProject, deleteProject } from "../../Services/project.js";
import { Link, useParams, useNavigate, NavLink } from "react-router-dom";
import CommentModal from "../../Components/CommentModal/CommentModal.jsx";
import "./ProjectDetails.css";



function ProjectDetails() {
  const [project, setProject] = useState({});
  let { projectId } = useParams();
  let navigate= useNavigate();

  const fetchProject = async () => {
    const oneProject = await getProject(projectId); 
    setProject(oneProject)
  };

  useEffect(() => {
    fetchProject();
  }, [projectId]); 

  const handleDelete = async (id) => {
    await deleteProject(id); 
    navigate("/feed"); 
  };

  return (
    <div className="project-details">
      <div className="detailContent">
        <h1>{project.project_title}</h1>

        {project.project_img && (
          <img className="project-image" src={project.project_img} alt={project.project_title} />
        )}
        <div className="projectBody">
          <p>{project.body}</p>
        </div>
        {project.link && (
          <a href={project.link} target="_blank" rel="noopener noreferrer">Project Link</a>
        )}
        <div>
          <Link to={`/projects/${projectId}/edit`}>
            <button className="edit">EDIT</button>
          </Link>
          <button className="delete" onClick={handleDelete}>DELETE</button>
        </div>
        <Link to="/projects">Back to Projects</Link>
      </div>
      <CommentModal projectId={projectId} />
      
    </div>
  );
}

export default ProjectDetails;
