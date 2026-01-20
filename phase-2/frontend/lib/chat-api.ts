import { ChatRequest, ChatResponse } from '@/lib/types';
import { mockSendChatMessage, mockGetConversationHistory, mockGetConversations } from '@/lib/mockChatApi';

// Point to backend server
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8001/api';

class ChatApiClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  private getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    const token = this.getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  }

  async sendMessage(userId: string, message: string, conversationId?: string): Promise<ChatResponse> {
    // Ensure the base URL ends with '/api' if it doesn't already
    let apiUrl = this.baseUrl;
    if (!apiUrl.endsWith('/api')) {
      apiUrl = apiUrl + '/api';
    }

    const url = `${apiUrl}/${userId}/chat`;
    const headers = this.getHeaders();
    console.log('Chat API Request:', { url, userId, conversationId, headers }); // Enhanced debug log

    const requestBody: ChatRequest = {
      message,
      conversation_id: conversationId,
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(requestBody),
        cache: 'no-store',
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Chat API Error Response:', {
          status: response.status,
          statusText: response.statusText,
          body: errorText
        });
        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch (e) {
          errorData = { detail: errorText };
        }
        throw new Error(errorData.detail || errorData.message || `Chat API request failed: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Chat API Fetch Error:', error);
      // Don't fall back to mock implementation - let the error propagate
      throw error;
    }
  }

  async getConversationHistory(userId: string, conversationId: string): Promise<ChatResponse[]> {
    // Ensure the base URL ends with '/api' if it doesn't already
    let apiUrl = this.baseUrl;
    if (!apiUrl.endsWith('/api')) {
      apiUrl = apiUrl + '/api';
    }

    const url = `${apiUrl}/${userId}/chat/${conversationId}`;
    const headers = this.getHeaders();

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: headers,
        cache: 'no-store',
      });

      if (!response.ok) {
        const errorText = await response.text();
        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch (e) {
          errorData = { detail: errorText };
        }
        throw new Error(errorData.detail || errorData.message || `Chat API request failed: ${response.status}`);
      }

      const data = await response.json();
      return Array.isArray(data) ? data : [data];
    } catch (error) {
      console.error('Chat API Fetch Error:', error);
      throw error;
    }
  }

  async getConversations(userId: string): Promise<any[]> {
    // Ensure the base URL ends with '/api' if it doesn't already
    let apiUrl = this.baseUrl;
    if (!apiUrl.endsWith('/api')) {
      apiUrl = apiUrl + '/api';
    }

    const url = `${apiUrl}/${userId}/chats`; // Assuming endpoint for getting all conversations
    const headers = this.getHeaders();

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: headers,
        cache: 'no-store',
      });

      if (!response.ok) {
        const errorText = await response.text();
        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch (e) {
          errorData = { detail: errorText };
        }
        throw new Error(errorData.detail || errorData.message || `Chat API request failed: ${response.status}`);
      }

      const data = await response.json();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('Chat API Fetch Error:', error);
      throw error;
    }
  }
}

// Create a singleton instance
export const chatApiClient = new ChatApiClient();

// Export individual methods for convenience
export const sendChatMessage = chatApiClient.sendMessage.bind(chatApiClient);