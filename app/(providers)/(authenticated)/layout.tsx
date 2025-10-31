import { Metadata } from "next";
import React from "react";
import { defaultMetaData } from "@/data/defaultMetaData";

type AuthenticatedLayoutProps = {
  children: React.ReactNode;
};

export const metadata: Metadata = defaultMetaData;

const AuthenticatedLayout: React.FC<AuthenticatedLayoutProps> = ({
  children,
}) => {
  return <>{children}</>;
};

export default AuthenticatedLayout;
