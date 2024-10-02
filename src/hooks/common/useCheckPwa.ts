// "use client";

// import { useEffect, useState } from "react";
// import { isPWA } from "../../utils/pwa/isPWA";

// export default function useCheckPwa() {

//     const [isPwa, setIsPwa] = useState(false);

// useEffect(() => {
//     if (isPWA()) {
//       setIsPwa(true);
//     } else {
//       setIsPwa(false);
//     }
//   }, []);

//   return isPwa;
// }

import { useEffect, useState } from 'react';

const useCheckPwa = (): boolean => {
  const [isPwa, setIsPwa] = useState(false);

  useEffect(() => {
    const checkPwa = (): boolean => {
      return (
        window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as any).standalone === true
      );
    };
    setIsPwa(checkPwa());
  }, []);

  return isPwa;
};

export default useCheckPwa;
