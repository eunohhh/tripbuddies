"use client";

import React, { useEffect } from "react";
import DefaultLoader from "@/components/atoms/common/DefaultLoader";
import { useAuth } from "@/hooks";

const LoadingPage: React.FC = () => {
  const { naverLogIn } = useAuth();

  useEffect(() => {
    if (window.location.hash) {
      const hash = window.location.hash.substring(1);
      const params = new URLSearchParams(hash);
      const token = params.get("access_token");
      if (token) naverLogIn(token);
    }
  }, [naverLogIn]);

  return <DefaultLoader />;
};

export default LoadingPage;
