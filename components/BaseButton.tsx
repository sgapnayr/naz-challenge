import React from "react";

export default function BaseButton({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`cursor-pointer hover:opacity-90 active:opacity-75 h-[47px] rounded-[10px] flex justify-center items-center text-[16px] ${className}`}
    >
      {children}
    </div>
  );
}
