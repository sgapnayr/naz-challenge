import React from "react";

export default function BaseWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="p-16 pt-32 flex justify-start items-center flex-col bg-background min-h-screen relative">
      {children}
    </div>
  );
}
