import React from 'react';

interface BaseButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  buttonState?: 'idle' | 'loading';
}

const Loader: React.FC = () => <div className="border-4 border-t-transparent rounded-full animate-spin w-4 h-4" />;

const BaseButton: React.FC<BaseButtonProps> = ({ children, className = '', onClick, buttonState = 'idle' }) => {
  const isLoading = buttonState === 'loading';

  return (
    <button
      onClick={isLoading ? undefined : onClick}
      disabled={isLoading}
      className={`cursor-pointer ${
        isLoading ? 'cursor-not-allowed opacity-50' : 'hover:opacity-90 active:opacity-75'
      } h-[47px] rounded-[10px] flex justify-center items-center text-[16px] ${className}`}
      type="button"
    >
      {isLoading ? <Loader /> : children}
    </button>
  );
};

export default BaseButton;
