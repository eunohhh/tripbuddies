"use client";
import NaverLogInButton from "@/components/atoms/auth/NaverLogInButton";
import GoogleLogInButton from "../../atoms/auth/GoogleLogInButton";
import KaKaoLogInButton from "../../atoms/auth/KaKaoLogInButton";

function AuthPageBottom() {
  return (
    <>
      <div className="flex w-full items-center justify-center gap-2">
        <hr className="w-36 border-gray-400" />
        <p className="text-gray-500 text-sm">또는</p>
        <hr className="w-36 border-gray-400" />
      </div>

      <div className="flex items-center justify-center gap-8">
        <GoogleLogInButton />
        <KaKaoLogInButton />
        <NaverLogInButton />
      </div>
    </>
  );
}

export default AuthPageBottom;
