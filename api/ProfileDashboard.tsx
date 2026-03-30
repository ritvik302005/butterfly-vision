import React, { useMemo } from 'react';
import { BarChart3, CalendarDays, Flame, MapPinned, Medal, UserRound, X } from 'lucide-react';

interface AuthUser {
  name: string;
  gender: string;
  email: string;
  password: string;
  mode: 'signin' | 'signup';
}

interface IdentificationHistoryItem {
  id: string;
  species: string;
  confidence: number;
  family: string;
  date: string;
  thumbnail?: string;
  distributionSummary?: string;
}

const HISTORY_STORAGE_KEY = 'butterfly:history';

function getCitizenRank(total: number) {
  if (total >= 25) return 'Expert';
  if (total >= 12) return 'Naturalist';
  return 'Beginner';
}

function calculateStreak(dates: string[]) {
  if (dates.length === 0) return 0;

  const uniqueDays = Array.from(new Set(dates.map((date) => new Date(date).toDateString()))).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  );

  let streak = 1;
  for (let index = 1; index < uniqueDays.length; index += 1) {
    const previous = new Date(uniqueDays[index - 1]).getTime();
    const current = new Date(uniqueDays[index]).getTime();
    const diffInDays = Math.round((previous - current) / (1000 * 60 * 60 * 24));
    if (diffInDays === 1) {
      streak += 1;
    } else {
      break;
    }
  }
  return streak;
}

export default function ProfileDashboard({
  user,
  onClose,
  onLogout
}: {
  user: AuthUser;
  onClose: () => void;
  onLogout: () => void;
}) {
  const history: IdentificationHistoryItem[] = useMemo(() => {
    const raw = localStorage.getItem(HISTORY_STORAGE_KEY);
    if (!raw) return [];
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  }, []);

  const totalIdentifications = history.length;
  const uniqueSpecies = new Set(history.map((item) => item.species)).size;
  const identificationStreak = calculateStreak(history.map((item) => item.date));
  const averageConfidence = history.length
    ? history.reduce((sum, item) => sum + item.confidence, 0) / history.length
    : 0;
  const sharedDatasetContributions = Math.floor(totalIdentifications * 0.42);
  const rank = getCitizenRank(totalIdentifications);

  const recentHistory = history.slice().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);

  const monthlyActivity = Array.from({ length: 6 }, (_, offset) => {
    const date = new Date();
    date.setMonth(date.getMonth() - (5 - offset));
    const key = `${date.getFullYear()}-${date.getMonth()}`;
    const count = history.filter((item) => {
      const itemDate = new Date(item.date);
      return `${itemDate.getFullYear()}-${itemDate.getMonth()}` === key;
    }).length;
    return {
      label: date.toLocaleString('en-US', { month: 'short' }),
      count
    };
  });

  const topSpecies = Array.from(
    history.reduce((accumulator, item) => {
      accumulator.set(item.species, (accumulator.get(item.species) || 0) + 1);
      return accumulator;
    }, new Map<string, number>())
  )
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  const regionStats = Array.from(
    history.reduce((accumulator, item) => {
      const region = item.distributionSummary?.split(',')[0] || 'South Asia';
      accumulator.set(region, (accumulator.get(region) || 0) + 1);
      return accumulator;
    }, new Map<string, number>())
  ).slice(0, 3);

  return (
    <div className="fixed inset-0 z-[60] bg-brand-ink/50 px-4 py-6 overflow-y-auto">
      <div className="max-w-6xl mx-auto rounded-[2rem] bg-white border border-brand-ink/5 shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-8 py-6 border-b border-brand-ink/5">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-brand-olive text-white flex items-center justify-center">
              <UserRound className="w-7 h-7" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest font-bold text-brand-olive">Profile Dashboard</p>
              <h2 className="text-3xl font-serif">{user.name}</h2>
              <p className="text-brand-ink/50 text-sm">{user.email} • {user.gender}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onLogout}
              className="px-4 py-2 rounded-full border border-brand-ink/10 text-sm font-bold uppercase tracking-widest hover:bg-brand-cream transition-colors"
            >
              Logout
            </button>
            <button
              onClick={onClose}
              className="p-3 rounded-full hover:bg-brand-cream transition-colors"
              aria-label="Close dashboard"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-8 space-y-8">
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
            <div className="rounded-3xl bg-brand-cream p-6">
              <p className="text-xs uppercase tracking-widest font-bold text-brand-olive mb-2">Total Identified</p>
              <p className="text-4xl font-serif">{totalIdentifications}</p>
            </div>
            <div className="rounded-3xl bg-brand-cream p-6">
              <p className="text-xs uppercase tracking-widest font-bold text-brand-olive mb-2">Unique Species</p>
              <p className="text-4xl font-serif">{uniqueSpecies}</p>
            </div>
            <div className="rounded-3xl bg-brand-cream p-6">
              <p className="text-xs uppercase tracking-widest font-bold text-brand-olive mb-2">Identification Streak</p>
              <p className="text-4xl font-serif flex items-center gap-2"><Flame className="w-7 h-7 text-brand-olive" />{identificationStreak}</p>
            </div>
            <div className="rounded-3xl bg-brand-cream p-6">
              <p className="text-xs uppercase tracking-widest font-bold text-brand-olive mb-2">Accuracy Rate</p>
              <p className="text-4xl font-serif">{averageConfidence.toFixed(1)}%</p>
            </div>
          </div>

          <div className="grid xl:grid-cols-[1.2fr_0.8fr] gap-6">
            <div className="rounded-3xl bg-white border border-brand-ink/5 p-6">
              <div className="flex items-center gap-3 mb-5">
                <CalendarDays className="w-5 h-5 text-brand-olive" />
                <h3 className="text-2xl font-serif">Recent Identification History</h3>
              </div>
              <div className="space-y-4">
                {recentHistory.length > 0 ? recentHistory.map((item) => (
                  <div key={item.id} className="grid grid-cols-[70px_1fr_auto] gap-4 items-center rounded-2xl bg-brand-cream px-4 py-4">
                    <div className="w-[70px] h-[70px] rounded-2xl overflow-hidden bg-white">
                      {item.thumbnail ? (
                        <img src={item.thumbnail} alt={item.species} className="w-full h-full object-cover" />
                      ) : null}
                    </div>
                    <div>
                      <p className="font-semibold">{item.species}</p>
                      <p className="text-sm text-brand-ink/50">{item.family}</p>
                      <p className="text-xs text-brand-ink/40">{new Date(item.date).toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-brand-olive">{item.confidence.toFixed(2)}%</p>
                    </div>
                  </div>
                )) : (
                  <p className="text-brand-ink/50">No identifications yet. Classify a butterfly to populate your dashboard.</p>
                )}
              </div>
            </div>

            <div className="rounded-3xl bg-white border border-brand-ink/5 p-6">
              <div className="flex items-center gap-3 mb-5">
                <BarChart3 className="w-5 h-5 text-brand-olive" />
                <h3 className="text-2xl font-serif">Monthly Activity</h3>
              </div>
              <div className="flex items-end gap-3 h-56">
                {monthlyActivity.map((item) => (
                  <div key={item.label} className="flex-1 text-center">
                    <div className="flex items-end justify-center h-44">
                      <div
                        className="w-full rounded-t-2xl bg-brand-olive/80 transition-all"
                        style={{ height: `${Math.max(12, item.count * 22)}px` }}
                      />
                    </div>
                    <p className="mt-3 text-xs uppercase tracking-widest font-bold text-brand-ink/40">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid xl:grid-cols-3 gap-6">
            <div className="rounded-3xl bg-brand-cream p-6">
              <h3 className="text-2xl font-serif mb-4">Most Identified Species</h3>
              <div className="space-y-3">
                {topSpecies.length > 0 ? topSpecies.map(([species, count]) => (
                  <div key={species} className="flex items-center justify-between rounded-2xl bg-white px-4 py-3">
                    <p className="font-medium">{species}</p>
                    <p className="text-brand-olive font-semibold">{count}</p>
                  </div>
                )) : <p className="text-brand-ink/50">No species history yet.</p>}
              </div>
            </div>

            <div className="rounded-3xl bg-brand-cream p-6">
              <div className="flex items-center gap-3 mb-4">
                <Medal className="w-5 h-5 text-brand-olive" />
                <h3 className="text-2xl font-serif">Community Contribution</h3>
              </div>
              <div className="space-y-4 text-brand-ink/70">
                <div className="rounded-2xl bg-white px-4 py-4">
                  <p className="text-xs uppercase tracking-widest font-bold text-brand-ink/40 mb-1">Shared Dataset Adds</p>
                  <p className="text-3xl font-serif">{sharedDatasetContributions}</p>
                </div>
                <div className="rounded-2xl bg-white px-4 py-4">
                  <p className="text-xs uppercase tracking-widest font-bold text-brand-ink/40 mb-1">Citizen Scientist Rank</p>
                  <p className="text-3xl font-serif">{rank}</p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-brand-cream p-6">
              <div className="flex items-center gap-3 mb-4">
                <MapPinned className="w-5 h-5 text-brand-olive" />
                <h3 className="text-2xl font-serif">Regional Contribution</h3>
              </div>
              <div className="space-y-3">
                {regionStats.length > 0 ? regionStats.map(([region, count]) => (
                  <div key={region} className="rounded-2xl bg-white px-4 py-3 flex items-center justify-between">
                    <p className="font-medium">{region}</p>
                    <p className="text-brand-olive font-semibold">{count}</p>
                  </div>
                )) : <p className="text-brand-ink/50">Region data will appear after identifications.</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
