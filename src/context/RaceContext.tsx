import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useMemo,
} from 'react';

interface RaceContextProps {
  raceStarted: boolean;
  setRaceStarted: React.Dispatch<React.SetStateAction<boolean>>;
  cars: { id: number; time: number }[];
  setCars: React.Dispatch<React.SetStateAction<{ id: number; time: number }[]>>;
}

const RaceContext = createContext<RaceContextProps | null>(null);

export function RaceProvider({ children }: { children: ReactNode }) {
  const [raceStarted, setRaceStarted] = useState(false);
  const [cars, setCars] = useState<{ id: number; time: number }[]>([]);

  const value = useMemo(
    () => ({
      raceStarted,
      setRaceStarted,
      cars,
      setCars,
    }),
    [raceStarted, cars]
  );

  return <RaceContext.Provider value={value}>{children}</RaceContext.Provider>;
}

export const useRace = () => {
  const context = useContext(RaceContext);
  if (!context) {
    throw new Error('useRace must be used within a RaceProvider');
  }
  return context;
};
