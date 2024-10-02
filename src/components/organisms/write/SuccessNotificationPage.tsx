import React from 'react';
import CompletePage from './CompletePage';
import FailPage from './FailPage';
import PendingPage from './PendingPage';

interface SuccessNotificationProps {
  isSuccess: boolean | null;
  isFile: boolean;
}

const SuccessNotificationPage: React.FC<SuccessNotificationProps> = ({ isSuccess, isFile }) => {
  return (
    <div className="text-center relative h-full">
      {isSuccess === null ? (
        <PendingPage isFile={isFile} />
      ) : isSuccess ? (
        <CompletePage />
      ) : (
        <FailPage />
      )}
    </div>
  );
};

export default SuccessNotificationPage;
