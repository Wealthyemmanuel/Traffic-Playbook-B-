import React, { useState } from 'react';
import { X, Save, RotateCcw, Link2, Video, Mail, MessageCircle, Check } from 'lucide-react';
import { PageConfig, DEFAULT_CONFIG } from '../types';

interface PageConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: PageConfig;
  onSave: (newConfig: PageConfig) => void;
}

export const PageConfigModal: React.FC<PageConfigModalProps> = ({
  isOpen,
  onClose,
  config,
  onSave,
}) => {
  const [formData, setFormData] = useState<PageConfig>(config);
  const [savedNotification, setSavedNotification] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setSavedNotification(true);
    setTimeout(() => {
      setSavedNotification(false);
      onClose();
    }, 800);
  };

  const handleReset = () => {
    setFormData(DEFAULT_CONFIG);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden text-neutral-900 text-left">
        {/* Header */}
        <div className="bg-neutral-950 text-white px-6 py-4 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold">Bridge Page Funnel Settings</h3>
            <p className="text-xs text-neutral-400">
              Customize your bridge video link & sales page destination
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Destination URL */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5 flex items-center gap-1.5">
              <Link2 className="w-4 h-4 text-red-600" />
              <span>CTA Destination (Where the button takes them)</span>
            </label>
            <input
              type="text"
              value={formData.destinationUrl}
              onChange={(e) => setFormData({ ...formData, destinationUrl: e.target.value })}
              placeholder="https://internetwealthtraining.selar.com/page/2k?affiliate=qd6e"
              className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-300 focus:border-red-600 focus:ring-2 focus:ring-red-600/20 text-sm font-mono text-neutral-900 outline-none transition-all"
            />
            <p className="text-[11px] text-neutral-500 mt-1">
              Destination: <code className="bg-neutral-100 px-1 py-0.5 rounded text-red-600 font-bold">https://internetwealthtraining.selar.com/page/2k?affiliate=qd6e</code>
            </p>
          </div>

          {/* Video Type & URL */}
          <div className="space-y-3 pt-2 border-t border-neutral-200">
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 flex items-center gap-1.5">
              <Video className="w-4 h-4 text-red-600" />
              <span>Bridge Video Source</span>
            </label>

            <div className="grid grid-cols-4 gap-2">
              {(['custom_mp4', 'youtube', 'vimeo', 'loom'] as const).map((type) => (
                <button
                  type="button"
                  key={type}
                  onClick={() => setFormData({ ...formData, videoType: type })}
                  className={`py-1.5 px-2 text-xs font-semibold rounded-lg border capitalize transition-colors ${
                    formData.videoType === type
                      ? 'bg-neutral-950 text-white border-neutral-950 shadow-sm'
                      : 'bg-neutral-50 text-neutral-600 border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  {type === 'custom_mp4' ? 'Interactive' : type}
                </button>
              ))}
            </div>

            <input
              type="text"
              value={formData.videoUrl}
              onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
              placeholder={
                formData.videoType === 'youtube'
                  ? 'https://www.youtube.com/watch?v=...'
                  : formData.videoType === 'loom'
                  ? 'https://www.loom.com/share/...'
                  : formData.videoType === 'vimeo'
                  ? 'https://vimeo.com/...'
                  : 'Direct MP4 URL (leave blank for interactive demo)'
              }
              className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-300 focus:border-red-600 focus:ring-2 focus:ring-red-600/20 text-sm font-mono text-neutral-900 outline-none transition-all"
            />
          </div>

          {/* Support Contacts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-neutral-200">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Support Email
              </label>
              <input
                type="email"
                value={formData.supportEmail}
                onChange={(e) => setFormData({ ...formData, supportEmail: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-neutral-300 text-xs text-neutral-900 outline-none focus:border-red-600"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                WhatsApp Link / Number
              </label>
              <input
                type="text"
                value={formData.supportWhatsApp}
                onChange={(e) => setFormData({ ...formData, supportWhatsApp: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-neutral-300 text-xs text-neutral-900 outline-none focus:border-red-600"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
            <button
              type="button"
              onClick={handleReset}
              className="text-xs font-medium text-neutral-500 hover:text-neutral-800 flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-2 rounded-lg border border-neutral-300 text-xs font-semibold text-neutral-700 hover:bg-neutral-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors"
              >
                {savedNotification ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Saved!</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Save Settings</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
