"use client";

import { usePathname } from "next/navigation";
import React from "react";
import { SiKakaotalk } from "react-icons/si";
import { useAuth } from "@/hooks";
import { showAlert } from "@/utils/ui/openCustomAlert";

const KaKaoLogInButton: React.FC = () => {
  const { loginWithProvider } = useAuth();
  const pathname = usePathname();

  const handleClickKaKao = async () => {
    if (pathname === "/recover")
      return showAlert(
        "caution",
        "비밀번호 복구 페이지에서는 소셜로그인이 불가합니다",
      );
    loginWithProvider("kakao");
  };

  return (
    <SiKakaotalk
      className="h-10 w-10 cursor-pointer text-amber-300"
      onClick={handleClickKaKao}
    />
  );
};

export default KaKaoLogInButton;
