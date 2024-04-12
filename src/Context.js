// import React, { createContext, useContext, useState, useEffect } from "react";
// import { getUserProfile } from "./Services/userProfile";
// const UserContext = createContext(null);

// export const UserProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const loadUserProfile = async () => {
//       try {
//         console.log(user);
//         const profile = await getUserProfile(); // Adjust this call if it requires a user ID
//         setUser({
//           id: profile.id, // Adjust according to the structure of your response
//           username: profile.username,
//           //   profileId: profile.id, // Make sure this matches your actual data structure
//         });
//         console.log(profile);
//         console.log(setUser);
//       } catch (error) {
//         console.error("Failed to fetch user profile:", error);
//         setUser(null);
//       }
//     };

//     loadUserProfile();
//   }, [user]);

//   return (
//     <UserContext.Provider value={{ user, setUser }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const useUser = () => useContext(UserContext);
