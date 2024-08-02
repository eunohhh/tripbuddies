'use client';

import clsx from 'clsx';
import { useSearchParams } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { SubmitButton } from '../../atoms/common/SubmitButton';
import { useAuth } from '@/hooks/auth';
import { authValidation } from '@/utils/auth/validation';
import AuthSubText from '@/components/atoms/auth/AuthSubText';
import { twMerge } from 'tailwind-merge';
import Input from '@/components/atoms/common/Input';

function LogInForm() {
    const { isPending, logIn, sendingResetEmail } = useAuth();
    const searchParams = useSearchParams();
    const search = searchParams.get('mode');
    const [isRecoverPassword, setIsRecoverPassword] = useState(
        search === 'recover',
    );

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        const isValid = authValidation(email, password);

        if (!isValid) return;

        form.reset();

        logIn(email, password);
    };

    const handleRecoverPassword = (e: FormEvent<HTMLFormElement>) => {
        const form = e.currentTarget;
        const formData = new FormData(form);
        const email = formData.get('email') as string;

        const isValid = authValidation(email);

        if (!isValid) return;

        form.reset();

        sendingResetEmail(email);
    };

    return (
        <>
            <div className="flex flex-col items-center justify-center gap-2 pb-6">
                <h1 className="text-2xl font-bold">
                    {isRecoverPassword ? '비밀번호 찾기' : '로그인'}
                </h1>
            </div>

            <form
                onSubmit={
                    isRecoverPassword ? handleRecoverPassword : handleSubmit
                }
                className={twMerge(
                    'w-full h-fit min-h-[35%] flex flex-col items-center justify-center gap-44',
                    isRecoverPassword && 'gap-72',
                )}
            >
                <div className="w-[90%] flex flex-col items-center justify-center gap-10">
                    <div className="w-full flex flex-col gap-2 justify-center">
                        <Input
                            type="text"
                            placeholder="이메일 입력"
                            name="email"
                        />
                        {isRecoverPassword ? (
                            <AuthSubText text="이메일로 인증번호를 보내드려요" />
                        ) : (
                            <AuthSubText text="ex) abcd1234@gmail.com" />
                        )}
                    </div>

                    {isRecoverPassword ? null : (
                        <div
                            className={clsx(
                                'w-full flex flex-col gap-4',
                                isRecoverPassword && 'gap-4',
                            )}
                        >
                            <div className="w-full flex flex-col gap-2 justify-center">
                                <Input
                                    type="password"
                                    placeholder="비밀번호 입력"
                                    name="password"
                                />
                                <AuthSubText text="영문자 및 숫자 조합으로 8자 ~ 16자 이내 입력" />
                            </div>

                            <div className="w-full flex flex-col gap-2 justify-center">
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
                                    className="w-full text-xs text-right text-gray-500"
                                >
                                    비밀번호를 잊으셨나요?
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <SubmitButton
                    className="bg-main-color w-[90%] text-white rounded-2xl px-4 py-3 font-bold text-xl"
                    type="submit"
                    pendingText="진행중..."
                    pending={isPending}
                >
                    {isRecoverPassword ? '비밀번호 찾기' : '로그인'}
                </SubmitButton>
            </form>
        </>
    );
}
export default LogInForm;
