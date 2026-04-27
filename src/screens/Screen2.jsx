import React from 'react';

function Toggle({ checked, onChange, labelOn = 'Public', labelOff = 'Friends Only' }) {
  return (
    <div className="flex items-center gap-3">
      <span className={`text-sm font-medium ${!checked ? 'text-violet-600' : 'text-gray-400'}`}>
        {labelOff}
      </span>
      <label className="toggle-switch">
        <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} />
        <span className="toggle-slider" />
      </label>
      <span className={`text-sm font-medium ${checked ? 'text-violet-600' : 'text-gray-400'}`}>
        {labelOn}
      </span>
    </div>
  );
}

function Slider({ label, leftLabel, rightLabel, value, onChange }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-semibold text-gray-700">{label}</span>
        <span className="text-xs text-violet-600 font-medium bg-violet-50 px-2 py-0.5 rounded-full">
          {value <= 33 ? leftLabel : value >= 67 ? rightLabel : 'Balanced'}
        </span>
      </div>
      <div className="relative">
        <input
          type="range"
          min={0}
          max={100}
          value={value}
          onChange={e => onChange(Number(e.target.value))}
          className="w-full"
          style={{
            background: `linear-gradient(to right, #6C47FF ${value}%, #e5e7eb ${value}%)`
          }}
        />
        <div className="flex justify-between mt-1">
          <span className="text-xs text-gray-400">{leftLabel}</span>
          <span className="text-xs text-gray-400">{rightLabel}</span>
        </div>
      </div>
    </div>
  );
}

export default function Screen2({ data, onUpdate, onNext, onBack }) {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-6 pt-4 pb-2">
        <button onClick={onBack} className="flex items-center gap-1 text-gray-500 text-sm mb-3 -ml-1 active:text-violet-600">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
        <h2 className="text-2xl font-bold text-gray-900">Your Profile</h2>
        <p className="text-sm text-gray-500 mt-1">Tell others a bit about yourself and your activity style.</p>
      </div>

      {/* Form */}
      <div className="flex-1 px-6 pb-6 space-y-6 overflow-y-auto">
        {/* About me */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">About Me</label>
          <textarea
            value={data.aboutMe}
            onChange={e => onUpdate({ aboutMe: e.target.value })}
            placeholder="Write a short bio — your passions, what you're looking for in activities, and anything that makes you, you!"
            rows={4}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all resize-none"
          />
          <div className="flex items-center justify-between mt-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
            <div>
              <p className="text-sm font-medium text-gray-700">Profile Visibility</p>
              <p className="text-xs text-gray-400">Who can see your About Me?</p>
            </div>
            <Toggle
              checked={data.aboutMePublic}
              onChange={val => onUpdate({ aboutMePublic: val })}
            />
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100" />

        {/* Activity Style */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #6C47FF20, #6C47FF40)' }}>
              <svg className="w-4 h-4 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-700">Activity Style</p>
              <p className="text-xs text-gray-400">Set your preferred vibe for activities</p>
            </div>
          </div>
          <div className="space-y-6 p-4 bg-gray-50 rounded-2xl border border-gray-100">
            <Slider
              label="Social Style"
              leftLabel="Social"
              rightLabel="Competitive"
              value={data.socialCompetitive}
              onChange={val => onUpdate({ socialCompetitive: val })}
            />
            <div className="border-t border-gray-200" />
            <Slider
              label="Activity Format"
              leftLabel="Casual"
              rightLabel="Structured"
              value={data.casualStructured}
              onChange={val => onUpdate({ casualStructured: val })}
            />
          </div>

          {/* Visual indicator */}
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl border border-gray-100 bg-white">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 rounded-full bg-violet-500" />
                <span className="text-xs font-medium text-gray-600">Social Style</span>
              </div>
              <p className="text-sm font-semibold text-gray-900">
                {data.socialCompetitive <= 33 ? '🤝 Social' : data.socialCompetitive >= 67 ? '🏆 Competitive' : '⚖️ Balanced'}
              </p>
            </div>
            <div className="p-3 rounded-xl border border-gray-100 bg-white">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 rounded-full bg-violet-500" />
                <span className="text-xs font-medium text-gray-600">Format</span>
              </div>
              <p className="text-sm font-semibold text-gray-900">
                {data.casualStructured <= 33 ? '😎 Casual' : data.casualStructured >= 67 ? '📋 Structured' : '⚖️ Balanced'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="px-6 pb-8">
        <button
          onClick={onNext}
          className="w-full py-4 rounded-2xl text-white font-semibold text-base transition-all active:scale-95"
          style={{ background: 'linear-gradient(135deg, #6C47FF 0%, #9B72FF 100%)' }}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
