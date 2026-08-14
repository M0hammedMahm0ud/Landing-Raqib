import { useState, useEffect } from "react";
import { PageHeader } from "../components/common/PageHeader";
import { DataTable } from "../components/common/DataTable";
import { adminApi } from "../api";
import toast from "react-hot-toast";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";

export const UsersPage = () => {
  const { t } = useTranslation();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await adminApi.getAllUsers();
      setUsers(response.data);
    } catch (err) {
      toast.error(t("users.errorLoading"));
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { key: "username", label: t("users.username"), sortable: true },
    { key: "fullName", label: t("users.fullName"), sortable: true },
    { key: "email", label: t("users.email") },
    { key: "companyName", label: t("users.company"), sortable: true },
    {
      key: "userType",
      label: t("users.role"),
      render: (row) => (
        <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
          {row.userType}
        </span>
      ),
    },
    {
      key: "isActive",
      label: t("users.status"),
      render: (row) => (
        <span
          className={`px-2 py-1 text-xs font-medium rounded-full ${
            row.isActive
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {row.isActive ? t("users.active") : t("users.inactive")}
        </span>
      ),
    },
    {
      key: "lastLoginAt",
      label: t("users.lastLogin"),
      render: (row) =>
        row.lastLoginAt
          ? format(new Date(row.lastLoginAt), "MMM dd, yyyy HH:mm")
          : t("users.never"),
    },
  ];

  return (
    <>
      <PageHeader
        title={t("users.title")}
        subtitle={t("users.subtitle")}
      />

      <DataTable
        columns={columns}
        data={users}
        loading={loading}
        searchPlaceholder={t("users.searchPlaceholder")}
      />
    </>
  );
};
