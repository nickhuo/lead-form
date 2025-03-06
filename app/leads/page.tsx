'use client';

import LeadsList from '../components/LeadsList';
import Navigation from '../components/Navigation';

export default function LeadsPage() {
  return (
    <div>
      <Navigation />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <LeadsList />
      </main>
    </div>
  );
} 