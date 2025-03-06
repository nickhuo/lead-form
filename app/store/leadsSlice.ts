import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { LeadsState, LeadStatus, Lead } from '../types';

const initialState: LeadsState = {
  leads: [],
  loading: false,
  error: null,
  filters: {
    status: 'ALL',
    search: '',
  },
};

export const fetchLeads = createAsyncThunk(
  'leads/fetchLeads',
  async () => {
    const response = await fetch('/api/leads');
    if (!response.ok) {
      throw new Error('Failed to fetch leads');
    }
    return response.json();
  }
);

export const updateLeadStatus = createAsyncThunk(
  'leads/updateStatus',
  async ({ id, status }: { id: string; status: LeadStatus }) => {
    const response = await fetch('/api/leads', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, status }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to update lead status');
    }
    
    return response.json();
  }
);

const leadsSlice = createSlice({
  name: 'leads',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filters.status = action.payload.status;
    },
    setSearch: (state, action) => {
      state.filters.search = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeads.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLeads.fulfilled, (state, action) => {
        state.loading = false;
        state.leads = action.payload;
      })
      .addCase(fetchLeads.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch leads';
      })
      .addCase(updateLeadStatus.fulfilled, (state, action) => {
        const updatedLead = action.payload;
        const index = state.leads.findIndex(lead => lead.id === updatedLead.id);
        if (index !== -1) {
          state.leads[index] = updatedLead;
        }
      });
  },
});

export const { setFilter, setSearch } = leadsSlice.actions;
export default leadsSlice.reducer; 