import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LandingPage } from "./pages/LandingPage";
import { LoginPage } from "./pages/LoginPage";
import { AdminLayout } from "./AdminLayout";
import { DashboardPage } from "./pages/DashboardPage";
import { CompaniesPage } from "./pages/CompaniesPage";
import { CompanyDetailsPage } from "./pages/CompanyDetailsPage";
import { MonitoringPage } from "./pages/MonitoringPage";
import { UsersPage } from "./pages/UsersPage";
import { ActivationRequestsPage } from "./pages/ActivationRequestsPage";
import { AdminAuthProvider } from "./AdminAuthContext";
import { Toaster } from "react-hot-toast";

function App() {
  const { t } = useTranslation();
  return (
    <Router basename="/Landing-Raqib">
      <AdminAuthProvider>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="companies" element={<CompaniesPage />} />
            <Route path="companies/:id" element={<CompanyDetailsPage />} />
            <Route path="activation-requests" element={<ActivationRequestsPage />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="monitoring" element={<MonitoringPage />} />
          </Route>

          <Route path="*" element={<p>{t("app.notFound")}</p>} />
        </Routes>
      </AdminAuthProvider>
    </Router>
  );
}

export default App;
