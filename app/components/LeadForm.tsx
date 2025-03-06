'use client';

import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  countryOfCitizenship: string;
  linkedin: string;
  resume: FileList;
  visaInterest: string[];
  message: string;
};

const visaOptions = [
  { id: 'O-1', label: 'O-1' },
  { id: 'EB-1A', label: 'EB-1A' },
  { id: 'EB-2 NIW', label: 'EB-2 NIW' },
  { id: 'not-sure', label: "I don't know" },
];

const countries = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan",
  "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina",
  "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Central African Republic",
  "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti",
  "Dominica", "Dominican Republic", "East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Fiji",
  "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana",
  "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Ivory Coast", "Jamaica", "Japan",
  "Jordan", "Kazakhstan", "Kenya", "Kiribati", "North Korea", "South Korea", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho",
  "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta",
  "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique",
  "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Palau",
  "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis",
  "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia",
  "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Sudan", "Spain",
  "Sri Lanka", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Togo",
  "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom",
  "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
];

interface LeadFormProps {
  onSubmit: (data: FormData) => Promise<void>;
}

const inputStyles = "mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-colors duration-200";
const labelStyles = "block text-sm font-medium text-gray-700 mb-1";
const errorStyles = "mt-1 text-sm text-red-600";

export default function LeadForm({ onSubmit }: LeadFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleCountrySelect = (country: string) => {
    setSearchTerm(country);
    setValue('countryOfCitizenship', country);
    setIsOpen(false);
  };

  const filteredCountries = countries.filter(country =>
    country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    } else if (e.key === 'Enter' && filteredCountries.length > 0) {
      e.preventDefault();
      handleCountrySelect(filteredCountries[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const onSubmitForm = async (data: FormData) => {
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      // Reset form after successful submission
      reset();
      setSearchTerm('');
      setSelectedFile(null);
      
      // Call the parent's onSubmit if provided
      if (onSubmit) {
        await onSubmit(data);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle error (show error message to user)
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="p-8 sm:p-12 space-y-8">
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="w-16 h-16">
          <img src="/first.png" alt="Information" className="w-full h-full object-contain" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Want to understand your visa options?</h3>
          <p className="mt-2 text-sm text-gray-600 max-w-2xl">
            Submit the form below and our team of experienced attorneys will review your information
            and send a preliminary assessment of your case based on your goals.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="firstName" className={labelStyles}>
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            {...register('firstName', { required: 'First name is required' })}
            className={inputStyles}
          />
          {errors.firstName && (
            <p className={errorStyles}>{errors.firstName.message}</p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="lastName" className={labelStyles}>
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            {...register('lastName', { required: 'Last name is required' })}
            className={inputStyles}
          />
          {errors.lastName && (
            <p className={errorStyles}>{errors.lastName.message}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="email" className={labelStyles}>
          Email
        </label>
        <input
          type="email"
          id="email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          })}
          className={inputStyles}
        />
        {errors.email && <p className={errorStyles}>{errors.email.message}</p>}
      </div>

      <div className="relative" ref={dropdownRef}>
        <label htmlFor="countryOfCitizenship" className={labelStyles}>
          Country of Citizenship
        </label>
        <div className="relative">
          <input
            type="text"
            id="countrySearch"
            ref={searchInputRef}
            placeholder="Search countries..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            onKeyDown={handleKeyDown}
            className={inputStyles}
            autoComplete="off"
          />
          <input
            type="hidden"
            {...register('countryOfCitizenship', { required: 'Country of citizenship is required' })}
            value={searchTerm}
          />
          {isOpen && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
              {filteredCountries.length > 0 ? (
                filteredCountries.map((country) => (
                  <button
                    key={country}
                    type="button"
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 focus:bg-gray-100"
                    onClick={() => handleCountrySelect(country)}
                  >
                    {country}
                  </button>
                ))
              ) : (
                <div className="px-4 py-2 text-sm text-gray-500">No countries found</div>
              )}
            </div>
          )}
        </div>
        {errors.countryOfCitizenship && (
          <p className={errorStyles}>{errors.countryOfCitizenship.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="linkedin" className={labelStyles}>
          LinkedIn Profile
        </label>
        <input
          type="url"
          id="linkedin"
          {...register('linkedin', {
            required: 'LinkedIn profile is required',
            pattern: {
              value: /^https:\/\/[a-z]{2,3}\.linkedin\.com\/.*$/i,
              message: 'Please enter a valid LinkedIn URL',
            },
          })}
          className={inputStyles}
          placeholder="https://www.linkedin.com/in/your-profile"
        />
        {errors.linkedin && (
          <p className={errorStyles}>{errors.linkedin.message}</p>
        )}
      </div>

      <div className="flex flex-col items-center text-center">
        <label htmlFor="resume" className={`${labelStyles} text-center mb-4`}>
          <strong className="text-xl font-bold text-gray-900 leading-tight">Resume / CV</strong>
        </label>
        <div
          className={`w-full mt-2 flex justify-center px-6 pt-5 pb-6 border-2 ${
            isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
          } border-dashed rounded-lg transition-colors duration-200`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="space-y-2 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="flex text-sm text-gray-600 justify-center">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500 transition-colors duration-200"
              >
                <span>Upload a file</span>
                <input
                  id="file-upload"
                  type="file"
                  className="sr-only"
                  {...register('resume', { required: 'Resume is required' })}
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx"
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">PDF, DOC up to 10MB</p>
            {selectedFile && (
              <p className="text-sm text-gray-600">Selected file: {selectedFile.name}</p>
            )}
          </div>
        </div>
        {errors.resume && <p className={errorStyles}>{errors.resume.message}</p>}
      </div>

      <div className="flex flex-col items-center text-center">
        <div className="w-16 h-16 mb-4">
          <img src="/tou.png" alt="Visa Categories" className="w-full h-full object-contain" />
        </div>
        <label className={`${labelStyles} text-center mb-4`}>
          <strong className="text-xl font-bold text-gray-900 leading-tight">Visa categories of interest?</strong>
        </label>
        <div className="w-full mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {visaOptions.map((option) => (
            <div key={option.id} className="relative flex items-center">
              <input
                type="checkbox"
                id={option.id}
                value={option.id}
                {...register('visaInterest', { required: 'Please select at least one visa category' })}
                className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-colors duration-200"
              />
              <label htmlFor={option.id} className="ml-3 text-sm text-gray-700">
                {option.label}
              </label>
            </div>
          ))}
        </div>
        {errors.visaInterest && (
          <p className={errorStyles}>{errors.visaInterest.message}</p>
        )}
      </div>

      <div className="flex flex-col items-center text-center">
        <div className="w-16 h-16 mb-4">
          <img src="/heart.png" alt="Help" className="w-full h-full object-contain" />
        </div>
        <label htmlFor="message" className={`${labelStyles} text-center mb-4`}>
          <strong className="text-xl font-bold text-gray-900 leading-tight">How can we help you?</strong>
        </label>
        <textarea
          id="message"
          rows={4}
          {...register('message', { required: 'Please provide some details about your case' })}
          className={`${inputStyles} resize-none w-full`}
          placeholder="What is your current status and when does it expire? What is your past immigration history? Are youlooking for long-term permanent residency or short-term employment visa or both? Are there any timeline considerations?"
        />
        {errors.message && (
          <p className={errorStyles}>{errors.message.message}</p>
        )}
      </div>

      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors duration-200"
        >
          Submit Application
        </button>
      </div>
    </form>
  );
} 