import React from "react";

type SkeletonProps = React.HTMLAttributes<HTMLDivElement> & {
  className?: string;
};

export const Skeleton: React.FC<SkeletonProps> = ({ className, ...props }) => {
  return (
    <div
      className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded ${className}`}
      {...props}
    />
  );
};
