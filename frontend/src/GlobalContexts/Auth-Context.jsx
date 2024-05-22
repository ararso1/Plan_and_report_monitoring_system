import React, { createContext, useContext, useEffect, useState } from "react";
// import axios from "axios";
import axiosInstance from "./Base_url";

const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [authInfo, setAuthInfo] = useState(null);

  const [token, setToken] = useState(localStorage.getItem("access"));

  // Function to handle storage events
  const handleStorageChange = () => {
    setToken(localStorage.getItem("access"));
  };

  useEffect(() => {
    handleStorageChange();
  }, []);

  useEffect(() => {
    handleStorageChange();
    if (token) {
      const fetchData = async () => {
        try {
          const response = await axiosInstance.get("userApp/users/my_profile", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = response.data;
          // console.log(data);
          // console.log(data.userPermissions);
          setAuthInfo({
            user: data,
            access: token,
          });
        } catch (error) {
          console.error("Error fetching user information:", error);
        }
      };

      fetchData();
    }
  }, []);

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };

// const authInfo = useAuth();
