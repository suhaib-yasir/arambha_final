const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

export interface ContactMessage {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export const sendContactMessage = async (messageData: ContactMessage) => {
  const response = await fetch(`${API_URL}/api/contact`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(messageData),
  });

  if (!response.ok) {
    throw new Error('Failed to send message');
  }

  return response.json();
};

export const getContacts = async () => {
  const response = await fetch(`${API_URL}/api/contacts`);
  if (!response.ok) {
    throw new Error('Failed to fetch contact messages');
  }
  return response.json();
};
