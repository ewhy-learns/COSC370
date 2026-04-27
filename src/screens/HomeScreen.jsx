import React, { useState } from 'react';

const AVATAR_MAP = {
  runner: '🏃', cyclist: '🚴', swimmer: '🏊', soccer: '⚽', rugby: '🏉',
  tennis: '🎾', basketball: '🏀', boxer: '🥊', climber: '🧗', surfer: '🏄',
  yogi: '🧘', hiker: '🥾', kayaker: '🚣', golfer: '⛳', artist: '🎨',
  gamer: '🎲', reader: '📚', cook: '👨‍🍳', musician: '🎵', coder: '💻',
  traveller: '✈️', gardener: '🌱', volunteer: '🤝', dancer: '💃',
  zen: '🧠', star: '⭐', fire: '🔥', leaf: '🍃',
};

const SAMPLE_ACTIVITIES = [
  {
    id: 1,
    title: 'Saturday Morning Run',
    host: 'PaceSetters',
    location: 'Hagley Park, Christchurch',
    date: 'Sat 8:00 AM',
    vibes: ['Running', 'Casual', 'All Ages', 'Free', 'Outdoors'],
    spots: 12,
    joined: false,
    emoji: '🏃',
    color: '#6C47FF',
  },
  {
    id: 2,
    title: 'Friday Night DnD',
    host: 'Dungeon Masters NZ',
    location: 'The Board Room, CBD',
    date: 'Fri 7:00 PM',
    vibes: ['DnD', 'Casual', 'Beginners Welcome', 'Social', 'Indoors'],
    spots: 4,
    joined: true,
    emoji: '🎲',
    color: '#B45309',
  },
  {
    id: 3,
    title: 'Yoga in the Park',
    host: 'Flow Collective',
    location: 'Botanic Gardens',
    date: 'Sun 9:00 AM',
    vibes: ['Yoga', 'Mindfulness', 'Casual', 'Free', 'Outdoors', 'All Skill Levels'],
    spots: 20,
    joined: false,
    emoji: '🧘',
    color: '#0369A1',
  },
  {
    id: 4,
    title: 'Social Basketball',
    host: 'Hoop Dreams NZ',
    location: 'Cowles Stadium',
    date: 'Wed 6:00 PM',
    vibes: ['Basketball', 'Social', 'All Skill Levels', 'Paid Activity', 'Indoors'],
    spots: 8,
    joined: false,
    emoji: '🏀',
    color: '#166534',
  },
  {
    id: 5,
    title: 'Photography Walk',
    host: 'Lens & Light Club',
    location: 'Lyttelton Harbour',
    date: 'Sat 10:00 AM',
    vibes: ['Photography', 'Walking', 'Casual', 'Free', 'Outdoors', 'All Ages'],
    spots: 15,
    joined: false,
    emoji: '📷',
    color: '#9D174D',
  },
];

const VIBE_TAG_COLORS = {
  'Free': { bg: '#dcfce7', text: '#15803d' },
  'Paid Activity': { bg: '#fef3c7', text: '#b45309' },
  'Casual': { bg: '#ede9fe', text: '#5b21b6' },
  'Competitive': { bg: '#fee2e2', text: '#b91c1c' },
  'Social': { bg: '#dbeafe', text: '#1d4ed8' },
  'Beginners Welcome': { bg: '#f0fdf4', text: '#166534' },
  'All Ages': { bg: '#faf5ff', text: '#7e22ce' },
  'Outdoors': { bg: '#ecfdf5', text: '#065f46' },
  'Indoors': { bg: '#f1f5f9', text: '#334155' },
};

function VibeTag({ label }) {
  const colors = VIBE_TAG_COLORS[label] || { bg: '#f3f4f6', text: '#4b5563' };
  return (
    <span
      className="px-2 py-0.5 rounded-full text-xs font-medium"
      style={{ background: colors.bg, color: colors.text }}
    >
      {label}
    </span>
  );
}

function ActivityCard({ activity }) {
  const [joined, setJoined] = useState(activity.joined);
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-3">
      {/* Card header */}
      <div className="flex items-start p-4 gap-3">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
          style={{ background: `${activity.color}15` }}
        >
          {activity.emoji}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-gray-900 text-sm leading-tight">{activity.title}</h3>
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0 ${
              activity.spots <= 5 ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'
            }`}>
              {activity.spots} spots
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-0.5">by {activity.host}</p>
          <div className="flex items-center gap-3 mt-1.5">
            <span className="flex items-center gap-1 text-xs text-gray-500">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {activity.location}
            </span>
            <span className="flex items-center gap-1 text-xs text-gray-500">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {activity.date}
            </span>
          </div>
        </div>
      </div>
      {/* Vibes */}
      <div className="px-4 pb-3 flex flex-wrap gap-1.5">
        {activity.vibes.slice(0, 4).map(v => <VibeTag key={v} label={v} />)}
        {activity.vibes.length > 4 && (
          <span className="text-xs text-gray-400">+{activity.vibes.length - 4} more</span>
        )}
      </div>
      {/* Action */}
      <div className="px-4 pb-4">
        <button
          onClick={() => setJoined(!joined)}
          className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all active:scale-95 ${
            joined
              ? 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-600'
              : 'text-white'
          }`}
          style={!joined ? { background: `linear-gradient(135deg, #6C47FF 0%, #9B72FF 100%)` } : {}}
        >
          {joined ? '✓ Joined — Tap to Leave' : 'Join Activity'}
        </button>
      </div>
    </div>
  );
}

export default function HomeScreen({ data }) {
  const [activeTab, setActiveTab] = useState('discover');
  const avatarEmoji = data.avatarId && data.avatarId !== 'custom' ? AVATAR_MAP[data.avatarId] : null;

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Top Bar */}
      <div className="bg-white px-6 pt-4 pb-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400">Good morning! 👋</p>
            <h2 className="text-xl font-bold text-gray-900">{data.displayName || 'Adventurer'}</h2>
          </div>
          <div className="flex items-center gap-3">
            <button className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-violet-200 flex items-center justify-center bg-violet-50">
              {data.avatarId === 'custom' && data.avatarUrl ? (
                <img src={data.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
              ) : avatarEmoji ? (
                <span className="text-xl">{avatarEmoji}</span>
              ) : (
                <span className="text-sm font-bold text-violet-600">
                  {(data.displayName || 'A')[0].toUpperCase()}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Search bar */}
        <div className="mt-3 relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            readOnly
            placeholder="Search activities, vibes..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm bg-gray-50 text-gray-400 cursor-pointer"
          />
        </div>
      </div>

      {/* Vibes filter */}
      {data.vibes && data.vibes.length > 0 && (
        <div className="bg-white px-6 py-3 border-b border-gray-100">
          <p className="text-xs text-gray-400 mb-2">Your Vibes</p>
          <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
            {data.vibes.slice(0, 8).map(v => (
              <span
                key={v}
                className="flex-shrink-0 px-3 py-1 rounded-full text-xs font-medium bg-violet-100 text-violet-700 cursor-pointer hover:bg-violet-200 transition-colors"
              >
                {v}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Tab nav */}
      <div className="bg-white px-6 pt-3 border-b border-gray-100">
        <div className="flex gap-4">
          {[
            { id: 'discover', label: 'Discover' },
            { id: 'nearby', label: 'Nearby' },
            { id: 'joined', label: 'Joined' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-2.5 text-sm font-medium border-b-2 transition-all ${
                activeTab === tab.id
                  ? 'border-violet-600 text-violet-700'
                  : 'border-transparent text-gray-400'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Activity feed */}
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-20 screen-content">
        {activeTab === 'discover' || activeTab === 'nearby' ? (
          <>
            {activeTab === 'discover' && (
              <div className="mb-4 p-4 rounded-2xl text-white" style={{ background: 'linear-gradient(135deg, #6C47FF 0%, #9B72FF 100%)' }}>
                <p className="text-xs font-medium opacity-80 mb-1">✨ Matched to your vibes</p>
                <h3 className="text-lg font-bold">Find Your Next Adventure</h3>
                <p className="text-xs opacity-70 mt-1">
                  {data.vibes?.length > 0
                    ? `${data.vibes.length} vibes selected — showing relevant activities`
                    : 'Browse all activities near you'}
                </p>
              </div>
            )}
            {SAMPLE_ACTIVITIES.map(a => <ActivityCard key={a.id} activity={a} />)}
          </>
        ) : (
          <div className="text-center py-12 text-gray-400">
            <div className="text-4xl mb-3">📅</div>
            <p className="text-sm font-medium text-gray-600">No joined activities yet</p>
            <p className="text-xs mt-1">Browse Discover to find something fun!</p>
          </div>
        )}
      </div>

      {/* Bottom nav */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-3 flex justify-around">
        {[
          { icon: '🏠', label: 'Home', active: true },
          { icon: '🗺️', label: 'Explore', active: false },
          { icon: '➕', label: 'Host', active: false, primary: true },
          { icon: '💬', label: 'Chat', active: false },
          { icon: '👤', label: 'Profile', active: false },
        ].map(item => (
          <button
            key={item.label}
            className={`flex flex-col items-center gap-0.5 ${item.primary ? '-mt-4' : ''}`}
          >
            {item.primary ? (
              <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg shadow-violet-300" style={{ background: 'linear-gradient(135deg, #6C47FF, #9B72FF)' }}>
                <span className="text-xl">{item.icon}</span>
              </div>
            ) : (
              <span className={`text-xl ${item.active ? 'opacity-100' : 'opacity-40'}`}>{item.icon}</span>
            )}
            <span className={`text-xs ${item.active ? 'text-violet-700 font-semibold' : 'text-gray-400'} ${item.primary ? 'mt-1' : ''}`}>
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
