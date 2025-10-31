import LoaderOnly from "./LoaderOnly";

const DefaultLoader = () => {
  // 의미 없는 바깥 div 는 fixed 에 따른 경고를 없애기 위해 추가
  return (
    <div>
      <div className="fixed top-0 left-0 z-50 flex h-dvh w-dvw items-center justify-center">
        <LoaderOnly />
      </div>
    </div>
  );
};

export default DefaultLoader;
