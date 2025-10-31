import Link from "next/link";
import React from "react";
import AuthPageBottom from "@/components/molecules/auth/AuthPageBottom";
import AuthPageWrapper from "@/components/molecules/auth/AuthPageWrapper";
import LogInForm from "@/components/organisms/auth/LogInForm";

const LogInPage: React.FC = () => {
  return (
    <AuthPageWrapper>
      <LogInForm />

      <AuthPageBottom />

      <p className="text-gray-500 text-xs">
        <span>아직 회원이 아니신가요?&nbsp;</span>
        <Link href="/signup" className="text-main-color">
          회원가입
        </Link>
      </p>
    </AuthPageWrapper>
  );
};

export default LogInPage;
