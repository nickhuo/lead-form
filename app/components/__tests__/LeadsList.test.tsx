import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import '@testing-library/jest-dom';
import LeadsList from '../LeadsList';
import leadsReducer from '../../store/leadsSlice';
import authReducer from '../../store/authSlice';

// Extend Jest matchers
declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
    }
  }
}

// Create a mock store for testing
const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      leads: leadsReducer,
      auth: authReducer,
    },
    preloadedState: initialState,
  });
};

describe('LeadsList', () => {
  it('shows login message when not authenticated', () => {
    const store = createMockStore({
      auth: { isAuthenticated: false, user: null },
      leads: { leads: [], loading: false, error: null, filters: { status: 'ALL', search: '' } },
    });

    render(
      <Provider store={store}>
        <LeadsList />
      </Provider>
    );

    expect(screen.getByText('Please log in to view leads.')).toBeInTheDocument();
  });

  it('shows leads when authenticated', async () => {
    const store = createMockStore({
      auth: { isAuthenticated: true, user: { id: '1', email: 'test@test.com', name: 'Test User', role: 'ADMIN' } },
      leads: {
        leads: [
          {
            id: '1',
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@example.com',
            countryOfCitizenship: 'United States',
            status: 'PENDING',
            submittedAt: '2024-02-02T14:45:00Z',
          },
        ],
        loading: false,
        error: null,
        filters: { status: 'ALL', search: '' },
      },
    });

    render(
      <Provider store={store}>
        <LeadsList />
      </Provider>
    );

    await waitFor(() => {
      const nameCell = screen.getByText((content, element) => {
        return element?.tagName.toLowerCase() === 'div' && 
               element?.textContent === 'John Doe';
      });
      expect(nameCell).toBeInTheDocument();
      expect(screen.getByText('john@example.com')).toBeInTheDocument();
      expect(screen.getByText('PENDING')).toBeInTheDocument();
    });
  });

  it('filters leads by search term', async () => {
    const store = createMockStore({
      auth: { isAuthenticated: true, user: { id: '1', email: 'test@test.com', name: 'Test User', role: 'ADMIN' } },
      leads: {
        leads: [
          {
            id: '1',
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@example.com',
            countryOfCitizenship: 'United States',
            status: 'PENDING',
            submittedAt: '2024-02-02T14:45:00Z',
          },
          {
            id: '2',
            firstName: 'Jane',
            lastName: 'Smith',
            email: 'jane@example.com',
            countryOfCitizenship: 'Canada',
            status: 'PENDING',
            submittedAt: '2024-02-02T14:45:00Z',
          },
        ],
        loading: false,
        error: null,
        filters: { status: 'ALL', search: '' },
      },
    });

    render(
      <Provider store={store}>
        <LeadsList />
      </Provider>
    );

    // Wait for the component to finish loading and render the search input
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    // Use the search input
    const searchInput = screen.getByRole('textbox');
    await act(async () => {
      fireEvent.change(searchInput, { target: { value: 'john' } });
    });

    // Wait for the filtered results
    await waitFor(() => {
      const johnCell = screen.getByText((content, element) => {
        return element?.tagName.toLowerCase() === 'div' && 
               element?.textContent === 'John Doe';
      });
      expect(johnCell).toBeInTheDocument();
      
      const janeCell = screen.queryByText((content, element) => {
        return element?.tagName.toLowerCase() === 'div' && 
               element?.textContent === 'Jane Smith';
      });
      expect(janeCell).not.toBeInTheDocument();
    });
  });
}); 