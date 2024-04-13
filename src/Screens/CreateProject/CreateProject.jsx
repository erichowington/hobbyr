import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProject } from "../../Services/project";
import "./CreateProject.css";

const PROJECT_TYPES = [
  { code: 'T', name: 'Tech' },
  { code: 'C', name: 'Carpentry' },
  { code: 'R', name: 'Renovations' },
  { code: 'A', name: 'Art & Design' },
  { code: 'J', name: 'Jewelry' },
  { code: 'H', name: 'Homegoods' }
];

function CreateProject({ profile }) {

  console.log(profile.id)
  const [project, setProject] = useState({
    project_title: '',
    project_type: '',
    project_img: '',
    body: '',
    link: '',
    user_profile: profile.id
  });

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('project_title', project.project_title);
    formData.append('project_type', project.project_type);
    formData.append('project_img', project.project_img);
    formData.append('body', project.body);
    formData.append('link', project.link);
    formData.append('user_profile', project.user_profile);
    console.log(formData)
    await createProject(project);
    navigate('/feed');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // if (name === 'project_img') {
    //   setProject(prevProject => ({
    //     ...prevProject,
    //     [name]: files[0]
    //   }));
    //   console.log(project)
    // } else {
      setProject(prevProject => ({
        ...prevProject,
        [name]: value
      }));
      

  };

  return (
    <div className='create-wrapper'>
      <div className='form-logo-wrapper'>
        <img className='form-logo' src="https://github.com/erichowington/hobbyr/blob/dev/public/images/hobbyr-logos/hobbyr-logo-white.png?raw=true" alt="" />
      </div>
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
          <select
            className='project-type-form'
            name='project_type'
            value={project.project_type}
            onChange={handleChange}
            required
          >
            <option className='form-options' id='form-options' value="">Select a Project Type</option>
            {PROJECT_TYPES.map(type => (
              <option className='form-options' id="form-options" key={type.code} value={type.code}>{type.name}</option>
            ))}
          </select>
          {/* <input
            className='project-image-form'
            type='file'
            name='project_img'
            accept='image/*'
            onChange={handleChange}
          /> */}
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
            placeholder='add a link, if you have one'
            name='link'
            value={project.link}
            onChange={handleChange}
          />
          <button className='submit-create-button' type='submit'>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default CreateProject;
