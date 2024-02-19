import React from 'react';

export default function BaseWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="lg:p-16 p-8 flex justify-start items-center flex-col bg-background min-h-screen relative mx-auto w-auto max-w-[1440px]">{children}</div>
  );
}
