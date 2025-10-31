"use client";

interface CustomAlertProps {
  mode: "success" | "caution" | "error";
  description: string;
  isConfirm?: boolean;
  onClose?: () => void;
  onCancel?: () => void;
}

function CustomAlert({
  mode: title = "success",
  description = "성공했습니다!",
  isConfirm = false,
  onClose = () => {},
  onCancel = () => {},
}: CustomAlertProps) {
  return (
    <div className="fixed top-0 left-0 z-[9999] flex h-full w-full items-center justify-center bg-black/50">
      <dialog open className="z-50 rounded-xl">
        <div className="flex max-h-[200px] min-h-[121px] w-[300px] flex-col items-center justify-center gap-3 rounded-lg bg-white py-2 transition-all duration-300">
          <div className="flex w-full flex-col items-center gap-2">
            {/* <h2
                            className={`text-2xl font-bold w-full text-center ${
                                title === 'success'
                                    ? 'text-main-color'
                                    : 'text-red-300'
                            }`}
                        >
                            {title}
                        </h2> */}
            <p className="mt-0 w-[80%] break-words text-center font-bold text-grayscale-color-700 text-lg">
              {description}
            </p>
          </div>
          <div className="flex flex-row items-center justify-center gap-4">
            {isConfirm && (
              <button
                type="button"
                // className="bg-gray-200 text-gray-500 px-4 py-2 rounded-md focus-visible:outline-none"
                className="px-4 py-0.5 font-bold text-primary-color-400"
                onClick={onCancel}
              >
                취소
              </button>
            )}
            <button
              type="button"
              className="px-4 py-0.5 font-bold text-primary-color-400"
              onClick={onClose}
            >
              확인
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default CustomAlert;
