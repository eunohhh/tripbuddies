"use client";
import { useEffect, useState } from "react";
import useCheckPwa from "@/hooks/common/useCheckPwa";

// TypeScript 인터페이스 정의
interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

const InstallPromptHandler = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);
  const isPwa = useCheckPwa();
  const [isIos, setIsIos] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      // console.log('beforeinstallprompt event fired');
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handler as any);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler as any);
    };
  }, []);

  useEffect(() => {
    const ua = window.navigator.userAgent;
    const isIOS = /iPad|iPhone|iPod/.test(ua) && !(window as any).MSStream;
    const isAndroid = /Android/.test(ua);

    setIsIos(isIOS);
    setIsAndroid(isAndroid);

    if (isPwa) {
      alert("PWA가 이미 설치되었습니다.");
    }
  }, [isPwa]);

  const handleInstallClick = async () => {
    // console.log('버튼 클릭되었음');
    alert(deferredPrompt);
    if (deferredPrompt) {
      (deferredPrompt as any).prompt();
      (deferredPrompt as any).userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === "accepted") {
          // console.log('User accepted the install prompt');
        } else {
          // console.log('User dismissed the install prompt');
        }
        setDeferredPrompt(null);
      });
    } else {
      if (navigator.share) {
        try {
          await navigator.share({
            title: "PWA 설치",
            text: "이 링크를 통해 PWA를 설치하세요:",
            url: window.location.href,
          });
          console.log("PWA 설치 링크가 공유되었습니다.");
        } catch (error) {
          console.error("PWA 설치 링크 공유 실패:", error);
        }
      } else {
        alert("이 브라우저는 웹 공유 API를 지원하지 않습니다.");
      }
    }
  };

  useEffect(() => {
    // alert('serviceWorker' in navigator);
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js", { type: "module" }).then(
        (registration) => {
          alert("Service Worker registered with scope:");
          console.log(
            "Service Worker registered with scope:",
            registration.scope,
          );
        },
        (error) => {
          alert("Service Worker registration failed:");
          console.log("Service Worker registration failed:", error);
        },
      );
    }

    const handler = (e: BeforeInstallPromptEvent) => {
      // console.log('beforeinstallprompt 이벤트 발생', e);
      e.preventDefault();
      alert(e);
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handler as any);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler as any);
    };
  }, []);

  if (isPwa) {
    return null;
  }

  return (
    <div className="fixed right-0 bottom-0 z-50 m-4">
      <button
        type="button"
        onClick={handleInstallClick}
        className="rounded-md bg-blue-500 px-4 py-2 text-white"
      >
        홈 화면에 추가하기
      </button>
    </div>
  );
};

export default InstallPromptHandler;
