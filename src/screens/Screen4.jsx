import React, { useState, useMemo } from 'react';

// Avatar definitions with associated tags/vibes
const AVATAR_LIBRARY = [
  // Sports / active
  { id: 'runner',   emoji: '🏃', label: 'Runner',    tags: ['Running', 'Walking', 'Hiking', 'Fitness'] },
  { id: 'cyclist',  emoji: '🚴', label: 'Cyclist',   tags: ['Cycling', 'Outdoors', 'Fitness'] },
  { id: 'swimmer',  emoji: '🏊', label: 'Swimmer',   tags: ['Swimming', 'Fitness', 'Outdoors'] },
  { id: 'soccer',   emoji: '⚽', label: 'Soccer',    tags: ['Soccer', 'Competitive', 'Social'] },
  { id: 'rugby',    emoji: '🏉', label: 'Rugby',     tags: ['Rugby', 'Competitive', 'Team Sport'] },
  { id: 'tennis',   emoji: '🎾', label: 'Tennis',    tags: ['Tennis', 'Badminton', 'Competitive'] },
  { id: 'basketball', emoji: '🏀', label: 'Hooper',  tags: ['Basketball', 'Competitive', 'Social'] },
  { id: 'boxer',    emoji: '🥊', label: 'Boxer',     tags: ['Boxing', 'Martial Arts', 'Competitive'] },
  { id: 'climber',  emoji: '🧗', label: 'Climber',   tags: ['Rock Climbing', 'Outdoors', 'Fitness'] },
  { id: 'surfer',   emoji: '🏄', label: 'Surfer',    tags: ['Surfing', 'Outdoors', 'Casual'] },
  { id: 'yogi',     emoji: '🧘', label: 'Yogi',      tags: ['Yoga', 'Pilates', 'Mindfulness', 'Casual'] },
  { id: 'hiker',    emoji: '🥾', label: 'Hiker',     tags: ['Hiking', 'Walking', 'Outdoors', 'Environmental'] },
  { id: 'kayaker',  emoji: '🚣', label: 'Kayaker',   tags: ['Kayaking', 'Outdoors', 'Fitness'] },
  { id: 'golfer',   emoji: '⛳', label: 'Golfer',    tags: ['Golf', 'Outdoors', 'Casual'] },
  // Creative / social
  { id: 'artist',   emoji: '🎨', label: 'Artist',    tags: ['Painting', 'Art & Craft', 'Photography'] },
  { id: 'gamer',    emoji: '🎲', label: 'Gamer',     tags: ['DnD', 'Board Games', 'Trivia', 'Chess'] },
  { id: 'reader',   emoji: '📚', label: 'Bookworm',  tags: ['Reading', 'Mindfulness'] },
  { id: 'cook',     emoji: '👨‍🍳', label: 'Chef',     tags: ['Cooking', 'Social'] },
  { id: 'musician', emoji: '🎵', label: 'Musician',  tags: ['Music', 'Social'] },
  { id: 'coder',    emoji: '💻', label: 'Coder',     tags: ['Tech & Coding', 'Professionals'] },
  { id: 'traveller',emoji: '✈️', label: 'Explorer',  tags: ['Travel', 'Outdoors', 'Cultural Community'] },
  { id: 'gardener', emoji: '🌱', label: 'Gardener',  tags: ['Gardening', 'Environmental', 'Mindfulness'] },
  { id: 'volunteer',emoji: '🤝', label: 'Volunteer', tags: ['Volunteering', 'Social', 'All Ages'] },
  { id: 'dancer',   emoji: '💃', label: 'Dancer',    tags: ['Dance', 'Music', 'Social'] },
  // Misc / demographic
  { id: 'zen',      emoji: '🧠', label: 'Zen',       tags: ['Mindfulness', 'Spirituality', 'Casual'] },
  { id: 'star',     emoji: '⭐', label: 'Star',       tags: [] },
  { id: 'fire',     emoji: '🔥', label: 'Fired Up',  tags: ['Competitive', 'Advanced Only', 'Fitness'] },
  { id: 'leaf',     emoji: '🍃', label: 'Nature',    tags: ['Environmental', 'Outdoors', 'Hiking'] },
];

function AvatarCard({ avatar, selected, onSelect }) {
  return (
    <button
      onClick={() => onSelect(avatar.id)}
      className={`avatar-card flex flex-col items-center gap-1.5 p-3 rounded-2xl border-2 transition-all ${
        selected
          ? 'border-violet-500 bg-violet-50 shadow-lg shadow-violet-100'
          : 'border-gray-100 bg-white hover:border-violet-200 hover:bg-violet-50/30'
      }`}
    >
      <div
        className={`w-14 h-14 rounded-xl flex items-center justify-center text-3xl transition-all ${
          selected ? 'scale-110' : ''
        }`}
        style={{
          background: selected
            ? 'linear-gradient(135deg, #EDE9FF, #DDD6FE)'
            : '#f9fafb'
        }}
      >
        {avatar.emoji}
      </div>
      <span className={`text-xs font-medium ${selected ? 'text-violet-700' : 'text-gray-600'}`}>
        {avatar.label}
      </span>
      {selected && (
        <div className="w-4 h-4 bg-violet-600 rounded-full flex items-center justify-center">
          <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}
    </button>
  );
}

export default function Screen4({ data, onUpdate, onNext, onBack }) {
  const [tab, setTab] = useState('suggested'); // 'suggested' | 'all'
  const selectedVibes = data.vibes || [];

  // Suggested: avatars that match at least one selected vibe
  const suggested = useMemo(() => {
    if (selectedVibes.length === 0) return AVATAR_LIBRARY.slice(0, 8);
    const scored = AVATAR_LIBRARY.map(av => ({
      ...av,
      score: av.tags.filter(t => selectedVibes.includes(t)).length,
    }));
    return scored.filter(a => a.score > 0).sort((a, b) => b.score - a.score);
  }, [selectedVibes]);

  const displayList = tab === 'suggested' ? suggested : AVATAR_LIBRARY;

  const handleUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => onUpdate({ avatarId: 'custom', avatarUrl: ev.target.result });
    reader.readAsDataURL(file);
  };

  const selectedAvatar =
    data.avatarId === 'custom'
      ? null
      : AVATAR_LIBRARY.find(a => a.id === data.avatarId);

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
        <h2 className="text-2xl font-bold text-gray-900">Choose Your Avatar</h2>
        <p className="text-sm text-gray-500 mt-1">Pick an avatar that represents you. We've suggested some based on your vibes!</p>
      </div>

      {/* Current selection preview */}
      <div className="mx-6 mb-4 p-4 rounded-2xl border border-gray-100 bg-gray-50 flex items-center gap-4">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl border-2 border-violet-200 bg-white overflow-hidden"
          style={{ flexShrink: 0 }}
        >
          {data.avatarId === 'custom' && data.avatarUrl ? (
            <img src={data.avatarUrl} alt="Custom avatar" className="w-full h-full object-cover" />
          ) : selectedAvatar ? (
            selectedAvatar.emoji
          ) : (
            <span className="text-gray-300 text-2xl">👤</span>
          )}
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-800">
            {data.avatarId === 'custom' ? 'Custom Photo' : selectedAvatar ? selectedAvatar.label : 'No avatar selected'}
          </p>
          <p className="text-xs text-gray-400 mt-0.5">
            {data.displayName || 'Your Display Name'}
          </p>
          {!data.avatarId && (
            <p className="text-xs text-violet-500 mt-1">Select an avatar below</p>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="px-6 mb-3">
        <div className="flex gap-1 p-1 bg-gray-100 rounded-xl">
          <button
            onClick={() => setTab('suggested')}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
              tab === 'suggested'
                ? 'bg-white text-violet-700 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            ✨ For You
            {suggested.length > 0 && (
              <span className="ml-1 text-xs bg-violet-100 text-violet-600 px-1.5 py-0.5 rounded-full">
                {suggested.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setTab('all')}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
              tab === 'all'
                ? 'bg-white text-violet-700 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            📚 All Avatars
          </button>
        </div>
      </div>

      {/* Avatar grid */}
      <div className="flex-1 overflow-y-auto px-6 pb-2 tags-scroll">
        {displayList.length === 0 ? (
          <div className="text-center py-10 text-gray-400 text-sm">
            Select some vibes first to get personalized suggestions!
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-2">
            {displayList.map(avatar => (
              <AvatarCard
                key={avatar.id}
                avatar={avatar}
                selected={data.avatarId === avatar.id}
                onSelect={id => onUpdate({ avatarId: id, avatarUrl: null })}
              />
            ))}
          </div>
        )}
      </div>

      {/* Upload option */}
      <div className="px-6 pt-3 pb-8 border-t border-gray-100">
        <label className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border-2 border-dashed border-gray-200 text-sm text-gray-500 font-medium cursor-pointer hover:border-violet-300 hover:text-violet-600 hover:bg-violet-50 transition-all mb-4">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Upload Your Own Photo
          <input type="file" accept="image/*" className="hidden" onChange={handleUpload} />
        </label>
        <button
          onClick={onNext}
          className="w-full py-4 rounded-2xl text-white font-semibold text-base transition-all active:scale-95"
          style={{ background: 'linear-gradient(135deg, #6C47FF 0%, #9B72FF 100%)' }}
        >
          {data.avatarId ? "Let's Go! 🚀" : 'Skip for now'}
        </button>
      </div>
    </div>
  );
}
