import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProject, updateProject } from '../../Services/project';
import './EditProject.css';

const PROJECT_TYPES = [
  { code: 'T', name: 'Tech' },
  { code: 'C', name: 'Carpentry' },
  { code: 'R', name: 'Renovations' },
  { code: 'A', name: 'Art & Design' },
  { code: 'J', name: 'Jewelry' },
  { code: 'H', name: 'Homegoods' }
];

function EditProject() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState({
    project_title: '',
    project_type: '',
    project_img: '',
    body: '',
    link: '',
    user_profile: ''
  });

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const fetchedProject = await getProject(projectId);
        setProject({
          ...fetchedProject,
        });
      } catch (error) {
        console.error('Failed to fetch project', error);
      }
    };

    fetchProject();
  }, [projectId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('project_title', project.project_title);
    formData.append('project_type', project.project_type);
    if (project.project_img) {
      formData.append('project_img', project.project_img);
    }
    formData.append('body', project.body);
    formData.append('link', project.link);
    formData.append('user_profile', project.user_profile);

    try {
      await updateProject(projectId, formData);
      navigate(`/projectdetails/${projectId}`); 
    } catch (error) {
      console.error('Failed to update project', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProject(prevProject => ({
      ...prevProject,
      [name]: value
    }));
    

};



  return (
    <div className='edit-wrapper'>
      <div className='form-logo-wrapper'>
        <img className='form-logo' src="https://github.com/erichowington/hobbyr/blob/dev/public/images/hobbyr-logos/hobbyr-logo-white.png?raw=true" alt="" />
      </div>
      <div className='edit-form-container'>
        <form className='edit-form' onSubmit={handleSubmit} encType='multipart/form-data'>
          <input
            className='input-title-form'
            placeholder='title'
            name='project_title'
            value={project.project_title}
            onChange={handleChange}
            required
            autoFocus
          />
          <select
            className='project-type-form'
            name='project_type'
            value={project.project_type}
            onChange={handleChange}
            required
          >
            <option value="">Select a Project Type</option>
            {PROJECT_TYPES.map(type => (
              <option key={type.code} value={type.code}>{type.name}</option>
            ))}
          </select>
          <input
            className='project-image-form'
            placeholder='Upload currently unsupported in beta. Please add URL to Image address'
            name='project_img'
            value={project.project_img}
            onChange={handleChange}
            required
            autoFocus
          />
          <textarea
            className='project-body-form'
            placeholder='description'
            name='body'
            value={project.body}
            onChange={handleChange}
            required
            rows={5}
          />
          <input
            className='project-link-form'
            placeholder='link to your project'
            name='link'
            value={project.link}
            onChange={handleChange}
          />
          <button className='submit-edit-button' type='submit'>Update Project</button>
        </form>
      </div>
    </div>
  );
}

export default EditProject;
