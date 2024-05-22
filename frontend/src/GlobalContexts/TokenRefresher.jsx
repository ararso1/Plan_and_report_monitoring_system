import React, { useEffect, useState } from "react";
// import axios from "axios";
import axiosInstance from "../GlobalContexts/Base_url";

const TokenRefresher = () => {
  const refresh = localStorage.getItem("refresh");

  const fetchNewAccessToken = async () => {
    try {
      const response = await axiosInstance.post("/userApp/token/refresh/", {
        refresh,
      });
      const { access } = response.data;
      localStorage.removeItem("access");

      localStorage.setItem("access", access);
    } catch (error) {}
  };
  useEffect(() => {
    fetchNewAccessToken();
    // Set up interval to refresh access token every 2 minutes
    const intervalId = setInterval(fetchNewAccessToken, 120000); // 2 minutes in milliseconds

    // Cleanup function to clear the interval on unmount
    return () => clearInterval(intervalId);
  }, []);
};
export default TokenRefresher;
