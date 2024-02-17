import BaseWrapper from "@/components/BaseWrapper";
import React from "react";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <BaseWrapper>{children}</BaseWrapper>;
}
