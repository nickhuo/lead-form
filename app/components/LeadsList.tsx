'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { fetchLeads, updateLeadStatus, setFilter, setSearch } from '../store/leadsSlice';
import { Lead, LeadStatus } from '../types';

const STATUS_STYLES = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  REACHED_OUT: 'bg-blue-100 text-blue-800',
  CLOSED: 'bg-green-100 text-green-800',
} as const;

export default function LeadsList() {
  const dispatch = useDispatch();
  const { leads, loading, filters } = useSelector((state: RootState) => state.leads);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchLeads());
    }
  }, [dispatch, isAuthenticated]);

  const handleStatusChange = async (id: string, status: LeadStatus) => {
    await dispatch(updateLeadStatus({ id, status }));
  };

  const getNextStatus = (currentStatus: LeadStatus): LeadStatus | null => {
    switch (currentStatus) {
      case 'PENDING':
        return 'REACHED_OUT';
      case 'REACHED_OUT':
        return 'CLOSED';
      default:
        return null;
    }
  };

  const getActionButton = (lead: Lead) => {
    const nextStatus = getNextStatus(lead.status);
    if (!nextStatus) return null;

    const buttonText = nextStatus === 'REACHED_OUT' ? 'Mark as Reached Out' : 'Mark as Closed';
    
    return (
      <button
        onClick={() => handleStatusChange(lead.id, nextStatus)}
        className="text-blue-600 hover:text-blue-900 font-medium"
      >
        {buttonText}
      </button>
    );
  };

  const filteredLeads = leads.filter((lead) => {
    const matchesStatus = filters.status === 'ALL' || lead.status === filters.status;
    const matchesSearch = lead.firstName.toLowerCase().includes(filters.search.toLowerCase()) ||
      lead.lastName.toLowerCase().includes(filters.search.toLowerCase()) ||
      lead.email.toLowerCase().includes(filters.search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  if (!isAuthenticated) {
    return <div>Please log in to view leads.</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Leads</h1>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search leads..."
            className="px-4 py-2 border rounded-lg"
            value={filters.search}
            onChange={(e) => dispatch(setSearch(e.target.value))}
          />
          <select
            className="px-4 py-2 border rounded-lg"
            value={filters.status}
            onChange={(e) => dispatch(setFilter({ status: e.target.value as LeadStatus | 'ALL' }))}
          >
            <option value="ALL">All Status</option>
            <option value="PENDING">Pending</option>
            <option value="REACHED_OUT">Reached Out</option>
            <option value="CLOSED">Closed</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Visa Interest</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Country</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLeads.map((lead: Lead) => (
                <tr key={lead.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{lead.firstName} {lead.lastName}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{lead.email}</div>
                    <a 
                      href={lead.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:text-blue-900"
                    >
                      LinkedIn Profile
                    </a>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {lead.visaInterest.join(', ')}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {lead.countryOfCitizenship}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      STATUS_STYLES[lead.status as LeadStatus]
                    }`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {getActionButton(lead)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 