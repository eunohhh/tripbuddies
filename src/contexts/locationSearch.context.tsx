'use client';

import { createContext, ReactNode, useContext, useState } from 'react';

type LocationContextType = {
  location: string | null;
  setLocation: React.Dispatch<React.SetStateAction<string | null>>;
};

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [location, setLocation] = useState<string | null>(null);

  return (
    <LocationContext.Provider value={{ location, setLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('Error');
  }
  return context;
};
