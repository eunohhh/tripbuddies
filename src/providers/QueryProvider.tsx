'use client';
import { isServer, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // SSR을 사용하면 일반적으로 기본 staleTime을
        // 0 이상으로 설정하여 클라이언트에서 즉시 리프레시되지 않도록 합니다.
        refetchOnWindowFocus: false,
        retry: false,
        staleTime: 60 * 1000,
      },
    },
  });
}

// undefined 로 초기값 설정
let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (isServer) {
    // 서버: 항상 새 쿼리 클라이언트 만들기
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

function QueryProvider({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  // 데브툴즈 initialIsOpen 꼭 아래처럼 설정해야 서버 오류 안남
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={process.env.NEXT_PUBLIC_RUN_MODE === 'local'} />
    </QueryClientProvider>
  );
}

export default QueryProvider;
