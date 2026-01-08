/**
 * API client for backend communication
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

class ApiClient {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.token = localStorage.getItem('auth_token');
  }

  setToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem('auth_token', token);
    } else {
      localStorage.removeItem('auth_token');
    }
  }

  getToken() {
    return this.token || localStorage.getItem('auth_token');
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const token = this.getToken();
    
    const config = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Request failed' }));
        throw new Error(error.error || `HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request error:', error);
      throw error;
    }
  }

  // Auth endpoints
  async register(email, password, username) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, username }),
    });
  }

  async login(email, password) {
    const data = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    if (data.access_token) {
      this.setToken(data.access_token);
    }
    return data;
  }

  async logout() {
    await this.request('/auth/logout', { method: 'POST' });
    this.setToken(null);
  }

  async getCurrentUser() {
    return this.request('/auth/me');
  }

  // User endpoints
  async getUsers() {
    return this.request('/users');
  }

  async getUserApplications() {
    return this.request('/users/applications');
  }

  async submitApplication(requested_role, reason) {
    return this.request('/users/applications', {
      method: 'POST',
      body: JSON.stringify({ requested_role, reason }),
    });
  }

  async approveApplication(id) {
    return this.request(`/users/applications/${id}/approve`, {
      method: 'POST',
    });
  }

  async rejectApplication(id, rejection_reason) {
    return this.request(`/users/applications/${id}/reject`, {
      method: 'POST',
      body: JSON.stringify({ rejection_reason }),
    });
  }

  // Event endpoints
  async getEvents(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/events${queryString ? '?' + queryString : ''}`);
  }

  async getEvent(id) {
    return this.request(`/events/${id}`);
  }

  async createEvent(eventData) {
    return this.request('/events', {
      method: 'POST',
      body: JSON.stringify(eventData),
    });
  }

  async approveEvent(id) {
    return this.request(`/events/${id}/approve`, {
      method: 'POST',
    });
  }

  async rejectEvent(id, reason) {
    return this.request(`/events/${id}/reject`, {
      method: 'POST',
      body: JSON.stringify({ reason }),
    });
  }

  async revertEvent(id) {
    return this.request(`/events/${id}/revert`, {
      method: 'POST',
    });
  }

  async addEventComment(eventId, text) {
    return this.request(`/events/${eventId}/comments`, {
      method: 'POST',
      body: JSON.stringify({ text }),
    });
  }

  // Nation endpoints
  async getNations() {
    return this.request('/nations');
  }

  async getNation(id) {
    return this.request(`/nations/${id}`);
  }

  async createNation(nationData) {
    return this.request('/nations', {
      method: 'POST',
      body: JSON.stringify(nationData),
    });
  }

  async updateNation(id, nationData) {
    return this.request(`/nations/${id}`, {
      method: 'PUT',
      body: JSON.stringify(nationData),
    });
  }

  // Message endpoints
  async getMessages() {
    return this.request('/messages');
  }

  async getMessage(id) {
    return this.request(`/messages/${id}`);
  }

  async sendMessage(recipient_id, subject, body, thread_id) {
    return this.request('/messages', {
      method: 'POST',
      body: JSON.stringify({ recipient_id, subject, body, thread_id }),
    });
  }

  async markMessageRead(id) {
    return this.request(`/messages/${id}/read`, {
      method: 'PUT',
    });
  }

  // Notification endpoints
  async getNotifications(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/notifications${queryString ? '?' + queryString : ''}`);
  }

  async markNotificationRead(id) {
    return this.request(`/notifications/${id}/read`, {
      method: 'PUT',
    });
  }

  async markAllNotificationsRead() {
    return this.request('/notifications/read-all', {
      method: 'PUT',
    });
  }
}

export const api = new ApiClient();
