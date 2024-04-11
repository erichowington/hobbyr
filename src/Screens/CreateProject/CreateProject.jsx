import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProject } from "../../Services/project.js";
import "./CreateProject.css";



function CreateProject({profile}) {
  const [project, setProject] = useState({
    project_title: '',
    project_type: '',
    project_img: '',
    body: '',
    link: '',
    user_profile: profile.id
  });

  let navigate = useNavigate();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   await createProject(project);
  //   navigate('/feed');
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Create a FormData object to handle file uploads
    const formData = new FormData();
    formData.append('project_title', project.project_title);
    formData.append('project_type', project.project_type);
    formData.append('project_img', project.project_img); // Append the file object
    
    // Append other fields if needed
    formData.append('body', project.body);
    formData.append('link', project.link);
    formData.append('user_profile', project.user_profile);
  
    await createProject(formData); // Send formData instead of project object
    navigate('/feed');
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'project_img') {
      setProject((prevProject) => ({
        ...prevProject,
        [name]: files[0]
      }));
    } else {
      setProject((prevProject) => ({
        ...prevProject,
        [name]: value
      }));
    }
  };



  return (
    <div className='create-wrapper'>
      <div className='create-form-container'>
        <form className='create-form' onSubmit={handleSubmit} encType='multipart/form-data'>
          <input
            className='input-title-form'
            placeholder='title'
            name='project_title'
            value={project.project_title}
            onChange={handleChange}
            required
            autoFocus
          />
          <input
            className='project-type-form'
            placeholder='type'
            name='project_type'
            value={project.project_type}
            onChange={handleChange}
            required
          />
          <input
            className='project-image-form'
            type='file'
            placeholder='upload image'
            name='project_img'
            accept='image/jpeg,image/png,image/gif'
            onChange={handleChange}
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
          <button type='submit'>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default CreateProject