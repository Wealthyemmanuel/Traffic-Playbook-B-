import React from 'react';

export const OpeningSection: React.FC = () => {
  return (
    <section className="pt-8 sm:pt-14 pb-2 px-4 max-w-3xl mx-auto text-center">
      {/* 1. Main Headline - Centralized */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-neutral-950 tracking-tight leading-[1.2] mb-4 text-center">
        Hey, you've just gotten the{' '}
        <span className="text-red-600 underline decoration-red-400 decoration-wavy decoration-2 underline-offset-4">
          Traffic Playbook…
        </span>
      </h1>

      {/* 2. Sub-Headline - Centralized */}
      <p className="text-base sm:text-lg md:text-xl text-neutral-800 font-medium max-w-2xl mx-auto mb-6 text-center leading-relaxed">
        If you haven't received it yet, <span className="font-bold text-neutral-950">check your email or WhatsApp</span>.
      </p>

      {/* 3. Blockquote - Centralized */}
      <div className="max-w-2xl mx-auto my-6 sm:my-8 px-6 py-4 bg-red-50/70 border-y-2 sm:border-2 border-red-600/30 rounded-xl text-center">
        <p className="text-lg sm:text-xl md:text-2xl font-bold text-neutral-950 italic tracking-tight leading-snug">
          “Before you go through it, I want to show you something important.”
        </p>
      </div>
    </section>
  );
};
