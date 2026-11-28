import { AnimatePresence, motion } from 'motion/react';
import { ArrowDownToLine, RefreshCw, X } from 'lucide-react';
import { Button } from './Button';
import { useUpdaterStore } from '../../store/useUpdaterStore';

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function UpdatePrompt() {
  const {
    status,
    pendingUpdate,
    error,
    downloadedBytes,
    contentLength,
    promptDismissed,
    installUpdate,
    remindMeLater,
  } = useUpdaterStore();

  const isBusy = status === 'downloading' || status === 'installing';
  const visible = Boolean(pendingUpdate) && !promptDismissed;
  const progress = contentLength
    ? Math.min(100, Math.round((downloadedBytes / contentLength) * 100))
    : null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-[#050706]/80 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="presentation"
          onKeyDown={(event) => {
            if (event.key === 'Escape' && !isBusy) remindMeLater();
          }}
        >
          <motion.section
            role="dialog"
            aria-modal="true"
            aria-labelledby="gcc-update-title"
            className="relative w-full max-w-lg rounded-2xl border border-[#20A66A]/35 bg-[#101613] p-5 shadow-2xl sm:p-7"
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
          >
            {!isBusy && (
              <button
                type="button"
                className="absolute right-4 top-4 rounded-lg p-2 text-[#9AA59E] hover:bg-white/5 hover:text-white"
                onClick={remindMeLater}
                aria-label="Remind me later"
              >
                <X size={17} />
              </button>
            )}

            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-[#20A66A]/30 bg-[#20A66A]/10 text-[#25C47A]">
              {isBusy ? <RefreshCw size={21} className="animate-spin" /> : <ArrowDownToLine size={21} />}
            </div>
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#25C47A]">
              Gaming Control Center
            </p>
            <h2 id="gcc-update-title" className="mt-1 text-xl font-semibold text-[#EEF2EF]">
              {status === 'installing'
                ? 'Restarting GCC to finish'
                : status === 'downloading'
                  ? 'Downloading update'
                  : `GCC ${pendingUpdate?.version} is ready`}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[#A8B1AA]">
              {status === 'installing'
                ? 'The signed update has been installed. GCC is relaunching.'
                : status === 'downloading'
                  ? 'The update will install after your approval. GCC will close and restart to finish.'
                  : `You are using ${pendingUpdate?.currentVersion}. Review the release notes, then choose when to install.`}
            </p>

            {pendingUpdate?.body && (
              <div className="mt-5 max-h-36 overflow-y-auto rounded-xl border border-[#26332B] bg-black/20 p-4 text-xs leading-relaxed text-[#A8B1AA]">
                <div className="mb-2 font-medium text-[#EEF2EF]">What’s new</div>
                <p className="whitespace-pre-wrap">{pendingUpdate.body}</p>
              </div>
            )}

            {status === 'downloading' && (
              <div className="mt-5">
                <div className="mb-2 flex justify-between font-mono text-[10px] text-[#A8B1AA]">
                  <span>{progress === null ? 'Downloading…' : `${progress}%`}</span>
                  <span>
                    {formatBytes(downloadedBytes)}
                    {contentLength ? ` / ${formatBytes(contentLength)}` : ''}
                  </span>
                </div>
                <progress
                  aria-label="Update download progress"
                  max={contentLength ?? Math.max(downloadedBytes, 1)}
                  value={downloadedBytes}
                  className="h-1.5 w-full accent-[#25C47A]"
                />
              </div>
            )}

            {error && status === 'error' && (
              <p role="alert" className="mt-4 rounded-lg border border-[#DC2638]/30 bg-[#941C2C]/10 p-3 text-xs text-[#F0A0A8]">
                {error}
              </p>
            )}

            <div className="mt-6 flex flex-wrap justify-end gap-2.5">
              {!isBusy && (
                <Button variant="outline" size="sm" onClick={remindMeLater}>
                  Remind me later
                </Button>
              )}
              {status !== 'installing' && (
                <Button
                  variant="forest"
                  size="sm"
                  disabled={isBusy}
                  icon={<ArrowDownToLine size={14} />}
                  onClick={() => void installUpdate()}
                >
                  {status === 'error' ? 'Retry update' : 'Install and restart GCC'}
                </Button>
              )}
            </div>
            <p className="mt-4 text-center text-[10px] text-[#6F7A72]">
              GCC only installs an update after you approve it. The update will not relaunch a game.
            </p>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
