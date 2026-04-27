import React, { useState } from 'react';
import Screen1 from './screens/Screen1';
import Screen2 from './screens/Screen2';
import Screen3 from './screens/Screen3';
import Screen4 from './screens/Screen4';
import HomeScreen from './screens/HomeScreen';

const SCREENS = [
  { id: 'screen1', label: 'Basic Info', icon: '👤' },
  { id: 'screen2', label: 'Profile',    icon: '📝' },
  { id: 'screen3', label: 'Vibes',      icon: '✨' },
  { id: 'screen4', label: 'Avatar',     icon: '🎭' },
  { id: 'home',    label: 'Home',       icon: '🏠' },
];

const SCREEN_ORDER = ['screen1', 'screen2', 'screen3', 'screen4', 'home'];

const INITIAL_DATA = {
  // Screen 1
  firstName: '',
  lastName: '',
  displayName: '',
  yearOfBirth: '',
  phone: '',
  email: '',
  // Screen 2
  aboutMe: '',
  aboutMePublic: false,
  socialCompetitive: 50,
  casualStructured: 50,
  // Screen 3
  vibes: [],
  vibesPublic: false,
  // Screen 4
  avatarId: null,
  avatarUrl: null,
};

function ProgressBar({ currentScreen }) {
  const idx = SCREEN_ORDER.indexOf(currentScreen);
  const pct = Math.round(((idx + 1) / SCREEN_ORDER.length) * 100);
  return (
    <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
      <div
        className="progress-bar h-full rounded-full"
        style={{
          width: `${pct}%`,
          background: 'linear-gradient(90deg, #6C47FF, #9B72FF)',
        }}
      />
    </div>
  );
}

function StepIndicator({ currentScreen }) {
  const idx = SCREEN_ORDER.indexOf(currentScreen);
  return (
    <div className="flex items-center gap-1.5 px-4 py-3">
      {SCREENS.map((s, i) => (
        <React.Fragment key={s.id}>
          <div
            className={`flex items-center justify-center rounded-full text-xs font-bold transition-all ${
              i < idx
                ? 'w-6 h-6 bg-violet-600 text-white'
                : i === idx
                ? 'w-7 h-7 bg-violet-600 text-white shadow-md shadow-violet-200'
                : 'w-6 h-6 bg-gray-100 text-gray-400'
            }`}
          >
            {i < idx ? '✓' : i + 1}
          </div>
          {i < SCREENS.length - 1 && (
            <div className={`flex-1 h-0.5 rounded-full ${i < idx ? 'bg-violet-400' : 'bg-gray-100'}`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState('screen1');
  const [data, setData] = useState(INITIAL_DATA);

  const updateData = (patch) => setData(prev => ({ ...prev, ...patch }));

  const goNext = () => {
    const idx = SCREEN_ORDER.indexOf(screen);
    if (idx < SCREEN_ORDER.length - 1) setScreen(SCREEN_ORDER[idx + 1]);
  };

  const goBack = () => {
    const idx = SCREEN_ORDER.indexOf(screen);
    if (idx > 0) setScreen(SCREEN_ORDER[idx - 1]);
  };

  const isOnboarding = screen !== 'home';

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4" style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' }}>
      {/* App title */}
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-white tracking-tight">
          <span style={{ background: 'linear-gradient(135deg, #9B72FF, #C084FC)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            ActivityFinder
          </span>
        </h1>
        <p className="text-gray-400 text-sm mt-1">Find your perfect activity match</p>
      </div>

      {/* Phone mockup */}
      <div
        className="relative"
        style={{
          width: 390,
          background: '#1a1a1a',
          borderRadius: 44,
          padding: '12px',
          boxShadow: '0 40px 100px rgba(0,0,0,0.6), inset 0 0 0 2px rgba(255,255,255,0.08)',
        }}
      >
        {/* Notch */}
        <div style={{
          width: 120,
          height: 30,
          background: '#1a1a1a',
          borderRadius: '0 0 20px 20px',
          margin: '0 auto 0',
          position: 'relative',
          zIndex: 10,
        }} />

        {/* Screen */}
        <div
          style={{
            background: 'white',
            borderRadius: 32,
            height: 760,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
          }}
        >
          {/* Status bar */}
          <div className="flex justify-between items-center px-6 py-2 bg-white" style={{ flexShrink: 0 }}>
            <span className="text-xs font-semibold text-gray-800">9:41</span>
            <div className="flex items-center gap-1">
              <svg className="w-4 h-3" viewBox="0 0 16 12" fill="currentColor">
                <rect x="0" y="4" width="3" height="8" rx="1" className="text-gray-800" />
                <rect x="4.5" y="2.5" width="3" height="9.5" rx="1" className="text-gray-800" />
                <rect x="9" y="0.5" width="3" height="11.5" rx="1" className="text-gray-800" />
                <rect x="13.5" y="0" width="2.5" height="12" rx="1" fill="none" stroke="currentColor" strokeWidth="1" className="text-gray-800" />
              </svg>
              <svg className="w-4 h-3 ml-0.5" viewBox="0 0 18 13" fill="none">
                <path d="M9 2.4C11.8 2.4 14.3 3.5 16.1 5.3" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M9 6.4C10.7 6.4 12.3 7.1 13.5 8.3" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round"/>
                <circle cx="9" cy="11" r="1.5" fill="#1a1a1a"/>
              </svg>
              <div className="flex items-center gap-0.5 ml-1">
                <div className="w-6 h-3 rounded-sm border border-gray-700 relative">
                  <div className="absolute inset-0.5 bg-gray-800 rounded-sm" style={{ right: '30%' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Progress & steps (only during onboarding) */}
          {isOnboarding && (
            <div style={{ flexShrink: 0 }}>
              <div className="px-4">
                <ProgressBar currentScreen={screen} />
              </div>
              <StepIndicator currentScreen={screen} />
            </div>
          )}

          {/* Screen content */}
          <div className="flex-1 overflow-hidden relative">
            {screen === 'screen1' && (
              <div className="screen-content h-full">
                <Screen1 data={data} onUpdate={updateData} onNext={goNext} />
              </div>
            )}
            {screen === 'screen2' && (
              <div className="screen-content h-full">
                <Screen2 data={data} onUpdate={updateData} onNext={goNext} onBack={goBack} />
              </div>
            )}
            {screen === 'screen3' && (
              <div className="screen-content h-full">
                <Screen3 data={data} onUpdate={updateData} onNext={goNext} onBack={goBack} />
              </div>
            )}
            {screen === 'screen4' && (
              <div className="screen-content h-full">
                <Screen4 data={data} onUpdate={updateData} onNext={goNext} onBack={goBack} />
              </div>
            )}
            {screen === 'home' && (
              <HomeScreen data={data} />
            )}
          </div>
        </div>

        {/* Home indicator */}
        <div style={{
          width: 100,
          height: 5,
          background: 'rgba(255,255,255,0.3)',
          borderRadius: 3,
          margin: '10px auto 0',
        }} />
      </div>

      {/* Debug nav (below phone, for demo) */}
      <div className="mt-6 flex gap-2 flex-wrap justify-center">
        {SCREENS.map((s, i) => {
          const idx = SCREEN_ORDER.indexOf(screen);
          const isActive = screen === s.id;
          const isPast = i < idx;
          return (
            <button
              key={s.id}
              onClick={() => setScreen(s.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                isActive
                  ? 'text-white shadow-lg'
                  : isPast
                  ? 'bg-violet-900/40 text-violet-300 hover:bg-violet-800/50'
                  : 'bg-white/10 text-gray-400 hover:bg-white/20'
              }`}
              style={isActive ? { background: 'linear-gradient(135deg, #6C47FF, #9B72FF)' } : {}}
            >
              {s.icon} {s.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
