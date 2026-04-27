import React, { useState } from 'react';

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 100 }, (_, i) => currentYear - 13 - i);

export default function Screen1({ data, onUpdate, onNext }) {
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    onUpdate({ [field]: value });
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!data.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!data.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!data.displayName.trim()) newErrors.displayName = 'Display name is required';
    if (!data.yearOfBirth) newErrors.yearOfBirth = 'Year of birth is required';
    if (!data.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^\+?[\d\s\-()]{7,15}$/.test(data.phone.trim()))
      newErrors.phone = 'Enter a valid phone number';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) onNext();
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-6 pt-4 pb-2">
        <h2 className="text-2xl font-bold text-gray-900 mt-2">Create Account</h2>
        <p className="text-sm text-gray-500 mt-1">Let's get started! Tell us about yourself.</p>
      </div>

      {/* Form */}
      <div className="flex-1 px-6 pb-6 space-y-4 overflow-y-auto">
        {/* Name row */}
        <div className="flex gap-3">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={data.firstName}
              onChange={e => handleChange('firstName', e.target.value)}
              placeholder="Jane"
              className={`w-full px-4 py-3 rounded-xl border text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all ${
                errors.firstName ? 'border-red-400 bg-red-50' : 'border-gray-200'
              }`}
            />
            {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={data.lastName}
              onChange={e => handleChange('lastName', e.target.value)}
              placeholder="Smith"
              className={`w-full px-4 py-3 rounded-xl border text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all ${
                errors.lastName ? 'border-red-400 bg-red-50' : 'border-gray-200'
              }`}
            />
            {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
          </div>
        </div>

        {/* Display name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Display Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={data.displayName}
            onChange={e => handleChange('displayName', e.target.value)}
            placeholder="@janesmith"
            className={`w-full px-4 py-3 rounded-xl border text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all ${
              errors.displayName ? 'border-red-400 bg-red-50' : 'border-gray-200'
            }`}
          />
          <p className="text-xs text-gray-400 mt-1">This is how others will see you in activities</p>
          {errors.displayName && <p className="text-red-500 text-xs mt-1">{errors.displayName}</p>}
        </div>

        {/* Year of birth */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Year of Birth <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              value={data.yearOfBirth}
              onChange={e => handleChange('yearOfBirth', e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all appearance-none ${
                errors.yearOfBirth ? 'border-red-400 bg-red-50' : 'border-gray-200'
              }`}
            >
              <option value="">Select year...</option>
              {years.map(y => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          {errors.yearOfBirth && <p className="text-red-500 text-xs mt-1">{errors.yearOfBirth}</p>}
        </div>

        {/* Phone (required) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </span>
            <input
              type="tel"
              value={data.phone}
              onChange={e => handleChange('phone', e.target.value)}
              placeholder="+64 21 234 5678"
              className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all ${
                errors.phone ? 'border-red-400 bg-red-50' : 'border-gray-200'
              }`}
            />
          </div>
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
        </div>

        {/* Email (optional) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address <span className="text-gray-400 text-xs font-normal">(optional)</span>
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </span>
            <input
              type="email"
              value={data.email}
              onChange={e => handleChange('email', e.target.value)}
              placeholder="jane@example.com"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
            />
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="px-6 pb-8">
        <button
          onClick={handleNext}
          className="w-full py-4 rounded-2xl text-white font-semibold text-base transition-all active:scale-95"
          style={{ background: 'linear-gradient(135deg, #6C47FF 0%, #9B72FF 100%)' }}
        >
          Continue
        </button>
        <p className="text-center text-xs text-gray-400 mt-3">
          Already have an account? <span className="text-violet-600 font-medium">Sign in</span>
        </p>
      </div>
    </div>
  );
}
