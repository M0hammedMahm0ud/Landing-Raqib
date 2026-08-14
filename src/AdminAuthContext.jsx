import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import api from "./api";

const AdminAuthContext = createContext(null);

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Initialize auth state from localStorage
  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    const adminData = localStorage.getItem("admin_user");

    if (token && adminData) {
      try {
        const parsedAdmin = JSON.parse(adminData);
        setAdmin(parsedAdmin);
        // Set token in API client
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      } catch {
        localStorage.removeItem("admin_token");
        localStorage.removeItem("admin_user");
      }
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    const response = await api.post("/auth/login", {
      username,
      password,
    });

    const { token, userId, username: userName, role, fullName } = response.data;

    const user = {
      id: userId,
      username: userName,
      role,
      fullName
    };

    // Store token and user data
    localStorage.setItem("admin_token", token);
    localStorage.setItem("admin_user", JSON.stringify(user));

    // Set token in API client
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    setAdmin(user);
    toast.success(`Welcome back, ${fullName}!`);
    navigate("/admin");
    return true;
  };

  const logout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
    delete api.defaults.headers.common["Authorization"];
    setAdmin(null);
    toast.success("Logged out successfully");
    navigate("/");
  };

  const value = {
    admin,
    login,
    logout,
    loading,
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used within AdminAuthProvider");
  }
  return context;
};
