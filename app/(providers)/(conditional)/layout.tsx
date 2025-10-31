import { Metadata } from "next";
import React from "react";
import { defaultMetaData } from "@/data/defaultMetaData";

type ConditionalLayoutProps = {
  children: React.ReactNode;
};

export const metadata: Metadata = defaultMetaData;

const ConditionalLayout: React.FC<ConditionalLayoutProps> = ({ children }) => {
  return <>{children}</>;
};

export default ConditionalLayout;
