import { supabase } from './supabase';

export const api = {
  // Profiles
  getProfiles: async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  createProfile: async (data) => {
    const { data: result, error } = await supabase
      .from('profiles')
      .insert([data])
      .select()
      .single();
    if (error) throw error;
    return result;
  },

  // Articles/Submissions
  getArticles: async () => {
    const { data, error } = await supabase
      .from('articles')
      .select(`
        *,
        profiles (
          full_name,
          university_affiliation,
          role
        )
      `)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  createArticle: async (data) => {
    const { data: result, error } = await supabase
      .from('articles')
      .insert([data])
      .select()
      .single();
    if (error) throw error;
    return result;
  },

  // Update article
  updateArticle: async (id, data) => {
    const { data: result, error } = await supabase
      .from('articles')
      .update(data)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return result;
  },

  // Delete article
  deleteArticle: async (id) => {
    const { error } = await supabase
      .from('articles')
      .delete()
      .eq('id', id);
    if (error) throw error;
  },
};
