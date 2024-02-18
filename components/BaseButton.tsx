import React from "react";

export default function BaseButton({
  children,
  className,
  onClick,
  buttonState,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: any;
  buttonState?: string;
}) {
  const loader = () => (
    <div className="border-4 border-t-transparent rounded-full animate-spin w-4 h-4" />
  );

  const isLoading = buttonState === "loading";

  return (
    <div
      onClick={!isLoading ? onClick : undefined}
      className={`cursor-pointer ${
        !isLoading
          ? "hover:opacity-90 active:opacity-75"
          : "cursor-not-allowed opacity-50"
      } h-[47px] rounded-[10px] flex justify-center items-center text-[16px] ${className}`}
    >
      {isLoading ? loader() : children}
    </div>
  );
}
