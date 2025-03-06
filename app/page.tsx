'use client';

import { useState } from 'react';
import LeadForm from './components/LeadForm';
import SuccessMessage from './components/SuccessMessage';

export default function Home() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFormSubmit = async (formData: FormData) => {
    // TODO: Implement actual API call
    setIsSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all">
          {!isSubmitted ? (
            <>
              <div className="bg-gradient-to-r from-[#e8ecd7] to-[#f0f2e3] p-8 sm:p-12">
                <img src="/logo.svg" alt="Alma" className="h-10 mb-8" />
                <h1 className="text-4xl font-bold text-gray-900 leading-tight">
                  Get An Assessment
                  <br />
                  <span className="text-gray-800">Of Your Immigration Case</span>
                </h1>
              </div>
              <LeadForm onSubmit={handleFormSubmit} />
            </>
          ) : (
            <SuccessMessage />
          )}
        </div>
      </div>
    </main>
  );
} 