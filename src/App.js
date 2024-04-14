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
import "./App.css";
import { verifyUser } from "./Services/users.js";
import { useEffect } from "react";

function App() {
  const [profile, setProfile] = useState({});
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await verifyUser();
      if (userData.user) {
        setUser(userData.user);
        setProfile(userData.userProfile);
      } else {
        setUser({});
        setProfile({});
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="app-wrapper">
      <main className="main-wrapper">
        <Routes>
          <Route path="/" element={<Feed profile={profile} />} />
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
          <Route path="/browse" element={<Browse profile={profile} />} />
          <Route
            path="/profile/:profileId"
            element={<Profile profile={profile} />}
          />
          <Route path="/editprofile/:profileId" element={<EditProfile />} user={user} setUser={setUser} profile={profile} setProfile={setProfile} />
          <Route
            path="/projectdetails/:projectId"
            element={
              <ProjectDetails
                setProfile={setProfile}
                setUser={setUser}
                profile={profile}
                user={user}
              />
            }
          />
          <Route
            path="/projects/:projectId/edit"
            element={<EditProject />}
            profile={profile}
            user={user}
            setProfile={setProfile}
            setUser={setUser}
          />

          <Route path="/favs" element={<Favs />} />
          <Route
            path="/createproject"
            element={<CreateProject profile={profile} user={user} />}
          />
          <Route path="*" element={<h1>Page Not Found</h1>} />
        </Routes>
        <Nav profile={profile} />
      </main>
    </div>
  );
}

export default App;
