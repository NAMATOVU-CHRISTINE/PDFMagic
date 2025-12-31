const API_BASE = '/api';

export const api = {
  async post(endpoint: string, data: FormData): Promise<Blob> {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      method: 'POST',
      body: data,
    });
    if (!response.ok) throw new Error('Request failed');
    return response.blob();
  },

  async get(endpoint: string): Promise<unknown> {
    const response = await fetch(`${API_BASE}${endpoint}`);
    if (!response.ok) throw new Error('Request failed');
    return response.json();
  },
};

export default api;
