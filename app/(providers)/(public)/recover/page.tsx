import AuthPageBottom from '@/components/molecules/auth/AuthPageBottom';
import AuthPageWrapper from '@/components/molecules/auth/AuthPageWrapper';
import ResetForm from '@/components/organisms/auth/PasswordResetForm';
import { getUserFromHeader } from '@/utils/auth/getUserFromHeader';
import Link from 'next/link';
import React from 'react';

const RecoverPage: React.FC = async () => {
  const id = getUserFromHeader();

  // console.log('리커버페이지에 아이디가 있냐 ??? id =====>', id);

  return (
    <AuthPageWrapper>
      {!id ? (
        <p className="text-sm min-h-[35%] text-gray-500">
          이메일 링크를 통한 접근만 가능합니다! 다시 시도해주세요
        </p>
      ) : (
        <ResetForm />
      )}

      <AuthPageBottom />

      <p className="text-sm text-gray-500">
        <span>아직 회원이 아니신가요?&nbsp;</span>
        <Link href="/signup" className="text-main-color">
          회원가입
        </Link>
      </p>
    </AuthPageWrapper>
  );
};

export default RecoverPage;
