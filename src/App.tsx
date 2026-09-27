/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { OpeningSection } from './components/OpeningSection';
import { VideoPlayer } from './components/VideoPlayer';
import { WrittenTransition } from './components/WrittenTransition';
import { BlueprintIntro } from './components/BlueprintIntro';
import { WhatHappensNext } from './components/WhatHappensNext';
import { CallToActionSection } from './components/CallToActionSection';
import { Footer } from './components/Footer';
import { PageConfigModal } from './components/PageConfigModal';
import { PageConfig, DEFAULT_CONFIG, TARGET_AFFILIATE_URL } from './types';

export default function App() {
  const [config, setConfig] = useState<PageConfig>(() => {
    try {
      const stored = localStorage.getItem('bridge_page_config');
      if (stored) {
        const parsed = JSON.parse(stored);
        // Ensure new affiliate URL and default to user's Vimeo video if none provided or old default
        return {
          ...DEFAULT_CONFIG,
          ...parsed,
          destinationUrl: TARGET_AFFILIATE_URL,
          videoUrl: parsed.videoUrl || DEFAULT_CONFIG.videoUrl,
          videoType: parsed.videoType || DEFAULT_CONFIG.videoType,
        };
      }
    } catch (e) {
      console.error('Error reading saved config', e);
    }
    return DEFAULT_CONFIG;
  });

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleSaveConfig = (newConfig: PageConfig) => {
    setConfig(newConfig);
    try {
      localStorage.setItem('bridge_page_config', JSON.stringify(newConfig));
    } catch (e) {
      console.error('Error saving config', e);
    }
  };

  return (
    <div className="min-h-screen bg-white text-neutral-950 font-sans selection:bg-red-600 selection:text-white flex flex-col">
      {/* Main Container - starts directly with the headline */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Step 1: Opening (Centralized Headline, Subheadline, and Emphasized Quote) */}
        <OpeningSection />

        {/* Step 2: Bridge Video with button directly underneath */}
        <VideoPlayer
          videoUrl={config.videoUrl}
          videoType={config.videoType}
          destinationUrl={config.destinationUrl}
          onOpenSettings={() => setIsSettingsOpen(true)}
        />

        {/* Step 3: Written Transition (Centralized Headlines) */}
        <WrittenTransition />

        {/* Step 4: Introduce the Blueprint (Centralized Headlines) */}
        <BlueprintIntro />

        {/* Step 5: Tell Them What Happens When They Click (Centralized Headlines) */}
        <WhatHappensNext />

        {/* Step 6: CTA (Centralized Headlines & button linking directly to Selar) */}
        <CallToActionSection
          destinationUrl={config.destinationUrl}
        />

      </main>

      {/* Static Footer with Contact Support and Legal Disclaimers (No floating elements) */}
      <Footer
        supportEmail={config.supportEmail}
        supportWhatsApp={config.supportWhatsApp}
      />

      {/* Optional Video & Link Configuration Drawer/Modal */}
      <PageConfigModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        config={config}
        onSave={handleSaveConfig}
      />
    </div>
  );
}
