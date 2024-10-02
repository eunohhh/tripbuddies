export type AlertProps = {
  onConfirm?: () => void;
  isConfirm?: boolean;
  onCancel?: () => void;
};

export type AlertModalOptions = {
  mode: 'success' | 'caution' | 'error'; // 얼러트 모드
  description: string; // 얼러트 설명
  options: AlertProps; // 옵션 객체
};

export type ModalContextType = {
  open: (options: AlertModalOptions) => void;
  close: () => void;
  openModal: (options: ModalOptions) => void;
  closeModal: () => void;
};

export type ModalOptions = {
  component: () => React.JSX.Element;
  // options: ReturnType<typeof SelectRegions>;
};
