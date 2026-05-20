import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLeads } from '../hooks/useLeads';
import Filters from '../components/Filters';
import LeadForm from '../components/LeadForm';
import Pagination from '../components/Pagination';
import { Lead, LeadFilters } from '../types';
import { createLead, updateLead, deleteLead, exportLeadsCSV } from '../api/leads.api';

const statusColors: Record<string, string> = {
  New: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  Contacted: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  Qualified: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  Lost: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
};

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const { leads, meta, isLoading, error, filters, updateFilter, reload } = useLeads();
  const [showForm, setShowForm] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  const handleExport = async () => {
    const res = await exportLeadsCSV();
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const a = document.createElement('a');
    a.href = url;
    a.download = 'leads.csv';
    a.click();
  };

  const handleCreate = async (data: Partial<Lead>) => {
    await createLead(data);
    setShowForm(false);
    reload();
  };

  const handleUpdate = async (data: Partial<Lead>) => {
    if (!editingLead) return;
    await updateLead(editingLead._id, data);
    setEditingLead(null);
    reload();
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this lead?')) return;
    await deleteLead(id);
    reload();
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Smart leads dashboard</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">{user?.name} · {user?.role}</p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setDarkMode(!darkMode)}
              className="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg dark:text-gray-300">
              {darkMode ? '☀️ Light' : '🌙 Dark'}
            </button>
            <button onClick={handleExport}
              className="px-3 py-2 text-sm bg-green-600 hover:bg-green-700 text-white rounded-lg">
              Export CSV
            </button>
            <button onClick={() => setShowForm(true)}
              className="px-3 py-2 text-sm bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg">
              + New lead
            </button>
            <button onClick={logout}
              className="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-300">
              Logout
            </button>
          </div>
        </div>

        {/* Filters */}
        <Filters filters={filters} onChange={(key, val) => updateFilter(key as keyof LeadFilters, val)} />

        {/* States */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-4 text-red-700 dark:text-red-300 text-sm">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center py-16">
            <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : leads.length === 0 ? (
          <div className="text-center py-16 text-gray-400 dark:text-gray-500">
            <p className="text-4xl mb-3">📋</p>
            <p className="text-lg font-medium">No leads found</p>
            <p className="text-sm">Try adjusting your filters or add a new lead</p>
          </div>
        ) : (
          <>
            {/* Leads table */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-xs uppercase">
                  <tr>
                    {['Name', 'Email', 'Status', 'Source', 'Created', 'Actions'].map((h) => (
                      <th key={h} className="px-4 py-3 text-left font-medium">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {leads.map((lead) => (
                    <tr key={lead._id} className="hover:bg-gray-50 dark:hover:bg-gray-750">
                      <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{lead.name}</td>
                      <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{lead.email}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[lead.status]}`}>
                          {lead.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{lead.source}</td>
                      <td className="px-4 py-3 text-gray-500 dark:text-gray-400">
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button onClick={() => setEditingLead(lead)}
                            className="text-indigo-600 dark:text-indigo-400 hover:underline text-xs">
                            Edit
                          </button>
                          {user?.role === 'admin' && (
                            <button onClick={() => handleDelete(lead._id)}
                              className="text-red-500 hover:underline text-xs">
                              Delete
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {meta && <Pagination meta={meta} onPageChange={(p) => updateFilter('page', p)} />}
          </>
        )}

        {/* Modals */}
        {showForm && <LeadForm onSubmit={handleCreate} onCancel={() => setShowForm(false)} />}
        {editingLead && (
          <LeadForm initial={editingLead} onSubmit={handleUpdate} onCancel={() => setEditingLead(null)} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;