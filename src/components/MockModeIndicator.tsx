import React from 'react';

interface MockModeIndicatorProps {
  isMockMode: boolean;
}

const MockModeIndicator: React.FC<MockModeIndicatorProps> = ({ isMockMode }) => {
  if (!isMockMode) return null;

  return (
    <div className="fixed top-0 left-0 w-full bg-yellow-500 text-black text-center py-1 z-50">
      Mock Mode Active
    </div>
  );
};

export default MockModeIndicator;