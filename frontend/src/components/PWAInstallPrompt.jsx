import React, { useState, useEffect } from 'react';
import { X, Download, Sparkles } from 'lucide-react';

const PWAInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Check if already installed (standalone mode)
    const isStandaloneMode = window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator.standalone) ||
      document.referrer.includes('android-app://');
    
    setIsStandalone(isStandaloneMode);

    // Check if iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    setIsIOS(iOS);

    // Check if prompt was dismissed (localStorage)
    const promptDismissed = localStorage.getItem('pwa-install-prompt-dismissed');
    const promptDismissedTime = promptDismissed ? parseInt(promptDismissed, 10) : 0;
    const daysSinceDismissed = (Date.now() - promptDismissedTime) / (1000 * 60 * 60 * 24);

    // Don't show if already installed, or if dismissed within last 7 days
    if (isStandaloneMode || (promptDismissed && daysSinceDismissed < 7)) {
      return;
    }

    // Listen for beforeinstallprompt event (Android/Chrome)
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      
      // Show prompt after a short delay for better UX
      setTimeout(() => {
        setShowPrompt(true);
      }, 3000); // Show after 3 seconds
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // For iOS, show instructions after a delay
    if (iOS && !isStandaloneMode) {
      setTimeout(() => {
        setShowPrompt(true);
      }, 3000);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      // Show the install prompt
      deferredPrompt.prompt();
      
      // Wait for the user to respond
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      
      // Clear the deferred prompt
      setDeferredPrompt(null);
      setShowPrompt(false);
      
      // Remember dismissal for 7 days
      localStorage.setItem('pwa-install-prompt-dismissed', Date.now().toString());
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    // Remember dismissal for 7 days
    localStorage.setItem('pwa-install-prompt-dismissed', Date.now().toString());
  };

  if (!showPrompt || isStandalone) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-50 animate-slide-up">
      <div className="relative bg-gradient-to-br from-[#172455] via-[#1e3a8a] to-[#172455] rounded-2xl shadow-2xl border-2 border-yellow-400/30 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400/20 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-yellow-500/10 rounded-full blur-3xl"></div>
        
        {/* Close button */}
        <button
          onClick={handleDismiss}
          className="absolute top-3 right-3 z-10 p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors duration-200"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        <div className="relative p-6">
          {/* Icon and title */}
          <div className="flex items-start gap-4 mb-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center shadow-lg">
              <Download className="w-6 h-6 text-[#172455]" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-black text-white mb-1">Install App</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Install StagePass for the best experience with faster loading and offline access.
              </p>
            </div>
          </div>

          {/* Install button or iOS instructions */}
          {isIOS ? (
            <div className="space-y-3">
              <div className="bg-white/10 rounded-lg p-3 border border-white/20">
                <p className="text-xs text-white font-semibold mb-2 flex items-center gap-2">
                  <Sparkles size={14} className="text-yellow-400" />
                  iOS Installation:
                </p>
                <ol className="text-xs text-gray-300 space-y-1.5 ml-6 list-decimal">
                  <li>Tap the Share button <span className="text-yellow-400">□↑</span></li>
                  <li>Scroll down and tap <span className="text-yellow-400">"Add to Home Screen"</span></li>
                  <li>Tap <span className="text-yellow-400">"Add"</span> to confirm</li>
                </ol>
              </div>
              <button
                onClick={handleDismiss}
                className="w-full py-2.5 px-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-[#172455] font-bold rounded-lg hover:from-yellow-500 hover:to-yellow-700 transition-all duration-200 shadow-lg"
              >
                Got it!
              </button>
            </div>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={handleInstallClick}
                className="flex-1 py-2.5 px-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-[#172455] font-bold rounded-lg hover:from-yellow-500 hover:to-yellow-700 transition-all duration-200 shadow-lg flex items-center justify-center gap-2"
              >
                <Download size={18} />
                Install Now
              </button>
              <button
                onClick={handleDismiss}
                className="px-4 py-2.5 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors duration-200"
              >
                Later
              </button>
            </div>
          )}
        </div>

        {/* Bottom accent bar */}
        <div className="h-1 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400"></div>
      </div>
    </div>
  );
};

export default PWAInstallPrompt;
