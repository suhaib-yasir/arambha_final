const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

export interface Career {
  id: string;
  title: string;
  department: string;
  location: string;
  experience: string;
  salary: string;
  description: string;
  image: string;
  badge?: string;
  createdAt?: string;
}

export const getCareers = async (): Promise<Career[]> => {
  const response = await fetch(`${API_URL}/api/careers`);
  if (!response.ok) {
    throw new Error('Failed to fetch careers');
  }
  return response.json();
};

export const createCareer = async (careerData: Partial<Career>): Promise<{ success: boolean; id: string }> => {
  const formData = new FormData();
  Object.keys(careerData).forEach(key => {
    const value = (careerData as any)[key];
    if (value !== undefined && value !== null) {
      formData.append(key, value);
    }
  });

  const response = await fetch(`${API_URL}/api/careers`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to create career');
  }
  return response.json();
};

export const deleteCareer = async (id: string): Promise<{ success: boolean }> => {
  const response = await fetch(`${API_URL}/api/careers/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete career');
  }
  return response.json();
};

export const applyForJob = async (applicationData: any): Promise<{ success: boolean; id: string }> => {
  const formData = new FormData();
  Object.keys(applicationData).forEach(key => {
    const value = applicationData[key];
    if (value !== undefined && value !== null) {
      // Map frontend camelCase to backend snake_case if necessary, 
      // but here I'll just append as is since backend expects specific Form fields
      const backendKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
      formData.append(backendKey, value);
    }
  });

  const response = await fetch(`${API_URL}/api/careers/apply`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to submit application: ${errorText}`);
  }
  return response.json();
};

export const getStats = async (): Promise<{ total_enrollments: number; total_applications: number; total_contacts: number }> => {
  const response = await fetch(`${API_URL}/api/stats`);
  if (!response.ok) {
    return { total_enrollments: 0, total_applications: 0, total_contacts: 0 };
  }
  return response.json();
};

export const getApplications = async () => {
  const response = await fetch(`${API_URL}/api/careers/applications`);
  if (!response.ok) {
    throw new Error('Failed to fetch job applications');
  }
  return response.json();
};
