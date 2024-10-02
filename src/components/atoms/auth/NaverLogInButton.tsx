'use client';

import { PUBLIC_URL } from '@/constants/common.constants'; // import Script from 'next/script';
import Script from 'next/script';
import React, { useCallback, useRef, useState } from 'react';
import { SiNaver } from 'react-icons/si';

const NaverLogInButton: React.FC = () => {
  const [naverObj, setNaverObj] = useState<any>(null);

  const naverRef = useRef<HTMLButtonElement>(null);

  const handleNaverInit = useCallback(() => {
    const naver = window.naver;
    setNaverObj(naver);
    // if (!naverObj) return;

    const naverLogin = new naver.LoginWithNaverId({
      clientId: process.env.NEXT_PUBLIC_NAVER_CLIENT_ID, //ClientID
      callbackUrl: `${PUBLIC_URL}/loading`, // Callback URL
      callbackHandle: true,
      isPopup: false, // 팝업 형태로 인증 여부
      loginButton: {
        color: 'green', // 색상
        type: 1, // 버튼 크기
        height: '60', // 버튼 높이
      }, // 로그인 버튼 설정
    });
    naverLogin.init();
  }, []);

  const handleNaverLoginClick = () => {
    if (!naverRef.current?.children[0].children) return;
    (naverRef.current.children[0].children[0] as HTMLImageElement).click();
  };

  return (
    <>
      <Script
        src="https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.2.js"
        onLoad={handleNaverInit}
      />
      <button ref={naverRef} id="naverIdLogin" className="hidden" />
      {!naverObj ? (
        <SiNaver className="w-10 h-10 text-green-500" />
      ) : (
        <SiNaver
          className="w-10 h-10 text-green-500 cursor-pointer"
          onClick={handleNaverLoginClick}
        />
      )}
    </>
  );
};

export default NaverLogInButton;
