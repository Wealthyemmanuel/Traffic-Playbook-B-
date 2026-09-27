import React, { useState } from 'react';
import { Mail, MessageCircle, HelpCircle } from 'lucide-react';

interface FooterProps {
  supportEmail: string;
  supportWhatsApp: string;
}

export const Footer: React.FC<FooterProps> = ({ supportEmail, supportWhatsApp }) => {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  return (
    <footer className="bg-neutral-950 text-neutral-400 text-xs py-10 px-4 border-t border-neutral-900 mt-12 text-center">
      <div className="max-w-3xl mx-auto space-y-6">
        
        {/* Contact Support Section as requested */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 py-3 text-neutral-300">
          <span className="font-semibold text-white">Need assistance?</span>
          <div className="flex items-center gap-3">
            <a
              href={`mailto:${supportEmail}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white transition-colors border border-neutral-800"
              title={`Email: ${supportEmail}`}
            >
              <Mail className="w-3.5 h-3.5 text-red-500" />
              <span>Contact Support ({supportEmail})</span>
            </a>
            {supportWhatsApp && (
              <a
                href={supportWhatsApp.startsWith('http') ? supportWhatsApp : `https://wa.me/${supportWhatsApp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white transition-colors border border-neutral-800"
                title="Chat on WhatsApp"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-500" />
                <span>WhatsApp (+234 703 357 0538)</span>
              </a>
            )}
          </div>
        </div>

        {/* Legal Disclaimers */}
        <div className="space-y-2 text-[11px] leading-relaxed text-neutral-500 max-w-2xl mx-auto">
          <p>
            <strong>Earnings & Results Disclaimer:</strong> The results mentioned in the Traffic Playbook and the 0–$2K Affiliate Marketing Blueprint are not typical. Affiliate marketing requires effort, commitment, and adherence to platform rules.
          </p>
          <p>
            This site is not affiliated with or endorsed by WhatsApp LLC, Meta Platforms, Inc., TikTok, YouTube, or Google.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-3 border-t border-neutral-900 text-[11px] text-neutral-400">
          <span>© {new Date().getFullYear()} Traffic Playbook Bridge. All rights reserved.</span>
          <span>·</span>
          <button
            type="button"
            onClick={() => setActiveModal('privacy')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Privacy Policy
          </button>
          <span>·</span>
          <button
            type="button"
            onClick={() => setActiveModal('terms')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Terms of Use
          </button>
          <span>·</span>
          <button
            type="button"
            onClick={() => setActiveModal('affiliate')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Affiliate Disclosure
          </button>
        </div>
      </div>

      {/* Policy Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-white text-neutral-900 max-w-lg w-full p-6 rounded-2xl shadow-2xl relative text-left">
            <h4 className="text-lg font-bold mb-3 uppercase tracking-tight text-neutral-950">
              {activeModal === 'privacy' && 'Privacy Policy'}
              {activeModal === 'terms' && 'Terms of Use'}
              {activeModal === 'affiliate' && 'Affiliate Disclosure'}
            </h4>
            <div className="text-xs text-neutral-700 space-y-3 leading-relaxed max-h-60 overflow-y-auto pr-2">
              {activeModal === 'privacy' && (
                <p>
                  We value your privacy. We collect only your contact information (such as email or WhatsApp) to deliver your requested materials. We never sell, rent, or trade your personal information.
                </p>
              )}
              {activeModal === 'terms' && (
                <p>
                  By accessing the Traffic Playbook and this presentation, you agree to use the provided training materials for lawful personal educational purposes only. Unauthorized reproduction is prohibited.
                </p>
              )}
              {activeModal === 'affiliate' && (
                <p>
                  Transparency note: If you choose to invest in the recommended 0–$2K Blueprint, we may earn an affiliate commission at zero additional cost to you.
                </p>
              )}
            </div>
            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 bg-neutral-900 text-white rounded-lg text-xs font-bold hover:bg-neutral-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
