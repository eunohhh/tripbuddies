'use client';

import CustomAlert from '@/components/organisms/common/CustomAlert';
import { useLockBodyScroll } from '@/hooks';
import { AlertModalOptions, ModalContextType, ModalOptions } from '@/types/Modal.types';
import React, { createContext, useCallback, useContext, useState } from 'react';

const initialValue: ModalContextType = {
  open: () => {},
  close: () => {},
  openModal: () => {},
  closeModal: () => {},
};

export const ModalContext = createContext<ModalContextType>(initialValue);

export const useModal = () => useContext(ModalContext);

export const ModalProviderDefault: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [alertModalOptions, setAlertModalOptions] = useState<AlertModalOptions | null>(null);
  const [modalOptions, setModalOptions] = useState<ModalOptions | null>(null);

  const { setLock } = useLockBodyScroll();

  const open = useCallback(
    (options: AlertModalOptions) => {
      setAlertModalOptions(options);
      setLock(true);
    },
    [setLock],
  );

  const openModal = useCallback(
    (options: ModalOptions) => {
      setModalOptions(options);
      setLock(true);
    },
    [setLock],
  );

  const close = useCallback(() => {
    if (alertModalOptions?.options.onConfirm) alertModalOptions.options.onConfirm();
    setLock(false);
    setAlertModalOptions(null);
  }, [alertModalOptions, setLock]);

  const closeModal = useCallback(() => {
    setModalOptions(null);
    setLock(false);
  }, [setLock]);

  const onCancel = useCallback(() => {
    if (alertModalOptions?.options.onCancel) alertModalOptions.options.onCancel();
    setLock(false);
    setAlertModalOptions(null);
  }, [alertModalOptions, setLock]);

  // useEffect(() => {
  //     setLock(true);
  // }, [setLock]);

  return (
    <ModalContext.Provider value={{ open, close, openModal, closeModal }}>
      {children}
      {alertModalOptions && (
        <CustomAlert
          mode={alertModalOptions.mode}
          description={alertModalOptions.description}
          isConfirm={alertModalOptions.options.isConfirm}
          onCancel={onCancel}
          onClose={close}
        />
      )}
      {modalOptions && modalOptions.component()}
    </ModalContext.Provider>
  );
};
