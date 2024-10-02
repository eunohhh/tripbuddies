import LoaderOnly from './LoaderOnly';

const DefaultLoader = () => {
  // 의미 없는 바깥 div 는 fixed 에 따른 경고를 없애기 위해 추가
  return (
    <div>
      <div className="fixed flex items-center justify-center h-dvh w-dvw top-0 left-0 z-50">
        <LoaderOnly />
      </div>
    </div>
  );
};

export default DefaultLoader;
