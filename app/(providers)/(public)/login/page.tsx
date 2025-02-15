import AuthPageBottom from '@/components/molecules/auth/AuthPageBottom';
import AuthPageWrapper from '@/components/molecules/auth/AuthPageWrapper';
import LogInForm from '@/components/organisms/auth/LogInForm';
import Link from 'next/link';
import React from 'react';

const LogInPage: React.FC = () => {
  return (
    <AuthPageWrapper>
      <LogInForm />

      <AuthPageBottom />

      <p className="text-xs text-gray-500">
        <span>아직 회원이 아니신가요?&nbsp;</span>
        <Link href="/signup" className="text-main-color">
          회원가입
        </Link>
      </p>
    </AuthPageWrapper>
  );
};

export default LogInPage;
