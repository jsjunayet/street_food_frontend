interface PremiumBadgeProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const PremiumBadge = ({ className = "", size = "md" }: PremiumBadgeProps) => {
  const sizeClasses = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-2.5 py-1",
    lg: "text-base px-3 py-1.5",
  };

  return (
    <span
      className={`bg-gradient-to-r from-yellow-300 to-yellow-500 text-black font-bold rounded-full shadow-md ${sizeClasses[size]} ${className}`}
    >
      Premium
    </span>
  );
};

export default PremiumBadge;
