// Simple localStorage-backed store for auth, questionnaire and profile.
// No backend yet — keeps everything local for a calm, no-friction experience.

export type Answers = Record<string, string | string[]>;

export interface Profile {
  name: string;
  phone: string;
  city: string;
  state: string;
  birthdate: string;
  about: string;
  education: { course: string; institution: string; year: string }[];
  experiences: { role: string; company: string; period: string; description: string }[];
  skills: string[];
}

const KEYS = {
  auth: "cs.auth",
  answers: "cs.answers",
  profile: "cs.profile",
} as const;

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new Event("cs.update"));
}

export const store = {
  isAuthed: () => read<{ email: string } | null>(KEYS.auth, null) !== null,
  getUser: () => read<{ email: string } | null>(KEYS.auth, null),
  login: (email: string) => write(KEYS.auth, { email }),
  logout: () => {
    if (typeof window !== "undefined") localStorage.removeItem(KEYS.auth);
    window.dispatchEvent(new Event("cs.update"));
  },
  getAnswers: () => read<Answers>(KEYS.answers, {}),
  setAnswers: (a: Answers) => write(KEYS.answers, a),
  hasCompletedQuiz: () => {
    const a = read<Answers>(KEYS.answers, {});
    return Object.keys(a).length >= 12;
  },
  getProfile: () =>
    read<Profile>(KEYS.profile, {
      name: "",
      phone: "",
      city: "",
      state: "",
      birthdate: "",
      about: "",
      education: [],
      experiences: [],
      skills: [],
    }),
  setProfile: (p: Profile) => write(KEYS.profile, p),
};

import { useEffect, useState } from "react";

export function useStoreSync<T>(get: () => T): T {
  const [v, setV] = useState<T>(get);
  useEffect(() => {
    const update = () => setV(get());
    window.addEventListener("cs.update", update);
    window.addEventListener("storage", update);
    return () => {
      window.removeEventListener("cs.update", update);
      window.removeEventListener("storage", update);
    };
  }, []);
  return v;
}
