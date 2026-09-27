import React from 'react';
import { Target, Users, MessageSquare, ShoppingBag, Brain, ShieldCheck } from 'lucide-react';

export const BlueprintIntro: React.FC = () => {
  const blueprintPillars = [
    {
      icon: Target,
      title: "Free Traffic & Content Marketing",
      desc: "How to attract qualified organic buyers without spending a dime on paid ads.",
    },
    {
      icon: Users,
      title: "Audience Building",
      desc: "Cultivating an attentive community that actually values your recommendations.",
    },
    {
      icon: MessageSquare,
      title: "WhatsApp Marketing",
      desc: "Moving interested prospects from public feeds into high-converting private chats.",
    },
    {
      icon: ShoppingBag,
      title: "Product Selection",
      desc: "Choosing high-converting affiliate offers with strong commissions and real market demand.",
    },
    {
      icon: Brain,
      title: "Selling Psychology",
      desc: "Conversational frameworks and ethical persuasion principles that convert naturally.",
    },
    {
      icon: ShieldCheck,
      title: "Building Deep Trust",
      desc: "Establishing immediate credibility even if you are beginning completely from scratch.",
    },
  ];

  return (
    <section className="py-10 sm:py-14 px-4 max-w-3xl mx-auto border-t border-neutral-200 text-center">
      {/* Centralized Main Headline */}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-neutral-950 tracking-tight leading-snug mb-6 text-center max-w-2xl mx-auto">
        That’s Where The <span className="text-red-600">0–$2K Affiliate Marketing Blueprint</span> Comes In
      </h2>

      {/* Copy block */}
      <div className="space-y-4 text-base sm:text-lg text-neutral-700 leading-relaxed max-w-2xl mx-auto text-center mb-8">
        <p>
          The <strong className="text-neutral-950 font-bold">Traffic Playbook</strong> gives you one important piece.
        </p>

        <p>
          The <strong className="text-neutral-950 font-bold">0–$2K Affiliate Marketing Blueprint</strong> takes you further by bringing together the different areas you need to understand—from free traffic and content marketing to audience building, WhatsApp marketing, product selection, selling psychology and trust.
        </p>
      </div>

      {/* 6 Blueprint Areas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-w-2xl mx-auto text-left mb-6">
        {blueprintPillars.map((pillar, idx) => {
          const Icon = pillar.icon;
          return (
            <div
              key={idx}
              className="p-4 rounded-xl bg-white border border-neutral-200 hover:border-red-400 hover:shadow-sm transition-all group"
            >
              <div className="flex items-center gap-2.5 mb-2">
                <div className="p-2 rounded-lg bg-red-50 text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-neutral-900 group-hover:text-red-700 transition-colors">
                  {pillar.title}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-neutral-600 leading-normal pl-0.5">
                {pillar.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
