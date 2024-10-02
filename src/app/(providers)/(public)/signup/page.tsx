import AuthPageBottom from '@/components/molecules/auth/AuthPageBottom';
import AuthPageWrapper from '@/components/molecules/auth/AuthPageWrapper';
import SignUpForm from '@/components/organisms/auth/SignUpForm';
import Link from 'next/link';
import React from 'react';

const SignUpPage: React.FC = () => {
  return (
    <AuthPageWrapper>
      <SignUpForm />

      <AuthPageBottom />

      <p className="text-sm text-gray-500">
        <span>이미 계정이 있으신가요?&nbsp;</span>
        <Link href="/login" className="text-main-color">
          로그인
        </Link>
      </p>
    </AuthPageWrapper>
  );
};

export default SignUpPage;
