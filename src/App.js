import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Feed from "./Screens/Feed(Home)/Feed.jsx";
import Browse from "./Screens/Browse/Browse.jsx";
import EditProfile from "./Screens/EditProfile/EditProfile.jsx";
import CreateProject from "./Screens/CreateProject/CreateProject.jsx";
import EditProject from "./Screens/EditProject/EditProject.jsx";
import Favs from "./Screens/Favs/Favs.jsx";
import Profile from "./Screens/Profile/Profile.jsx";
import ProjectDetails from "./Screens/ProjectDetails/ProjectDetails.jsx";
import SignIn from "./Screens/SignIn/SignIn.jsx";
import SignOut from "./Screens/SignOut/SignOut.jsx";
import SignUp from "./Screens/SignUp/SignUp.jsx";
import Nav from "./Components/Nav/Nav.jsx";

function App() {
  const [user, setUser] = useState({});
  const [profile, setProfile] = useState({});

  return (
    <main>
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route
          path="/signin"
          element={<SignIn setUser={setUser} setProfile={setProfile} />}
        />
        <Route
          path="/signout"
          element={<SignOut setUser={setUser} setProfile={setProfile} />}
        />
        <Route
          path="/signup"
          element={<SignUp setUser={setUser} setProfile={setProfile} />}
        />
        <Route path="/browse" element={<Browse />} />
        <Route
          path="/profile/:profileId"
          element={<Profile profile={profile} />}
        />
        <Route path="/editprofile/:profileId" element={<EditProfile />} />
        <Route path="/projectdetails/:projectId" element={<ProjectDetails />} />
        <Route path="/editproject/:projectId" element={<EditProject />} />
        <Route path="/favs" element={<Favs />} />
        <Route
          path="/createproject"
          element={<CreateProject profile={profile} />}
        />
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
      <Nav />
    </main>
  );
}

export default App;
