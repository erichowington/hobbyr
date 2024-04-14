import { useState, useEffect } from "react";
import { getProject, deleteProject } from "../../Services/project.js";
import { getUserProfile } from "../../Services/userProfile.js";
import { Link, useParams, useNavigate, NavLink } from "react-router-dom";
import CommentModal from "../../Components/CommentModal/CommentModal.jsx";
import "./ProjectDetails.css";

// function ProjectDetails() {
//   const PROJECT_TYPES = [
//     { code: "T", name: "Tech" },
//     { code: "C", name: "Carpentry" },
//     { code: "R", name: "Renovations" },
//     { code: "A", name: "Art & Design" },
//     { code: "J", name: "Jewelry" },
//     { code: "H", name: "Homegoods" },
//   ];

//   const [project, setProject] = useState({});
//   let { projectId } = useParams();
//   let navigate = useNavigate();

//   const fetchProject = async () => {
//     const oneProject = await getProject(projectId);
//     setProject(oneProject);
//   };

//   useEffect(() => {
//     fetchProject();
//   }, [projectId]);

//   const handleDelete = async (projectId) => {
//     await deleteProject(projectId);
//     navigate("/feed");
//   };

  


//   return (
//     <div className="project-details-wrapper">
//       <div className="details-logo-wrapper">
//         <img
//           className="details-logo"
//           src="https://github.com/erichowington/hobbyr/blob/dev/public/images/hobbyr-logos/hobbyr-logo-orange.png?raw=true"
//         />
//         <Link className="details-header-link" to="/browse">back to browse</Link>
//       </div>
//       <div className="project-details">
//         <div className="detailContent">
//           <div className="project-image-wrapper">
//             <img
//               className="project-image"
//               src={project.project_img}
//               alt={project.project_title}
//             />
//           </div>
//           <div className="types-container">
//             <div className="project-title">
//               <span className="title-head">TITLE:</span>
//               {project.project_title}
//             </div>
//             <div className="project-details-type">
//               {project.project_type === "H" ? "Homegoods" : null}
//             </div>
//             <div className="project-details-type">
//               {project.project_type === "J" ? "Jewelry" : null}
//             </div>
//             <div className="project-details-type">
//               {project.project_type === "R" ? "Renovations" : null}
//             </div>
//             <div className="project-details-type">
//               {project.project_type === "C" ? "Carpentry" : null}
//             </div>
//             <div className="project-details-type">
//               {project.project_type === "T" ? "Tech" : null}
//             </div>
//             <div className="project-details-type">
//               {project.project_type === "A" ? "Art & Design" : null}
//             </div>
//           </div>
//           <div className="project-body-container">
//             <p className="project-body">{project.body}</p>
//           </div>
//           <div className="project-details-link">
//             <a
//               className="project-link"
//               href={project.link} 
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               Project Link
//             </a>
//           </div>
//           <div className="my-project-options">
//             <Link to={`/projects/${projectId}/edit`}>
              
//               <button className="edit-the-project">EDIT</button>
//             </Link>
//             <button className="delete-the-project" onClick={handleDelete}>
//               DELETE
//             </button>
//           </div>

          


//         </div>
//         <CommentModal projectId={projectId} />
//       </div>
//     </div>
//   );
// }

// export default ProjectDetails;

function ProjectDetails() {
  const [profile, setProfile] = useState(null);
  const { profileId } = useParams();
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState({});
  const [loading, setLoading] = useState(true);
  const [profileError, setProfileError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userProfile = await getUserProfile(profileId);
        setProfile(userProfile);
        setProfileError(null); // Reset profile error if successful fetch
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setProfileError(error.message || "Error fetching user profile");
      }
    };

    fetchData(); // Fetch profile when component mounts
  }, [profileId]);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const oneProject = await getProject(projectId);
        setProject(oneProject);
        setLoading(false); // Set loading to false once project data is fetched
      } catch (error) {
        console.error("Error fetching project:", error);
      }
    };

    fetchProject();
  }, [projectId]);

  const handleDelete = async () => {
    try {
      await deleteProject(projectId);
      navigate("/feed");
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  // Check if both project and profile data are available
  const isCreator =
    !loading &&
    project.user_profile &&
    profile &&
    project.user_profile.id === profileId;

  return (
    <div className="project-details-wrapper">
      {loading ? ( // Render loading state while data is being fetched
        <div>Loading...</div>
      ) : (
        <>
          <div className="details-logo-wrapper">
            <img
              className="details-logo"
              src="https://github.com/erichowington/hobbyr/blob/dev/public/images/hobbyr-logos/hobbyr-logo-orange.png?raw=true"
              alt="Hobbyr Logo"
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
                {/* Include other project details here */}
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
            </div>
            <div className="my-project-options">
              {isCreator && ( // Render edit and delete options if user is the creator
                <>
                  <Link to={`/projects/${projectId}/edit`}>
                    <button className="edit-the-project">EDIT</button>
                  </Link>
                  <button className="delete-the-project" onClick={handleDelete}>
                    DELETE
                  </button>
                </>
              )}
            </div>
            <CommentModal projectId={projectId} />
          </div>
        </>
      )}
      {profileError && <div>Error fetching profile: {profileError}</div>}
    </div>
  );
}
export default ProjectDetails;