import React, { ReactNode } from 'react';
import { Sidebar } from '../navigation/Sidebar';

interface ShellProps {
  children: ReactNode;
}

export const Shell: React.FC<ShellProps> = ({ children }) => {
  return (
    <div className="flex h-screen w-screen bg-neutral-950 text-neutral-100 overflow-hidden font-sans">
      <Sidebar />
      <main className="flex-1 flex flex-col h-full overflow-y-auto bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950">
        {children}
      </main>
    </div>
  );
};
