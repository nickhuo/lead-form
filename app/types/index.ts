export type LeadStatus = 'PENDING' | 'REACHED_OUT' | 'CLOSED';

export interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  countryOfCitizenship: string;
  linkedin: string;
  resumeUrl: string;
  visaInterest: string[];
  message: string;
  status: LeadStatus;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'ADMIN' | 'USER';
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}

export interface LeadsState {
  leads: Lead[];
  loading: boolean;
  error: string | null;
  filters: {
    status: LeadStatus | 'ALL';
    search: string;
  };
} 