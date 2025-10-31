import { PropsWithChildren } from "react";

function AuthPageWrapper({ children }: PropsWithChildren) {
  return (
    <section className="relative mx-auto flex min-h-[calc(100dvh-57px)] w-full items-center justify-center bg-white pb-10 xl:min-h-[calc(100dvh-100px)]">
      <div className="mx-auto my-0 flex h-full w-full flex-col items-center justify-center xl:w-[430px]">
        <div className="flex h-full w-full flex-col items-center justify-center gap-10">
          {children}
        </div>
      </div>
    </section>
  );
}

export default AuthPageWrapper;
