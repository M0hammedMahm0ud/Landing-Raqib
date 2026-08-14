import axios from "axios";

// When deployed, the frontend and backend are served from the same origin,
// so a relative base URL is the safest fallback. In local dev the Vite env
// files explicitly set VITE_API_URL / VITE_ADMIN_API_URL.
const API_BASE = import.meta.env.VITE_API_URL || "/api";
const ADMIN_API_BASE = import.meta.env.VITE_ADMIN_API_URL || "/api/admin";

// Create axios instance
const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("admin_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Handle 401 errors (unauthorized)
// Skip redirect for login endpoint — invalid credentials should show inline error, not bounce to landing
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response?.status === 401 &&
      !error.config?.url?.includes("/auth/login")
    ) {
      localStorage.removeItem("admin_token");
      localStorage.removeItem("admin_user");
      window.location.href = "/";
    }
    return Promise.reject(error);
  },
);

// Admin API methods
export const adminApi = {
  // Company management
  getCompanies: () => api.get(`${ADMIN_API_BASE}/companies`),
  getCompany: (id) => api.get(`${ADMIN_API_BASE}/companies/${id}`),
  createCompany: (data) => api.post(`${ADMIN_API_BASE}/companies`, data),
  updateCompany: (id, data) =>
    api.put(`${ADMIN_API_BASE}/companies/${id}`, data),
  deleteCompany: (id) => api.delete(`${ADMIN_API_BASE}/companies/${id}`),
  getCompanyStats: (id) => api.get(`${ADMIN_API_BASE}/companies/${id}/stats`),

  // Activation request workflow
  getActivationRequests: (status) =>
    api.get(`${ADMIN_API_BASE}/activation-requests`, {
      params: status ? { status } : {},
    }),
  getPendingActivationCount: () =>
    api.get(`${ADMIN_API_BASE}/activation-requests/count`, {
      params: { status: "Pending" },
    }),
  getActivationRequestTransitions: (id) =>
    api.get(`${ADMIN_API_BASE}/activation-requests/${id}/transitions`),
  approveActivationRequest: (id, data) =>
    api.post(`${ADMIN_API_BASE}/activation-requests/${id}/approve`, data),
  rejectActivationRequest: (id, reason) =>
    api.post(`${ADMIN_API_BASE}/activation-requests/${id}/reject`, { reason }),
  cancelActivationRequest: (id, reason) =>
    api.post(`${ADMIN_API_BASE}/activation-requests/${id}/cancel`, { reason }),

  // Company status management
  suspendCompany: (id, reason) =>
    api.post(`${ADMIN_API_BASE}/companies/${id}/suspend`, { reason }),
  unsuspendCompany: (id) =>
    api.post(`${ADMIN_API_BASE}/companies/${id}/unsuspend`),
  cancelCompany: (id, reason) =>
    api.post(`${ADMIN_API_BASE}/companies/${id}/cancel`, { reason }),
  getCompanyStatusTransitions: (id) =>
    api.get(`${ADMIN_API_BASE}/companies/${id}/status-transitions`),

  // Customer machines
  listCustomerMachines: () => api.get(`${ADMIN_API_BASE}/machines`),

  // Monitoring
  getSystemHealth: () => api.get(`${ADMIN_API_BASE}/monitoring/system-health`),
  getCompanyMetrics: () =>
    api.get(`${ADMIN_API_BASE}/monitoring/company-metrics`),
  getAlerts: () => api.get(`${ADMIN_API_BASE}/monitoring/alerts`),

  // Users
  getAllUsers: () => api.get(`${ADMIN_API_BASE}/users`),
  getUsersByCompany: (companyId) =>
    api.get(`${ADMIN_API_BASE}/users/company/${companyId}`),
  deactivateUser: (userId) =>
    api.put(`${ADMIN_API_BASE}/users/${userId}/deactivate`),
};

export default api;
