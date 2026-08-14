import { useState, useEffect } from "react";
import { PageHeader } from "../components/common/PageHeader";
import { DataTable } from "../components/common/DataTable";
import { Modal } from "../components/common/Modal";
import { CompanyForm } from "../components/Companies/CompanyForm";
import { SubscriptionBadge } from "../components/Companies/SubscriptionBadge";
import { Button } from "../components/shared/Button";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
import { adminApi } from "../api";
import toast from "react-hot-toast";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const CompaniesPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      const response = await adminApi.getCompanies();
      setCompanies(response.data);
    } catch (err) {
      toast.error(t("companies.errorLoading"));
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setSelectedCompany(null);
    setShowModal(true);
  };

  const handleEdit = (company) => {
    setSelectedCompany(company);
    setShowModal(true);
  };

  const handleDelete = async (company) => {
    if (!confirm(t("companies.deactivateConfirm", { name: company.name }))) return;

    try {
      await adminApi.deleteCompany(company.id);
      toast.success(t("companies.deactivatedSuccess"));
      fetchCompanies();
    } catch (err) {
      toast.error(t("companies.deactivateError"));
    }
  };

  const handleSubmit = async (formData) => {
    try {
      setSubmitting(true);
      if (selectedCompany) {
        await adminApi.updateCompany(selectedCompany.id, formData);
        toast.success(t("companies.updateSuccess"));
      } else {
        await adminApi.createCompany(formData);
        toast.success(t("companies.createSuccess"));
      }
      setShowModal(false);
      fetchCompanies();
    } catch (err) {
      toast.error(err.response?.data?.message || t("companies.operationFailed"));
    } finally {
      setSubmitting(false);
    }
  };

  const columns = [
    { key: "name", label: t("companies.companyName"), sortable: true },
    {
      key: "subscriptionPlan",
      label: t("companies.plan"),
      render: (row) => <SubscriptionBadge plan={row.subscriptionPlan} />,
    },
    {
      key: "isActive",
      label: t("companies.status"),
      render: (row) => (
        <span
          className={`px-3 py-1 text-xs font-bold rounded-full ${
            row.isActive
              ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400"
              : "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400"
          }`}
        >
          {row.isActive ? t("companies.active") : t("companies.inactive")}
        </span>
      ),
    },
    {
      key: "userCount",
      label: t("companies.users"),
      render: (row) => `${row.activeUsers}/${row.maxUsers}`,
    },
    {
      key: "cameraCount",
      label: t("companies.cameras"),
      render: (row) => `${row.cameraCount}/${row.maxCameras}`,
    },
    {
      key: "subscriptionEndDate",
      label: t("companies.expires"),
      render: (row) =>
        row.subscriptionEndDate
          ? format(new Date(row.subscriptionEndDate), "MMM dd, yyyy")
          : "N/A",
    },
    {
      key: "actions",
      label: t("common.actions"),
      render: (row) => (
        <div className="flex gap-2">
          <motion.button
            onClick={() => navigate(`/admin/companies/${row.id}`)}
            className="p-2 text-violet-600 dark:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-900/20 rounded-lg transition-colors"
            title="View Details"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Eye size={16} />
          </motion.button>
          <motion.button
            onClick={() => handleEdit(row)}
            className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
            title="Edit"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Edit size={16} />
          </motion.button>
          <motion.button
            onClick={() => handleDelete(row)}
            className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
            title="Deactivate"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Trash2 size={16} />
          </motion.button>
        </div>
      ),
    },
  ];

  return (
    <>
      <PageHeader
        title={t("companies.title")}
        subtitle={t("companies.subtitle")}
        action={
          <Button onClick={handleCreate} icon={Plus} iconPosition="left">
            {t("companies.addCompany")}
          </Button>
        }
      />

      <DataTable
        columns={columns}
        data={companies}
        loading={loading}
        searchPlaceholder={t("companies.searchPlaceholder")}
      />

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={selectedCompany ? t("companies.editCompany") : t("companies.createCompany")}
      >
        <CompanyForm
          company={selectedCompany}
          onSubmit={handleSubmit}
          onCancel={() => setShowModal(false)}
          loading={submitting}
        />
      </Modal>
    </>
  );
};
