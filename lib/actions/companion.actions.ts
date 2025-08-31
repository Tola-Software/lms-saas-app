"use server";
import { auth } from "@clerk/nextjs/server";
import { createSupabaseClient } from "@/lib/supabase";

export const createCompanion = async (formData: CreateCompanion) => {
  const { userId: author } = await auth();
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("companions")
    .insert({ ...formData, author })
    .select();

  if (error || !data) throw new Error(error?.message || "Failed to create a companion");

  return data[0];
};

export const getAllCompanions = async ({ limit = 10, page = 1, subject, topic }: GetAllCompanions) => {
  const supabase = createSupabaseClient();

  let query = supabase.from("companions").select();

  // Normalize parameters to strings and check if they have actual values
  const subjectValue = Array.isArray(subject) ? subject[0] : subject;
  const topicValue = Array.isArray(topic) ? topic[0] : topic;

  const hasSubjectFilter = subjectValue && subjectValue.trim() !== "" && subjectValue !== "all";
  const hasTopicFilter = topicValue && topicValue.trim() !== "";

  if (hasSubjectFilter && hasTopicFilter) {
    query = query.ilike("subject", `%${subjectValue}%`).or(`topic.ilike.%${topicValue}%, name.ilike.%${topicValue}%`);
  } else if (hasSubjectFilter) {
    query = query.ilike("subject", `%${subjectValue}%`);
  } else if (hasTopicFilter) {
    query = query.ilike("topic", `%${topicValue}%`);
  }

  query = query.range((page - 1) * limit, page * limit - 1);

  const { data: companions, error } = await query;
  if (error) throw new Error(error.message);

  return companions;
};

export const getCompanion = async (id: string) => {
  const supabase = createSupabaseClient();

  const { data, error } = await supabase.from("companions").select().eq("id", id);

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }

  if (!data || data.length === 0) {
    throw new Error("Companion not found");
  }

  console.log(data[0], "companion data");
  return data[0];
};

export const addToSessionHistory = async (companionId: string) => {
  const { userId } = await auth();
  const supabase = createSupabaseClient();
  const { data, error } = await supabase.from("session_history").insert({
    companion_id: companionId,
    user_id: userId,
  });

  if (error) throw new Error(error.message);
  return data;
};

export const getRecentSessions = async (limit = 10) => {
  const supabase = createSupabaseClient();

  // Get unique companions from recent sessions using DISTINCT
  const { data, error } = await supabase
    .from("session_history")
    .select(
      `
      companion_id,
      companions!inner(*)
    `
    )
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  // Extract unique companions
  const seenIds = new Set();
  const uniqueCompanions = [];

  for (const session of data) {
    if (session.companions && !seenIds.has(session.companion_id)) {
      seenIds.add(session.companion_id);
      uniqueCompanions.push(session.companions);
      if (uniqueCompanions.length >= limit) break;
    }
  }

  return uniqueCompanions;
};

export const getUserSessions = async (userId: string, limit = 10) => {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("session_history")
    .select(
      `
      companion_id,
      companions!inner(*)
    `
    )
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  // Extract unique companions
  const seenIds = new Set();
  const uniqueCompanions = [];

  for (const session of data) {
    if (session.companions && !seenIds.has(session.companion_id)) {
      seenIds.add(session.companion_id);
      uniqueCompanions.push(session.companions);
      if (uniqueCompanions.length >= limit) break;
    }
  }

  return uniqueCompanions;
};

export const getUserCompanions = async (userId: string) => {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase.from("companions").select().eq("author", userId);

  if (error) throw new Error(error.message);

  return data;
};
