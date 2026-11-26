import React, { useEffect } from 'react';
import { Shell } from '../components/layout/Shell';
import { useGameStore } from '../stores/useGameStore';
import { HomePage } from '../pages/Home/HomePage';
import { LibraryPage } from '../pages/Library/LibraryPage';
import { CompatibilityPage } from '../pages/Compatibility/CompatibilityPage';
import { PerformancePage } from '../pages/Performance/PerformancePage';
import { SettingsPage } from '../pages/Settings/SettingsPage';

export const App: React.FC = () => {
  const { activeTab, loadGames } = useGameStore();

  useEffect(() => {
    loadGames();
  }, [loadGames]);

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage />;
      case 'library':
        return <LibraryPage />;
      case 'compatibility':
        return <CompatibilityPage />;
      case 'performance':
        return <PerformancePage />;
      case 'settings':
      case 'routing':
        return <SettingsPage />;
      default:
        return <LibraryPage />;
    }
  };

  return <Shell>{renderActiveTab()}</Shell>;
};
export default App;
