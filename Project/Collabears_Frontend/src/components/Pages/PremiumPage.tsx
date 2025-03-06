import React from 'react';
import Navbar from '../Layouts/Navbar';

const PremiumPage = () => {
  const tiers = [
    {
      id: 'basic',
      name: 'Basic',
      priceMonthly: '$19',
      description: 'A simple plan for getting started.',
      features: ['Feature 1', 'Feature 2', 'Feature 3'],
      href: '#',
      featured: false,
    },
    {
      id: 'pro',
      name: 'Pro',
      priceMonthly: '$49',
      description: 'A plan with more features.',
      features: ['Feature A', 'Feature B', 'Feature C'],
      href: '#',
      featured: true,
    },

  ];

  return (
    <>
      <Navbar />
      <div className="relative isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 gap-y-6 sm:mt-20 lg:max-w-4xl lg:grid-cols-2">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={`rounded-3xl p-8 ring-1 ring-gray-900/10 sm:p-10 ${tier.featured ? 'bg-gray-900 text-white shadow-2xl' : 'bg-white/60'}`}
            >
              <h3 id={tier.id} className={`text-base/7 font-semibold ${tier.featured ? 'text-indigo-400' : 'text-indigo-600'}`}>
                {tier.name}
              </h3>
              <p className="mt-4 flex items-baseline gap-x-2">
                <span className={`text-5xl font-semibold tracking-tight ${tier.featured ? 'text-white' : 'text-gray-900'}`}>
                  {tier.priceMonthly}
                </span>
                <span className={`text-base ${tier.featured ? 'text-gray-400' : 'text-gray-500'}`}>/month</span>
              </p>
              <p className={`mt-6 text-base/7 ${tier.featured ? 'text-gray-300' : 'text-gray-600'}`}>{tier.description}</p>
              <ul role="list" className={`mt-8 space-y-3 text-sm/6 sm:mt-10 ${tier.featured ? 'text-gray-300' : 'text-gray-600'}`}>
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    {<i className="fa-solid fa-check"></i>}
                    {feature}
                  </li>
                ))}
              </ul>
              <a
                href={tier.href}
                aria-describedby={tier.id}
                className={`mt-8 block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 sm:mt-10 ${tier.featured ? 'bg-indigo-500 text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-indigo-500' : 'text-indigo-600 ring-1 ring-indigo-200 ring-inset hover:ring-indigo-300 focus-visible:outline-indigo-600'}`}
              >
                Get started today
              </a>
            </div>
          ))}
        </div>    
      </div>
    </>
  );
};

export default PremiumPage;