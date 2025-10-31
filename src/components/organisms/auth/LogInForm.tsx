"use client";

import clsx from "clsx";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import AuthSubText from "@/components/atoms/auth/AuthSubText";
import Input from "@/components/atoms/common/Input";
import { useAuth } from "@/hooks";
import { authValidation } from "@/utils/auth/validation";
import { SubmitButton } from "../../atoms/common/SubmitButton";

function LogInForm() {
  const { isPending, logIn, sendingResetEmail } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode");
  const [isRecoverPassword, setIsRecoverPassword] = useState(
    mode === "recover",
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const isValid = authValidation(email, password);

    if (!isValid) return;

    form.reset();

    logIn(email, password);
  };

  const handleRecoverPassword = (e: FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    const formData = new FormData(form);
    const email = formData.get("email") as string;

    const isValid = authValidation(email);

    if (!isValid) return;

    form.reset();

    sendingResetEmail(email);
  };

  useEffect(() => {
    if (isRecoverPassword) {
      router.push("/login?mode=recover");
    } else {
      router.replace("/login?mode=login");
    }
  }, [isRecoverPassword, router]);

  useEffect(() => {
    if (mode === "recover") {
      setIsRecoverPassword(true);
    } else {
      setIsRecoverPassword(false);
    }
  }, [mode]);

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-2 pb-4">
        <h1 className="font-bold text-2xl">
          {isRecoverPassword ? "비밀번호 찾기" : "로그인"}
        </h1>
      </div>

      <form
        onSubmit={isRecoverPassword ? handleRecoverPassword : handleSubmit}
        className={twMerge(
          "flex h-fit min-h-[35%] w-full flex-col items-center justify-center",
          isRecoverPassword && "gap-30",
        )}
      >
        <div className="flex w-[90%] flex-col items-center justify-center gap-8">
          <div className="flex w-full flex-col justify-center gap-2">
            <Input type="text" placeholder="이메일 입력" name="email" />
            {isRecoverPassword ? (
              <AuthSubText text="이메일로 인증번호를 보내드려요" />
            ) : (
              <AuthSubText text="ex) abcd1234@gmail.com" />
            )}
          </div>

          {isRecoverPassword ? null : (
            <div
              className={clsx(
                "flex w-full flex-col gap-4",
                isRecoverPassword && "gap-4",
              )}
            >
              <div className="flex w-full flex-col justify-center gap-2">
                <Input
                  type="password"
                  placeholder="비밀번호 입력"
                  name="password"
                />
                <AuthSubText text="영문자 및 숫자 조합으로 8자 ~ 16자 이내 입력" />
              </div>

              <div className="flex w-full flex-col justify-center gap-2">
                {isRecoverPassword && (
                  <Input
                    type="password"
                    placeholder="confirm password"
                    name="passwordConfirm"
                  />
                )}

                <button
                  type="button"
                  onClick={() => setIsRecoverPassword(true)}
                  className="w-full text-right text-gray-500 text-xs"
                >
                  비밀번호를 잊으셨나요?
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="h-[10vh] w-full"></div>

        <SubmitButton
          className="w-[90%] rounded-2xl bg-main-color px-4 py-3 font-bold text-white text-xl"
          type="submit"
          pendingText="진행중..."
          pending={isPending}
        >
          {isRecoverPassword ? "비밀번호 찾기" : "로그인"}
        </SubmitButton>
      </form>
    </>
  );
}
export default LogInForm;
