import { useState, useEffect } from "react";
import { getProject, deleteProject } from "../../Services/project.js";
import { getUserProfile } from "../../Services/userProfile.js";
import { Link, useParams, useNavigate, NavLink } from "react-router-dom";
import CommentModal from "../../Components/CommentModal/CommentModal.jsx";
import "./ProjectDetails.css";
import { verifyUser } from "../../Services/users.js";

function ProjectDetails({}) {
  const PROJECT_TYPES = [
    { code: "T", name: "Tech" },
    { code: "C", name: "Carpentry" },
    { code: "R", name: "Renovations" },
    { code: "A", name: "Art & Design" },
    { code: "J", name: "Jewelry" },
    { code: "H", name: "Homegoods" },
  ];
  const [profile, setProfile] = useState(null);
  const [isCurrent, setIsCurrent] = useState(false);
  const [project, setProject] = useState({});
  let { projectId } = useParams();
  let navigate = useNavigate();

  const fetchProject = async () => {
    const oneProject = await getProject(projectId);
    setProject(oneProject);
  };

  useEffect(() => {
    fetchProject();
  }, [projectId]);

  useEffect(() => {
    const checkIfCurrentUser = async () => {
      const current = await verifyUser();
      setIsCurrent(current.userProfile.id == project.user_profile);
    };

    checkIfCurrentUser();
  }, [project]);

 
  const handleDelete = async () => {
    try {
      await deleteProject(projectId);
      navigate("/feed");
    } catch (error) {
      console.error('Failed to delete project:', error);
    }
  };
  

  return (
    <div className="project-details-wrapper">
      <div className="details-logo-wrapper">
        <img
          className="details-logo"
          src="https://github.com/erichowington/hobbyr/blob/dev/public/images/hobbyr-logos/hobbyr-logo-orange.png?raw=true"
        />
        <Link className="details-header-link" to="/browse">
          back to browse
        </Link>
      </div>
      <div className="project-details">
        <div className="detailContent">
          <div className="project-image-wrapper">
            <img
              className="project-image"
              src={project.project_img}
              alt={project.project_title}
            />
          </div>
          <div className="types-container">
            <div className="project-title">
              <span className="title-head">TITLE:</span>
              {project.project_title}
            </div>
            <div className="project-details-type">
              {project.project_type === "H" ? "Homegoods" : null}
            </div>
            <div className="project-details-type">
              {project.project_type === "J" ? "Jewelry" : null}
            </div>
            <div className="project-details-type">
              {project.project_type === "R" ? "Renovations" : null}
            </div>
            <div className="project-details-type">
              {project.project_type === "C" ? "Carpentry" : null}
            </div>
            <div className="project-details-type">
              {project.project_type === "T" ? "Tech" : null}
            </div>
            <div className="project-details-type">
              {project.project_type === "A" ? "Art & Design" : null}
            </div>
          </div>
          <div className="project-body-container">
            <p className="project-body">{project.body}</p>
          </div>
          <div className="project-details-link">
            <a
              className="project-link"
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              Project Link
            </a>
          </div>
          <div className="my-project-options">
            {isCurrent && (
              <>
                {" "}
                <Link to={`/projects/${projectId}/edit`}>
                  <button className="edit-the-project">EDIT</button>
                </Link>
                <button className="delete-the-project" onClick={handleDelete}>
                  DELETE
                </button>
              </>
            )}
          </div>
        </div>
        <CommentModal projectId={projectId} />
      </div>
    </div>
  );
}

export default ProjectDetails;
