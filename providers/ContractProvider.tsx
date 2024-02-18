"use client";

import React from "react";
import { ContractContext } from "@/context/ContractContext";

function AuthProvider({
  children,
  userId,
}: {
  children: React.ReactNode;
  userId: string;
}) {
  return (
    <ContractContext.Provider value={userId as any}>
      {children}
    </ContractContext.Provider>
  );
}

export default AuthProvider;
