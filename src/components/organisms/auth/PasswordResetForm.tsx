'use client';

import Input from '@/components/atoms/common/Input';
import { SubmitButton } from '@/components/atoms/common/SubmitButton';
import { useAuth } from '@/hooks';
import { authValidation } from '@/utils/auth/validation';
import { FormEvent } from 'react';

function ResetForm() {
  const { isPending, resetPassword } = useAuth();

  const handleRecoverPassword = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const password = formData.get('password') as string;
    const passwordConfirm = formData.get('passwordConfirm') as string;

    const isValid = authValidation(undefined, password, passwordConfirm);

    if (!isValid) return;

    form.reset();

    resetPassword(password);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-2 pb-6">
        <h1 className="text-2xl font-bold">비밀번호 변경</h1>
        <p className="text-sm text-gray-500">Reset your password</p>
      </div>

      <form
        onSubmit={handleRecoverPassword}
        className="w-full h-fit min-h-[35%] flex flex-col items-center justify-center gap-10"
      >
        <div className="w-[90%] flex flex-col items-center justify-center gap-10">
          <div className="w-full flex flex-col gap-4">
            <Input type="password" placeholder="password" name="password" />

            <Input type="password" placeholder="repeat password" name="passwordConfirm" />

            <p className="w-full text-sm text-right text-gray-500">비밀번호를 변경하세요</p>
          </div>
        </div>

        <SubmitButton
          className="bg-main-color w-[90%] text-white rounded-lg px-4 py-2"
          pendingText="변경 중..."
          pending={isPending}
        >
          변경
        </SubmitButton>
      </form>
    </>
  );
}

export default ResetForm;
