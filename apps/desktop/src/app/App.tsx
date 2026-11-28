import { AnimatePresence } from 'motion/react';
import { MotionProvider } from './providers/MotionProvider';
import { AppShell } from '../components/layout/AppShell';
import { PageTransition } from '../components/effects/PageTransition';
import { useNavigationStore } from '../store/useNavigationStore';
import { HomePage } from '../pages/Home';
import { MyGamesPage } from '../pages/MyGames';
import { DiscoverPage } from '../pages/Discover';
import { SocialPage } from '../pages/Social';
import { AudioStudioPage } from '../pages/AudioStudio';
import { CapturePage } from '../pages/Capture';
import { PerformancePage } from '../pages/Performance';
import { DownloadsPage } from '../pages/Downloads';
import { SettingsPage } from '../pages/Settings';
import type { PageId } from './router';

function renderPage(page: PageId, navigate: (page: PageId) => void) {
  switch (page) {
    case 'home':
      return <HomePage onNavigate={navigate} />;
    case 'games':
      return <MyGamesPage />;
    case 'discover':
      return <DiscoverPage />;
    case 'social':
      return <SocialPage />;
    case 'audio':
      return <AudioStudioPage />;
    case 'capture':
      return <CapturePage />;
    case 'performance':
      return <PerformancePage />;
    case 'downloads':
      return <DownloadsPage />;
    case 'settings':
      return <SettingsPage />;
  }
}

export default function App() {
  const { page, navigate } = useNavigationStore();

  return (
    <MotionProvider>
      <AppShell page={page} onNavigate={navigate}>
        <AnimatePresence mode="wait" initial={false}>
          <PageTransition pageKey={page}>{renderPage(page, navigate)}</PageTransition>
        </AnimatePresence>
      </AppShell>
    </MotionProvider>
  );
}
