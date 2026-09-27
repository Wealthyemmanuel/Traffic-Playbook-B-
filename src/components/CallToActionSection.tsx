import React from 'react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { TARGET_AFFILIATE_URL } from '../types';

interface CallToActionSectionProps {
  destinationUrl?: string;
}

export const CallToActionSection: React.FC<CallToActionSectionProps> = ({
  destinationUrl = TARGET_AFFILIATE_URL,
}) => {
  return (
    <section className="py-12 sm:py-16 px-4 max-w-3xl mx-auto border-t-2 border-red-600/30 text-center rounded-2xl my-8">
      {/* Centralized Main Headline */}
      <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-neutral-950 tracking-tight mb-6 text-center">
        Ready to see the complete system?
      </h3>

      {/* Primary Action Button linking to Selar affiliate link */}
      <div className="max-w-md mx-auto mb-4">
        <a
          href={destinationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative w-full flex items-center justify-center gap-2.5 px-6 py-4 sm:py-5 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-extrabold text-lg sm:text-xl rounded-xl shadow-xl shadow-red-600/30 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
        >
          <span className="tracking-wide uppercase">
            SEE THE 0–$2K BLUEPRINT
          </span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>

      {/* Small Text */}
      <p className="text-xs sm:text-sm text-neutral-600 italic text-center">
        Click below to see the full details.
      </p>
    </section>
  );
};
