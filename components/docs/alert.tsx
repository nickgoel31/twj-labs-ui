import React from "react";

const Alert = ({
  children,
  type = "info",
  className = "",
}: {
  children: React.ReactNode;
  type?: "info" | "warning" | "error" | "success";
  className?: string;
}) => {
  const styles = {
    info: "bg-blue-600/10 border-blue-600/20 text-blue-800 dark:bg-blue-500/10 dark:border-blue-500/20 dark:text-blue-300",
    warning:
      "bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-500/10 dark:border-yellow-500/20 dark:text-yellow-300",
    error:
      "bg-red-50 border-red-200 text-red-800 dark:bg-red-500/10 dark:border-red-500/20 dark:text-red-300",
    success:
      "bg-green-50 border-green-200 text-green-800 dark:bg-green-500/10 dark:border-green-500/20 dark:text-green-300",
  };

  const linkStyles = {
    info: "text-blue-700 dark:text-blue-300 ",
    warning: "text-yellow-700 dark:text-yellow-300",
    error: "text-red-700 dark:text-red-300 ",
    success: "text-green-700 dark:text-green-300 ",
  };

  return (
    <div
      className={`
        alert
        w-full p-4 rounded-md border
        ${styles[type]}
        [&_a]:${linkStyles[type]}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Alert;
