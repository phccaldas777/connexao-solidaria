// Supabase-backed store. Mantém uma API simples para os componentes
// e usa um pequeno hook de sincronização para refletir mudanças reativamente.

import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Session, User } from "@supabase/supabase-js";

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

const emptyProfile = (): Profile => ({
  name: "",
  phone: "",
  city: "",
  state: "",
  birthdate: "",
  about: "",
  education: [],
  experiences: [],
  skills: [],
});

// ---------- Auth hook ----------
export function useAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // listener primeiro
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
      setLoading(false);
    });
    // depois sessão atual
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  return {
    session,
    user: session?.user ?? null,
    isAuthed: !!session?.user,
    loading,
  };
}

// ---------- Auth actions ----------
export const auth = {
  async signUp(email: string, password: string) {
    const redirectTo =
      typeof window !== "undefined" ? `${window.location.origin}/home` : undefined;
    return supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: redirectTo },
    });
  },
  async signIn(email: string, password: string) {
    return supabase.auth.signInWithPassword({ email, password });
  },
  async signOut() {
    return supabase.auth.signOut();
  },
};

// ---------- Profile ----------
export async function fetchProfile(userId: string): Promise<Profile> {
  const { data, error } = await supabase
    .from("profiles")
    .select("name, phone, city, state, birthdate, about, education, experiences, skills")
    .eq("id", userId)
    .maybeSingle();
  if (error || !data) return emptyProfile();
  return {
    name: data.name ?? "",
    phone: data.phone ?? "",
    city: data.city ?? "",
    state: data.state ?? "",
    birthdate: data.birthdate ?? "",
    about: data.about ?? "",
    education: (data.education as Profile["education"]) ?? [],
    experiences: (data.experiences as Profile["experiences"]) ?? [],
    skills: (data.skills as string[]) ?? [],
  };
}

export async function saveProfile(userId: string, p: Profile) {
  const { error } = await supabase
    .from("profiles")
    .update({
      name: p.name,
      phone: p.phone,
      city: p.city,
      state: p.state,
      birthdate: p.birthdate,
      about: p.about,
      education: p.education,
      experiences: p.experiences,
      skills: p.skills,
    })
    .eq("id", userId);
  if (error) throw error;
}

// ---------- Quiz answers ----------
export async function fetchAnswers(userId: string): Promise<{ answers: Answers; completed: boolean }> {
  const { data, error } = await supabase
    .from("quiz_answers")
    .select("answers, completed")
    .eq("user_id", userId)
    .maybeSingle();
  if (error || !data) return { answers: {}, completed: false };
  return {
    answers: (data.answers as Answers) ?? {},
    completed: !!data.completed,
  };
}

export async function saveAnswers(userId: string, answers: Answers, completed = false) {
  const { error } = await supabase
    .from("quiz_answers")
    .upsert(
      { user_id: userId, answers, completed },
      { onConflict: "user_id" }
    );
  if (error) throw error;
}

// ---------- Reactive helpers ----------
export function useProfile(user: User | null) {
  const [profile, setProfile] = useState<Profile>(emptyProfile);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!user) {
      setProfile(emptyProfile());
      setLoading(false);
      return;
    }
    setLoading(true);
    fetchProfile(user.id).then((p) => {
      setProfile(p);
      setLoading(false);
    });
  }, [user?.id]);
  return { profile, setProfile, loading };
}

export function useAnswers(user: User | null) {
  const [answers, setAnswers] = useState<Answers>({});
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!user) {
      setAnswers({});
      setCompleted(false);
      setLoading(false);
      return;
    }
    setLoading(true);
    fetchAnswers(user.id).then(({ answers, completed }) => {
      setAnswers(answers);
      setCompleted(completed);
      setLoading(false);
    });
  }, [user?.id]);
  return { answers, setAnswers, completed, setCompleted, loading };
}
