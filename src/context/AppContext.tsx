"use client";
import axios from "axios";
import React, { createContext, ReactNode, useEffect, useState } from "react";
import { toast } from "react-toastify";

export interface Doctor {
  [key: string]: any;
}

export interface UserData {
  [key: string]: any;
}

interface AppContextType {
  doctors: any[];
  getAllDoctorsData: () => Promise<void>;
  currencySymbol: string;
  token: string | null;
  setToken: (token: string | null) => void;
  backendUrl: string;
  userData: UserData | null;
  loadUserProfileData: () => Promise<void>;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  setUserData: (userData: UserData | null) => void;
}

export const AppContext = createContext<AppContextType>({
  doctors: [],
  getAllDoctorsData: async () => {},
  currencySymbol: "$",
  token: null,
  setToken: () => {},
  backendUrl: "",
  userData: null,
  setUserData: () => {},
  loadUserProfileData: async () => {},
  loading: false,
  setLoading: () => {},
});

export const AppContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const currencySymbol = "$";
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "";

  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [token, setTokenState] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Initialize token from localStorage on client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setTokenState(storedToken);
      }
    }
  }, []);

  // Sync token to localStorage when it changes
  const setToken = (newToken: string | null) => {
    if (typeof window !== "undefined") {
      if (newToken) {
        localStorage.setItem("token", newToken);
      } else {
        localStorage.removeItem("token");
      }
    }
    setTokenState(newToken);
  };

  // Configure axios defaults
  useEffect(() => {
    axios.defaults.baseURL = backendUrl;
    if (token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common.Authorization;
    }
  }, [backendUrl, token]);

  const loadUserProfileData = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const { data } = await axios.get("/api/user/get-profile");
      if (data.success) {
        setUserData(data.userData);
      } else {
        toast.error(data.message);
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Failed to load user profile");
    } finally {
      setLoading(false);
    }
  };

  const getAllDoctorsData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/api/doctor/list");
      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Failed to load doctors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllDoctorsData();
  }, []);

  useEffect(() => {
    if (token) {
      loadUserProfileData();
    } else {
      setUserData(null);
    }
  }, [token]);

  return (
    <AppContext.Provider
      value={{
        doctors,
        getAllDoctorsData,
        currencySymbol,
        token,
        setToken,
        backendUrl,
        userData,
        setUserData,
        loadUserProfileData,
        loading,
        setLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;