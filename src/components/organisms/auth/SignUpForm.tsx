"use client";

import { FormEvent } from "react";
import AuthSubText from "@/components/atoms/auth/AuthSubText";
import Input from "@/components/atoms/common/Input";
import { SubmitButton } from "@/components/atoms/common/SubmitButton";
import { useAuth } from "@/hooks";
import { authValidation } from "@/utils/auth/validation";

function SignUpForm() {
  const { isPending, signUp } = useAuth();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    // const name = formData.get('name') as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const passwordConfirm = formData.get("passwordConfirm") as string;

    const isValid = authValidation(email, password, passwordConfirm);

    if (!isValid) return;

    form.reset();

    signUp(email, password);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-2 pb-4">
        <h1 className="font-bold text-2xl">회원가입</h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex h-fit min-h-[35%] w-full flex-col items-center justify-center"
      >
        <div className="flex w-[90%] flex-col items-center justify-center gap-8">
          <div className="flex w-full flex-col gap-4">
            <div className="flex w-full flex-col justify-center gap-2">
              <Input type="text" placeholder="이메일 입력" name="email" />
              <AuthSubText text="ex) abcd1234@gmail.com" />
            </div>
            <div className="flex w-full flex-col justify-center gap-2">
              <Input
                type="password"
                placeholder="비밀번호 입력"
                name="password"
              />
              <AuthSubText text="영문자 및 숫자 조합으로 8자 ~ 16자 이내 입력" />
            </div>
            <div className="flex w-full flex-col justify-center gap-2">
              <Input
                type="password"
                placeholder="비밀번호 입력"
                name="passwordConfirm"
              />
              <AuthSubText text="영문자 및 숫자 조합으로 8자 ~ 16자 이내 입력" />
            </div>
          </div>
        </div>

        <div className="h-[10vh] w-full"></div>

        <SubmitButton
          className="w-[90%] rounded-2xl bg-main-color px-4 py-3 font-bold text-white text-xl"
          type="submit"
          pendingText="진행중..."
          pending={isPending}
        >
          회원가입
        </SubmitButton>
      </form>
    </>
  );
}

export default SignUpForm;
