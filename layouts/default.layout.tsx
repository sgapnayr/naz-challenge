import BaseWrapper from "@/components/BaseWrapper";
import React from "react";
import BaseConnectWallet from "@/components/BaseConnectWallet";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <BaseWrapper>
      <BaseConnectWallet />
      {children}
    </BaseWrapper>
  );
}
