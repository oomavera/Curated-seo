"use client";
import { useState } from "react";
import Image from "next/image";
import PillButton from "../../components/ui/PillButton";
import logo from "../../../public/Logo2.png";

export default function QualifyPage() {
  const [answers, setAnswers] = useState<Record<string, string>>({
    name: "",
    ownsHome: "",
    squareFootage: "",
    frequency: "",
    priority: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const onChange = (key: string, value: string) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await fetch('/api/qualify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers }),
      });
      const json = await res.json();
      if (!res.ok || !json?.success) throw new Error(json?.error || 'Submit failed');
      try { (window as typeof window & { fbq?: (...args: unknown[]) => void }).fbq?.('track', 'Lead'); } catch {}
      // Redirect to schedule immediately after success
      if (typeof window !== 'undefined') {
        window.location.assign('/schedule');
        return;
      }
      setSuccess('Thanks! You are qualified. We will reach out shortly.');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Something went wrong';
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full font-nhd text-midnight">
      <header className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-2 sm:py-3">
        <div className="hidden sm:flex items-center justify-between">
          <div className="flex justify-start items-center">
            <Image src={logo} alt="Curated Cleanings" width={192} height={48} style={{ height: '38px', width: 'auto', objectFit: 'contain', opacity: 0.95 }} />
          </div>
          <div className="flex-1" />
          <div className="flex items-center justify-end">
            <PillButton onClick={() => window.location.href = 'tel:+14074701780'} variant="inverse" className="px-4 py-1.5 text-sm">CALL NOW</PillButton>
          </div>
        </div>
        <div className="flex items-center justify-between sm:hidden">
          <div className="flex items-center">
            <Image src={logo} alt="Curated Cleanings" width={128} height={32} style={{ height: '26px', width: 'auto', objectFit: 'contain', opacity: 0.95 }} />
          </div>
          <div className="flex-1" />
          <PillButton onClick={() => window.location.href = 'tel:+14074701780'} variant="inverse" className="px-2 py-[2px] text-[10px]">CALL NOW</PillButton>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-8 py-6">
        <h1 className="font-hero text-3xl sm:text-4xl mb-4">Quick Questions</h1>
        <p className="text-mountain mb-6">Please fill out this form so we can help you in the best way possible</p>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">1) Full Name</label>
            <input required className="input-glass px-3 py-2.5 w-full rounded-full" value={answers.name} onChange={e => onChange('name', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">2) Do you own your home?</label>
            <select required className="input-glass px-3 py-2.5 w-full rounded-full" value={answers.ownsHome} onChange={e => onChange('ownsHome', e.target.value)}>
              <option value="" disabled>Select one</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">3) Square footage of home?</label>
            <select required className="input-glass px-3 py-2.5 w-full rounded-full" value={answers.squareFootage} onChange={e => onChange('squareFootage', e.target.value)}>
              <option value="" disabled>Select a range</option>
              <option>0-1000</option>
              <option>1000-1500</option>
              <option>1500-2000</option>
              <option>2000-3000</option>
              <option>3000-4000</option>
              <option>5000-10000</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">4) How often?</label>
            <select required className="input-glass px-3 py-2.5 w-full rounded-full" value={answers.frequency} onChange={e => onChange('frequency', e.target.value)}>
              <option value="" disabled>Select frequency</option>
              <option>Just Once</option>
              <option>Monthly</option>
              <option>Bi-weekly</option>
              <option>Weekly</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">5) Which is most important?</label>
            <select required className="input-glass px-3 py-2.5 w-full rounded-full" value={answers.priority} onChange={e => onChange('priority', e.target.value)}>
              <option value="" disabled>Select one</option>
              <option>Cheap</option>
              <option>Reliable</option>
              <option>Consistent</option>
              <option>Polite</option>
              <option>Fast</option>
              <option>Risk-Free</option>
            </select>
          </div>
          <div className="pt-2">
            <PillButton type="submit" className="w-full" disabled={submitting}>
              {submitting ? 'Submitting...' : 'Submit'}
            </PillButton>
          </div>
          {error && <div className="text-red-600 text-sm">{error}</div>}
          {success && <div className="text-green-700 text-sm">{success}</div>}
        </form>
      </main>
    </div>
  );
}


