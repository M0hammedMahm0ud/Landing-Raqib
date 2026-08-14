export const SubscriptionBadge = ({ plan }) => {
  const colorClasses = {
    Pro: "bg-blue-100 text-blue-800",
    Ultra: "bg-purple-100 text-purple-800",
  };

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${
        colorClasses[plan] || "bg-gray-100 text-gray-800"
      }`}
    >
      {plan}
    </span>
  );
};
