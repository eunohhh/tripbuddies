'use client';
import { useCallback, useLayoutEffect, useRef, useState } from 'react';

export const useLockBodyScroll = (initialState: boolean = false) => {
  const [isLocked, setIsLocked] = useState(initialState);
  const [scrollY, setScrollY] = useState(0);
  const originalStyleRef = useRef<string>('');

  const lockScroll = () => {
    if (!isLocked) {
      // Store original styles
      // originalStyleRef.current = window.getComputedStyle(
      //     document.body,
      // ).overflow;
      // setScrollY(window.scrollY);

      // Lock body scroll
      document.body.style.overflow = 'hidden';
      // document.body.style.position = 'fixed';
      // document.body.style.top = `-${window.scrollY}px`;
      document.body.style.width = '100%';
      setIsLocked(true);
    }
  };

  const unlockScroll = useCallback(() => {
    if (isLocked) {
      // Restore original styles
      // document.body.style.overflow = originalStyleRef.current || '';
      document.body.style.overflow = 'auto';
      document.body.style.position = '';
      // document.body.style.top = '';
      // window.scrollTo(0, scrollY);
      setIsLocked(false);
    }
  }, [isLocked]);

  useLayoutEffect(() => {
    // Unlock scroll on component unmount
    return () => {
      if (isLocked) {
        unlockScroll();
      }
    };
  }, [isLocked, unlockScroll]);

  const setLock = (lock: boolean) => {
    if (lock) {
      lockScroll();
    }
    if (!lock) {
      unlockScroll();
    }
  };

  return { isLocked, setLock };
};
