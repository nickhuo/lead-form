'use client';

export default function SuccessMessage() {
  return (
    <div className="p-8 sm:p-12 text-center">
      <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
        <svg
          className="h-8 w-8 text-green-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      <h2 className="mt-8 text-3xl font-bold text-gray-900">Thank You</h2>
      <p className="mt-4 text-lg text-gray-600 max-w-md mx-auto">
        Your information was submitted to our team of immigration attorneys. Expect an email from{' '}
        <span className="font-medium">hello@tryalma.ai</span>
      </p>
      <div className="mt-8">
        <a
          href="/"
          className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors duration-200"
        >
          Go Back to Homepage
        </a>
      </div>
    </div>
  );
}