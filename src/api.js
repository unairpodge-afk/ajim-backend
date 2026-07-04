const API_BASE = 'http://localhost:5000/api';

export const api = {
  // Profiles
  getProfiles: async () => {
    const res = await fetch(`${API_BASE}/profiles`);
    if (!res.ok) throw new Error('Failed to fetch profiles');
    return res.json();
  },

  createProfile: async (data) => {
    const res = await fetch(`${API_BASE}/profiles`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create profile');
    return res.json();
  },

  // Articles/Submissions
  getArticles: async () => {
    const res = await fetch(`${API_BASE}/submissions`);
    if (!res.ok) throw new Error('Failed to fetch articles');
    return res.json();
  },

  createArticle: async (data) => {
    const res = await fetch(`${API_BASE}/submissions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create article');
    return res.json();
  },
};
