import React from 'react';

export const WrittenTransition: React.FC = () => {
  const diagnosticQuestions = [
    {
      q: "How do you build trust?",
      desc: "Cold strangers won't buy simply because they clicked a link. You need credibility triggers.",
    },
    {
      q: "How do you communicate with potential buyers?",
      desc: "Conversations convert far better than hard-selling. You need clear, high-converting scripts.",
    },
    {
      q: "How do you position your offer?",
      desc: "Framing your product as the singular, obvious solution to their exact pain point.",
    },
    {
      q: "How do you sell?",
      desc: "Without being pushy, sleazy, or awkward—using direct-response psychology that feels natural.",
    },
    {
      q: "And how do you bring everything together into a process you can actually follow?",
      desc: "Connecting daily traffic activities to real sales commissions without confusion.",
    },
  ];

  return (
    <section className="py-10 sm:py-14 px-4 max-w-3xl mx-auto border-t border-neutral-200 text-center">
      {/* Centralized Main Headline */}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-neutral-950 tracking-tight mb-3 text-center">
        You’ve Now Gotten The Traffic…
      </h2>

      {/* Centralized Subhead */}
      <p className="text-lg sm:text-xl md:text-2xl font-bold text-red-600 mb-6 text-center max-w-2xl mx-auto">
        But getting people to see your offer is only the beginning.
      </p>

      {/* Body Copy */}
      <div className="space-y-4 text-base sm:text-lg text-neutral-700 leading-relaxed max-w-2xl mx-auto text-center mb-8">
        <p>
          You now have the <strong className="text-neutral-950 font-bold">Traffic Playbook</strong> and understand how to start attracting potential buyers.
        </p>

        <p>
          But traffic is only <span className="font-semibold text-neutral-950 underline decoration-red-400 underline-offset-2">one part</span> of the affiliate marketing process.
        </p>

        <p className="font-semibold text-neutral-950 pt-2">
          You still need to know what to do after you get their attention:
        </p>
      </div>

      {/* The 5 Questions */}
      <div className="my-6 space-y-3.5 max-w-2xl mx-auto text-left">
        {diagnosticQuestions.map((item, index) => (
          <div
            key={index}
            className="flex items-start gap-3.5 p-4 rounded-xl bg-white border border-neutral-200 hover:border-red-300 hover:shadow-sm transition-all group"
          >
            <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-red-50 text-red-600 border border-red-200 shrink-0 mt-0.5 group-hover:bg-red-600 group-hover:text-white transition-colors">
              <span className="font-mono text-xs font-bold">0{index + 1}</span>
            </div>
            <div className="flex-1">
              <h3 className="text-base sm:text-lg font-bold text-neutral-950 leading-snug group-hover:text-red-700 transition-colors">
                {item.q}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 mt-1">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
