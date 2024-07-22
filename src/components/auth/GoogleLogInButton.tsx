"use client";

import useAuth from "@/hooks/useAuth";
import { showAlert } from "@/lib/openCustomAlert";
import { usePathname } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

function GoogleLogInButton() {
    const { loginWithProvider } = useAuth();
    const pathname = usePathname();

    const handleClickGoogle = async () => {
        if (pathname === "/recover")
            return showAlert("caution", "비밀번호 복구 페이지에서는 소셜로그인이 불가합니다");
        loginWithProvider("google");
    };

    return <FcGoogle className="w-11 h-11 cursor-pointer" onClick={handleClickGoogle} />;
}

export default GoogleLogInButton;
