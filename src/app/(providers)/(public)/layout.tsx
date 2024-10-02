import React from 'react';

type PublicLayoutProps = {
  children: React.ReactNode;
};

const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
  return <>{children}</>;
};

export default PublicLayout;
