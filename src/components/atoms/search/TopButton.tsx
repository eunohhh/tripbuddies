'use client';

import { useEffect, useState } from 'react';

export default function TopButton({
  setShowResult,
}: {
  setShowResult: (value: boolean | null) => void;
}) {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const dateSection = document.getElementById('result-section');
    if (dateSection) {
      const { top } = dateSection.getBoundingClientRect();
      setIsVisible(window.scrollY > top);
    }
  };

  const scrollToTop = () => {
    setShowResult(false);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    isVisible && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-16 right-1/2 p-2 px-3 transform translate-x-[530%] xl:right-auto xl:left-1/2 xl:transform xl:translate-x-[1350%] xl:bottom-10 bg-main-color text-white rounded-full shadow-lg z-[999]"
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
