'use client';

import { useState } from 'react';
import { Save, RotateCcw, ChevronDown, ChevronUp, Zap, Info, BarChart2 } from 'lucide-react';
import { ACTIVE_TRY_ON_PROMPT } from '@/lib/tryon-prompt';

export default function AdminTryOn() {
  const [systemPrompt, setSystemPrompt] = useState(ACTIVE_TRY_ON_PROMPT.systemPrompt);
  const [negativePrompt, setNegativePrompt] = useState(ACTIVE_TRY_ON_PROMPT.negativePrompt);
  const [guidanceScale, setGuidanceScale] = useState(ACTIVE_TRY_ON_PROMPT.guidanceScale);
  const [strength, setStrength] = useState(ACTIVE_TRY_ON_PROMPT.strength);
  const [saved, setSaved] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [stats, setStats] = useState<{ activeSessionsLastHour: number; totalGenerationsLast24h: number } | null>(null);

  const handleSave = () => {
    // TODO: POST to /api/admin/tryon-prompt to persist to DB
    // This will override src/lib/tryon-prompt.ts at runtime
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleReset = () => {
    setSystemPrompt(ACTIVE_TRY_ON_PROMPT.systemPrompt);
    setNegativePrompt(ACTIVE_TRY_ON_PROMPT.negativePrompt);
    setGuidanceScale(ACTIVE_TRY_ON_PROMPT.guidanceScale);
    setStrength(ACTIVE_TRY_ON_PROMPT.strength);
  };

  const loadStats = async () => {
    setShowStats(!showStats);
    if (!stats) {
      const res = await fetch('/api/try-on/log', { headers: { referer: '/admin' } });
      if (res.ok) setStats(await res.json());
    }
  };

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Try-On AI Settings</h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage the Nano Banana AI prompt and generation parameters.
        </p>
      </div>

      {/* Status Banner */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-8 flex items-start gap-3">
        <Info size={18} className="text-amber-600 mt-0.5 flex-shrink-0" />
        <div className="text-sm text-amber-800">
          <p className="font-semibold mb-1">Canvas Mode Active (No AI Model Connected)</p>
          <p className="text-amber-700">
            The try-on currently uses client-side canvas compositing — no model API is called.
            These prompts are staged and ready. To activate real AI, connect a model in{' '}
            <code className="bg-amber-100 px-1 rounded text-xs">src/app/api/try-on/generate/route.ts</code>{' '}
            and set <code className="bg-amber-100 px-1 rounded text-xs">NEXT_PUBLIC_TRYON_MODE=ai</code> in your Vercel environment variables.
          </p>
        </div>
      </div>

      {/* Usage Stats */}
      <div className="bg-white rounded-2xl border shadow-sm mb-6 overflow-hidden">
        <button
          onClick={loadStats}
          className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition"
        >
          <div className="flex items-center gap-2 font-semibold">
            <BarChart2 size={18} className="text-gray-500" />
            Usage Statistics (Last 24h)
          </div>
          {showStats ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        {showStats && (
          <div className="border-t p-5 grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <p className="text-3xl font-bold">{stats?.activeSessionsLastHour ?? '—'}</p>
              <p className="text-xs text-gray-500 mt-1">Active sessions (last hour)</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <p className="text-3xl font-bold">{stats?.totalGenerationsLast24h ?? '—'}</p>
              <p className="text-xs text-gray-500 mt-1">Total generations (24h)</p>
            </div>
            <div className="col-span-2 text-xs text-gray-400 text-center">
              Rate limit: 10 try-ons per IP per hour · Data retained for 24 hours
            </div>
          </div>
        )}
      </div>

      {/* Prompt Editor */}
      <div className="bg-white rounded-2xl border shadow-sm p-6 space-y-6">
        <h2 className="font-bold text-lg flex items-center gap-2">
          <Zap size={18} className="text-amber-500" /> Prompt Configuration
          <span className="text-xs text-gray-400 font-normal ml-auto">v{ACTIVE_TRY_ON_PROMPT.version}</span>
        </h2>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
            System Prompt
          </label>
          <p className="text-xs text-gray-400 mb-2">
            Tells the model what to do. Be specific about what to change (hair) and what to preserve (face, skin, background).
          </p>
          <textarea
            rows={8}
            value={systemPrompt}
            onChange={e => setSystemPrompt(e.target.value)}
            className="w-full border rounded-xl px-4 py-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-amber-500 leading-relaxed"
          />
          <p className="text-xs text-gray-400 mt-1 text-right">{systemPrompt.length} characters</p>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
            Negative Prompt
          </label>
          <p className="text-xs text-gray-400 mb-2">
            Things the model should actively avoid. Use this to suppress artifacts, unnatural results, or unwanted changes.
          </p>
          <textarea
            rows={4}
            value={negativePrompt}
            onChange={e => setNegativePrompt(e.target.value)}
            className="w-full border rounded-xl px-4 py-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-amber-500 leading-relaxed"
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
              Guidance Scale: <span className="text-black">{guidanceScale}</span>
            </label>
            <p className="text-xs text-gray-400 mb-3">
              How strictly the model follows the prompt (1–20). 7–8 is a good balance.
            </p>
            <input
              type="range" min={1} max={20} step={0.5}
              value={guidanceScale}
              onChange={e => setGuidanceScale(Number(e.target.value))}
              className="w-full accent-amber-500"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1"><span>Creative</span><span>Strict</span></div>
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
              Strength: <span className="text-black">{strength}</span>
            </label>
            <p className="text-xs text-gray-400 mb-3">
              How much the image is transformed (0–1). Keep below 0.8 to preserve the face.
            </p>
            <input
              type="range" min={0.3} max={1} step={0.01}
              value={strength}
              onChange={e => setStrength(Number(e.target.value))}
              className="w-full accent-amber-500"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1"><span>Subtle</span><span>Full Replace</span></div>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            onClick={handleSave}
            className="flex-1 bg-black text-white py-3 rounded-xl font-bold text-sm hover:bg-gray-800 transition flex items-center justify-center gap-2"
          >
            <Save size={15} />
            {saved ? 'Saved!' : 'Save Configuration'}
          </button>
          <button
            onClick={handleReset}
            className="border px-5 py-3 rounded-xl font-medium text-sm hover:bg-gray-50 transition flex items-center gap-2"
          >
            <RotateCcw size={14} /> Reset to Default
          </button>
        </div>
      </div>

      {/* Version notes */}
      <div className="mt-6 bg-white rounded-2xl border shadow-sm overflow-hidden">
        <button
          onClick={() => setShowHistory(!showHistory)}
          className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition"
        >
          <span className="font-semibold text-sm">Prompt Notes & Version History</span>
          {showHistory ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        {showHistory && (
          <div className="border-t p-5">
            <pre className="text-xs text-gray-600 font-mono leading-relaxed whitespace-pre-wrap bg-gray-50 p-4 rounded-xl">
              {ACTIVE_TRY_ON_PROMPT.notes}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
