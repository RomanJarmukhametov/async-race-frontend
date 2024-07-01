'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import Toast from '@/components/custom/Toast';
import { stopEngine } from '@/lib/api/engine';

// This component is used to reset the race by stopping all the engines and resetting the local storage
function ResetRace() {
  const [toastMessage, setToastMessage] = useState('');

  // Reset the race by stopping all the engines and resetting the local storage
  const handleResetRace = () => {
    for (let i = 0; i < localStorage.length; i += 1) {
      const key = localStorage.key(i);
      if (key && key.endsWith('-engineStatus')) {
        const id = parseInt(key.split('-')[0], 10); // Convert id to number
        const engineStatus = localStorage.getItem(key) === 'true';
        if (engineStatus) {
          stopEngine(id);
          localStorage.setItem(`${id}-engineStatus`, 'false');
          localStorage.setItem(`${id}-engineVelocity`, '0');
          localStorage.setItem(`${id}-driveMode`, 'false');
          localStorage.setItem(`${id}-timeInSeconds`, '0');
        }
      }
    }
    setToastMessage('Race reset successfully');

    // Trigger a page refresh after resetting
    window.location.reload();
  };

  return (
    <>
      <Button
        variant="outline"
        onClick={handleResetRace}
      >
        Reset Race
      </Button>
      {toastMessage && (
        <Toast
          message={toastMessage}
          onClose={() => setToastMessage('')}
        />
      )}
    </>
  );
}

export default ResetRace;
