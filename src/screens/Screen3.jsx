import React, { useState, useMemo } from 'react';

const VIBES_DATA = {
  'Activity Type': [
    'Walking', 'Running', 'Hiking', 'Cycling', 'Swimming',
    'Rugby', 'Soccer', 'Basketball', 'Tennis', 'Volleyball',
    'Boxing', 'Martial Arts', 'Yoga', 'Pilates', 'Gym',
    'DnD', 'Board Games', 'Trivia', 'Chess', 'Painting',
    'Photography', 'Rock Climbing', 'Dance', 'Archery', 'Surfing',
    'Kayaking', 'Badminton', 'Golf', 'Cricket', 'Softball',
  ],
  'Expectations': [
    'Casual', 'Regular', 'Competitive', 'Social', 'Free',
    'Paid Activity', 'No Equipment Required', 'Bring Your Own Gear',
    'Beginners Welcome', 'All Skill Levels', 'Advanced Only',
    'Pet Friendly', 'Wheelchair Accessible', 'Outdoors', 'Indoors',
  ],
  'Demographics': [
    'All Ages', 'Under 25', '25–40', '40+', 'Seniors',
    'Female Encouraged', 'Male Encouraged', 'Non-binary Friendly',
    'LGBTQIA+ Friendly', 'Families Welcome', 'Cultural Community',
    'Indigenous Peoples', 'Student Group', 'Professionals',
  ],
  'Interests': [
    'Music', 'Reading', 'Cooking', 'Gardening', 'Volunteering',
    'Environmental', 'Tech & Coding', 'Art & Craft', 'Movies',
    'Travel', 'Languages', 'Spirituality', 'Mindfulness', 'Fitness',
  ],
};

// Flatten and shuffle
function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const CATEGORY_COLORS = {
  'Activity Type': { bg: '#EDE9FF', text: '#5B21B6', border: '#C4B5FD' },
  'Expectations':  { bg: '#FFF3E0', text: '#B45309', border: '#FCD34D' },
  'Demographics':  { bg: '#E0F2FE', text: '#0369A1', border: '#7DD3FC' },
  'Interests':     { bg: '#F0FDF4', text: '#166534', border: '#86EFAC' },
};

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

export default function Screen3({ data, onUpdate, onNext, onBack }) {
  const [search, setSearch] = useState('');

  // Build flat list with category info, shuffled once on mount
  const allVibes = useMemo(() => {
    const flat = [];
    Object.entries(VIBES_DATA).forEach(([category, tags]) => {
      tags.forEach(tag => flat.push({ tag, category }));
    });
    return shuffleArray(flat);
  }, []);

  const addedVibes = data.vibes || [];

  const filtered = useMemo(() => {
    if (!search.trim()) return allVibes;
    return allVibes.filter(v =>
      v.tag.toLowerCase().includes(search.toLowerCase()) ||
      v.category.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, allVibes]);

  const available = filtered.filter(v => !addedVibes.includes(v.tag));

  const toggleVibe = (tag) => {
    if (addedVibes.includes(tag)) {
      onUpdate({ vibes: addedVibes.filter(v => v !== tag) });
    } else {
      onUpdate({ vibes: [...addedVibes, tag] });
    }
  };

  const getColor = (category) => CATEGORY_COLORS[category] || CATEGORY_COLORS['Activity Type'];

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-6 pt-4 pb-3">
        <button onClick={onBack} className="flex items-center gap-1 text-gray-500 text-sm mb-3 -ml-1 active:text-violet-600">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
        <h2 className="text-2xl font-bold text-gray-900">Your Vibes</h2>
        <p className="text-sm text-gray-500 mt-1">Select tags that match your interests — these help us find the right activities for you.</p>
      </div>

      {/* Search */}
      <div className="px-6 mb-3">
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search vibes..."
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Main scrollable content */}
      <div className="flex-1 overflow-y-auto px-6 pb-2 tags-scroll">
        {/* Added vibes */}
        {addedVibes.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-semibold text-gray-700">
                Your Vibes
                <span className="ml-2 bg-violet-100 text-violet-700 text-xs font-bold px-2 py-0.5 rounded-full">
                  {addedVibes.length}
                </span>
              </p>
            </div>
            <div className="flex flex-wrap gap-2 p-3 bg-violet-50 rounded-2xl border border-violet-100 min-h-[60px]">
              {addedVibes.map(tag => {
                const item = allVibes.find(v => v.tag === tag);
                const color = getColor(item?.category);
                return (
                  <button
                    key={tag}
                    onClick={() => toggleVibe(tag)}
                    className="vibe-tag flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold border"
                    style={{ background: color.bg, color: color.text, borderColor: color.border }}
                  >
                    {tag}
                    <svg className="w-3 h-3 ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Vibe cloud — available tags */}
        <div className="mb-2">
          <p className="text-sm font-semibold text-gray-700 mb-2">
            {search ? `Results for "${search}"` : 'Explore Vibes'}
            <span className="ml-2 text-gray-400 font-normal text-xs">Tap to add</span>
          </p>
          {available.length === 0 ? (
            <div className="text-center py-8 text-gray-400 text-sm">
              {search ? 'No vibes match your search' : 'All vibes added! 🎉'}
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {available.map(({ tag, category }) => {
                const color = getColor(category);
                return (
                  <button
                    key={tag}
                    onClick={() => toggleVibe(tag)}
                    className="vibe-tag px-3 py-1.5 rounded-full text-xs font-medium border border-dashed transition-all"
                    style={{
                      background: 'white',
                      color: color.text,
                      borderColor: color.border,
                    }}
                  >
                    + {tag}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Category legend */}
        {!search && (
          <div className="mt-4 mb-2">
            <p className="text-xs font-medium text-gray-400 mb-2">Categories</p>
            <div className="flex flex-wrap gap-2">
              {Object.entries(CATEGORY_COLORS).map(([cat, color]) => (
                <div
                  key={cat}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border"
                  style={{ background: color.bg, color: color.text, borderColor: color.border }}
                >
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: color.text }} />
                  {cat}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Visibility toggle + CTA */}
      <div className="px-6 pt-3 pb-8 border-t border-gray-100">
        <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
          <div>
            <p className="text-sm font-medium text-gray-700">Vibe Visibility</p>
            <p className="text-xs text-gray-400">Who can see your interests?</p>
          </div>
          <Toggle
            checked={data.vibesPublic}
            onChange={val => onUpdate({ vibesPublic: val })}
          />
        </div>
        <button
          onClick={onNext}
          className="w-full py-4 rounded-2xl text-white font-semibold text-base transition-all active:scale-95"
          style={{ background: 'linear-gradient(135deg, #6C47FF 0%, #9B72FF 100%)' }}
        >
          Continue {addedVibes.length > 0 && `(${addedVibes.length} vibe${addedVibes.length !== 1 ? 's' : ''})`}
        </button>
      </div>
    </div>
  );
}
