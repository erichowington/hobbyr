import { Routes, Route } from "react-router-dom";
import React from 'react';
import Feed from './Screens/Feed(Home)/Feed.jsx';
import Browse from './Screens/Browse/Browse.jsx';
import EditProfile from './Screens/EditProfile/EditProfile.jsx';
import CreateProject from "./Screens/CreateProject/CreateProject.jsx";
import EditProject from './Screens/EditProject/EditProject.jsx';
import Favs from './Screens/Favs/Favs.jsx';
import Profile from './Screens/Profile/Profile.jsx';
import ProjectDetails from './Screens/ProjectDetails/ProjectDetails.jsx';
import SignIn from './Screens/SignIn/SignIn.jsx';
import SignOut from './Screens/SignOut/SignOut.jsx';
import SignUp from './Screens/SignUp/SignUp.jsx';
import Nav from './Components/Nav/Nav.jsx';







function App () {

  return (


    <main>

      <Nav />

      <Routes>

        <Route path='/' element={<Feed />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signout' element={<SignOut />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/browse' element={<Browse />} />
        <Route path='/profile/:profileId' element={<Profile />} />
        <Route path='/editprofile/:profileId' element={<EditProfile />} />
        <Route path='/projectdetails/:projectId' element={<ProjectDetails />} />
        <Route path='/editproject/:projectId' element={<EditProject />} />
        <Route path='/favs' element={<Favs />} />
        <Route path='/createproject' element={<CreateProject />} />
        <Route path='*' element={<h1>Page Not Found</h1>} />
      </Routes>

    </main>


  );

}

export default App;
