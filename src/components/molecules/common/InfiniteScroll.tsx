'use client';

import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

type InfiniteScrollProps = {
  fetchNextPage: () => void;
  hasNextPage: boolean;
  children: React.ReactNode;
};

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  fetchNextPage,
  hasNextPage,
  children,
}) => {
  const { ref, inView } = useInView({ threshold: 0 });

  useEffect(() => {
    if (!(inView && hasNextPage)) return;
    fetchNextPage();
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <>
      {children}
      <div className="h-[20px]" ref={ref} />
    </>
  );
};

export default InfiniteScroll;
