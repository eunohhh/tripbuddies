'use client';

interface CustomAlertProps {
  mode: 'success' | 'caution' | 'error';
  description: string;
  isConfirm?: boolean;
  onClose?: () => void;
  onCancel?: () => void;
}

function CustomAlert({
  mode: title = 'success',
  description = '성공했습니다!',
  isConfirm = false,
  onClose = () => {},
  onCancel = () => {},
}: CustomAlertProps) {
  return (
    <div className="bg-black/50 fixed top-0 left-0 w-full h-full flex justify-center items-center z-[9999]">
      <dialog open className="rounded-xl z-50">
        <div className="bg-white w-[300px] min-h-[121px] max-h-[200px] py-2 rounded-lg flex flex-col justify-center items-center gap-3 transition-all duration-300">
          <div className="flex flex-col items-center gap-2 w-full">
            {/* <h2
                            className={`text-2xl font-bold w-full text-center ${
                                title === 'success'
                                    ? 'text-main-color'
                                    : 'text-red-300'
                            }`}
                        >
                            {title}
                        </h2> */}
            <p className="text-lg font-bold text-grayscale-color-700 mt-0 w-[80%] text-center break-words">
              {description}
            </p>
          </div>
          <div className="flex flex-row justify-center items-center gap-4">
            {isConfirm && (
              <button
                // className="bg-gray-200 text-gray-500 px-4 py-2 rounded-md focus-visible:outline-none"
                className="text-primary-color-400 px-4 py-0.5 font-bold"
                onClick={onCancel}
              >
                취소
              </button>
            )}
            <button className="text-primary-color-400 px-4 py-0.5 font-bold" onClick={onClose}>
              확인
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default CustomAlert;
