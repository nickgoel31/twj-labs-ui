import React from 'react';
import { Check, X, ArrowRight, Zap } from 'lucide-react';

const plans = [
  {
    name: "Starter",
    price: "Free",
    description: "Perfect for personal projects and learning.",
    features: [
      "All Open Source Components",
      "10+ Pre-built Sections",
      "MIT License",
      "Community Support",
      "Basic Documentation"
    ],
    notIncluded: ["Figma Design Files", "Priority Support", "Custom Development"],
    cta: "Start Building",
    featured: false
  },
  {
    name: "Pro Bundle",
    price: "$99",
    period: "/one-time",
    description: "For professional developers shipping production apps.",
    features: [
      "Everything in Starter",
      "Full Figma Design System",
      "Advanced Layout Templates",
      "Lifetime Updates",
      "Priority Email Support"
    ],
    notIncluded: ["Custom Development"],
    cta: "Get Pro Access",
    featured: true
  },
  {
    name: "The Walking Jumbo",
    price: "Custom",
    description: "We design and build your entire custom website.",
    features: [
      "Full Custom Design & Dev",
      "Strategy & SEO Optimization",
      "Performance Guarantee",
      "Dedicated Project Manager",
      "Ongoing Maintenance"
    ],
    notIncluded: [],
    cta: "Book a Call",
    featured: false,
    isAgency: true
  }
];

export default function PricingSection() {
  return (
    <section className="py-24 bg-neutral-950 text-white relative" id="pricing">
      <div className="container px-4 md:px-6 mx-auto relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Simple pricing, <span className="text-indigo-400">powerful results.</span>
          </h2>
          <p className="text-neutral-400 text-lg">
            Start for free, upgrade for tools, or hire us to build it for you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`
                relative flex flex-col p-8 rounded-2xl border transition-all duration-300
                ${plan.featured 
                  ? 'bg-neutral-900/80 border-indigo-500/50 shadow-2xl shadow-indigo-500/10 scale-105 z-10' 
                  : plan.isAgency 
                    ? 'bg-gradient-to-b from-neutral-900 to-neutral-950 border-neutral-800 hover:border-neutral-600'
                    : 'bg-neutral-900/40 border-neutral-800 hover:border-neutral-700'
                }
              `}
            >
              {plan.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-indigo-600 text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg">
                  Most Popular
                </div>
              )}

              {plan.isAgency && (
                 <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg flex items-center gap-1">
                   <Zap className="w-3 h-3 fill-current" /> Agency Mode
                 </div>
              )}

              <div className="mb-8">
                <h3 className={`text-xl font-bold mb-2 ${plan.isAgency ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400' : 'text-white'}`}>
                    {plan.name}
                </h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.period && <span className="text-neutral-500 text-sm">{plan.period}</span>}
                </div>
                <p className="text-neutral-400 text-sm h-10">{plan.description}</p>
              </div>

              <div className="flex-1 space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm">
                    <div className={`mt-0.5 rounded-full p-0.5 ${plan.isAgency ? 'bg-purple-500/20 text-purple-400' : 'bg-indigo-500/20 text-indigo-400'}`}>
                        <Check className="w-3 h-3" />
                    </div>
                    <span className="text-neutral-300">{feature}</span>
                  </div>
                ))}
                {plan.notIncluded.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm text-neutral-600">
                    <X className="w-4 h-4 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <button 
                className={`
                  w-full py-3.5 px-4 rounded-lg font-semibold text-sm transition-all flex items-center justify-center gap-2
                  ${plan.featured 
                    ? 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-500/20' 
                    : plan.isAgency
                        ? 'bg-white text-black hover:bg-neutral-200'
                        : 'bg-neutral-800 text-white hover:bg-neutral-700'
                  }
                `}
              >
                {plan.cta}
                {plan.isAgency && <ArrowRight className="w-4 h-4" />}
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}