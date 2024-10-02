import { PropsWithChildren } from 'react';

function AuthPageWrapper({ children }: PropsWithChildren) {
  return (
    <section className="relative flex justify-center items-center min-h-[calc(100dvh-57px)] w-full mx-auto bg-white pb-10 xl:min-h-[calc(100dvh-100px)]">
      <div className="h-full w-full flex flex-col items-center justify-center my-0 mx-auto xl:w-[430px]">
        <div className="h-full w-full flex flex-col items-center justify-center gap-10">
          {children}
        </div>
      </div>
    </section>
  );
}

export default AuthPageWrapper;
