import React from 'react';
import { CheckCircle2, BookOpen, Compass, Layers, Gift, Tag, PlaySquare } from 'lucide-react';

export const WhatHappensNext: React.FC = () => {
  const items = [
    {
      title: "What's inside the Blueprint",
      subtitle: "The full breakdown of all frameworks and systems",
      icon: BookOpen,
    },
    {
      title: "How it works",
      subtitle: "The practical daily workflow from zero to results",
      icon: Compass,
    },
    {
      title: "The training and resources",
      subtitle: "Templates, swipe copy, message scripts, and checklists",
      icon: Layers,
    },
    {
      title: "The bonuses",
      subtitle: "Exclusive bonuses included with the complete package",
      icon: Gift,
    },
    {
      title: "The price",
      subtitle: "Transparent access fee and instant entry details",
      icon: Tag,
    },
    {
      title: "How to get started",
      subtitle: "Immediate digital access and onboarding instructions",
      icon: PlaySquare,
    },
  ];

  return (
    <section className="py-10 sm:py-14 px-4 max-w-3xl mx-auto border-t border-neutral-200 text-center">
      {/* Centralized Main Headline */}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-neutral-950 tracking-tight mb-3 text-center">
        Here's What You'll See Next
      </h2>

      {/* Centralized Context */}
      <p className="text-base sm:text-lg text-neutral-700 leading-relaxed mb-4 max-w-2xl mx-auto text-center">
        When you click the button below, you'll be taken to the full written page there .
      </p>

      <p className="text-sm sm:text-base font-bold text-neutral-900 mb-6 text-center">
        You'll be able to see:
      </p>

      {/* Structured 6 Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto text-left mb-4">
        {items.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-neutral-200 hover:border-red-400 hover:shadow-sm transition-all"
            >
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-red-600 text-white shrink-0 mt-0.5 shadow-sm">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm sm:text-base font-bold text-neutral-950">
                  {item.title}
                </p>
                <p className="text-xs text-neutral-500 mt-0.5">
                  {item.subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
