import { useState } from "react";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";

export const CompanyForm = ({ company, onSubmit, onCancel, loading = false }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: company?.name || "",
    subscriptionPlan: company?.subscriptionPlan || "Pro",
    maxUsers: company?.maxUsers || 10,
    maxCameras: company?.maxCameras || 5,
    subscriptionStartDate: company?.subscriptionStartDate
      ? format(new Date(company.subscriptionStartDate), "yyyy-MM-dd")
      : format(new Date(), "yyyy-MM-dd"),
    subscriptionEndDate: company?.subscriptionEndDate
      ? format(new Date(company.subscriptionEndDate), "yyyy-MM-dd")
      : format(new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), "yyyy-MM-dd"),
    cloudBackupEnabled: company?.cloudBackupEnabled || false,
    isActive: company?.isActive !== undefined ? company.isActive : true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t("companies.form.companyName")}
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
          placeholder={t("companies.form.placeholderCompanyName")}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t("companies.form.subscriptionPlan")}
        </label>
        <select
          name="subscriptionPlan"
          value={formData.subscriptionPlan}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
        >
          <option value="Pro">{t("companies.form.optionPro")}</option>
          <option value="Ultra">{t("companies.form.optionUltra")}</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t("companies.form.maxUsers")}
          </label>
          <input
            type="number"
            name="maxUsers"
            value={formData.maxUsers}
            onChange={handleChange}
            required
            min="1"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t("companies.form.maxCameras")}
          </label>
          <input
            type="number"
            name="maxCameras"
            value={formData.maxCameras}
            onChange={handleChange}
            required
            min="1"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t("companies.form.startDate")}
          </label>
          <input
            type="date"
            name="subscriptionStartDate"
            value={formData.subscriptionStartDate}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t("companies.form.endDate")}
          </label>
          <input
            type="date"
            name="subscriptionEndDate"
            value={formData.subscriptionEndDate}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            name="cloudBackupEnabled"
            checked={formData.cloudBackupEnabled}
            onChange={handleChange}
            className="mr-2 h-4 w-4 text-violet-600 focus:ring-violet-500 border-gray-300 rounded"
          />
          <span className="text-sm text-gray-700">{t("companies.form.cloudBackup")}</span>
        </label>

        <label className="flex items-center">
          <input
            type="checkbox"
            name="isActive"
            checked={formData.isActive}
            onChange={handleChange}
            className="mr-2 h-4 w-4 text-violet-600 focus:ring-violet-500 border-gray-300 rounded"
          />
          <span className="text-sm text-gray-700">{t("companies.form.active")}</span>
        </label>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t">
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
        >
          {t("common.cancel")}
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 text-sm font-medium text-white bg-violet-600 rounded-lg hover:bg-violet-700 disabled:opacity-50"
        >
          {loading ? t("companies.form.saving") : company ? t("companies.form.updateCompany") : t("companies.form.createCompany")}
        </button>
      </div>
    </form>
  );
};
