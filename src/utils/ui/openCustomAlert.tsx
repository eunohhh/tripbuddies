import { AlertProps, ModalContextType } from '@/types/Modal.types';

let modalContext: ModalContextType;

export function setModalContext(context: ModalContextType) {
  modalContext = context;
}

export const showAlert = (
  mode: 'success' | 'caution' | 'error',
  description: string,
  options: AlertProps = {},
): void => {
  if (!modalContext) {
    console.error('Modal context is not set. Ensure ModalProvider is initialized.');
    return;
  }

  modalContext.open({
    mode,
    description,
    options,
  });
};

// import CustomAlert from '@/components/organisms/common/CustomAlert';
// import React from 'react';
// import ReactDOM from 'react-dom/client';

// let alertContainer: HTMLDivElement | null = null;
// let root: ReactDOM.Root | null = null;

// interface AlertProps {
//     onConfirm?: () => void;
//     isConfirm?: boolean;
// }

// export function showAlert(
//     title: 'success' | 'caution' | 'error', // 얼러트 타이틀
//     description: string, // 얼러트 설명
//     options: AlertProps = {}, // 옵션 객체
// ): void {
//     const { onConfirm = null, isConfirm = false } = options;

//     if (!alertContainer) {
//         alertContainer = document.createElement('div');
//         document.body.appendChild(alertContainer);
//         root = ReactDOM.createRoot(alertContainer);
//     }

//     const onClose = () => {
//         if (root && alertContainer) {
//             root.unmount();
//             document.body.removeChild(alertContainer);
//             alertContainer = null;
//             root = null;
//         }
//     };

//     const handleConfirm = () => {
//         onClose();
//         if (onConfirm) onConfirm(); // 확인 버튼을 눌렀을 때 추가 동작 실행
//     };

//     if (root) {
//         root.render(
//             React.createElement(CustomAlert, {
//                 title: title,
//                 description: description,
//                 isConfirm: isConfirm,
//                 onClose: handleConfirm,
//                 onJustClose: onClose,
//             }),
//         );
//     }
// }
