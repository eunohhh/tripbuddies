"use client";

import { useCallback, useEffect, useState } from "react";

export default function TopButton({
  setShowResult,
}: {
  setShowResult: (value: boolean | null) => void;
}) {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = useCallback(() => {
    const dateSection = document.getElementById("result-section");
    if (dateSection) {
      const { top } = dateSection.getBoundingClientRect();
      setIsVisible(window.scrollY > top);
    }
  }, []);

  const scrollToTop = () => {
    setShowResult(false);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    isVisible && (
      <button
        type="button"
        onClick={scrollToTop}
        className="fixed right-1/2 bottom-16 z-[999] translate-x-[530%] transform rounded-full bg-main-color p-2 px-3 text-white shadow-lg xl:right-auto xl:bottom-10 xl:left-1/2 xl:translate-x-[1350%] xl:transform"
      >
        ↑
      </button>
    )
  );
}

// return (
//     isVisible && (
//         <button
//             onClick={scrollToTop}
//             className="fixed bottom-20 right-5 p-2 px-3 bg-main-color text-white rounded-full shadow-lg transition-transform transform xl:right-10 xl:bottom-10"
//         >
//             ↑
//         </button>
//     )
// );
