import React from 'react';
import { LeadFilters } from '../types';

interface Props {
  filters: LeadFilters;
  onChange: (key: keyof LeadFilters, value: string) => void;
}

const Filters: React.FC<Props> = ({ filters, onChange }) => {
  return (
    <div className="flex flex-wrap gap-3 mb-6">
      <input
        type="text"
        placeholder="Search name or email..."
        value={filters.search}
        onChange={(e) => onChange('search', e.target.value)}
        className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm flex-1 min-w-48 bg-white dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <select
        value={filters.status}
        onChange={(e) => onChange('status', e.target.value)}
        className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option value="">All statuses</option>
        {['New', 'Contacted', 'Qualified', 'Lost'].map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>

      <select
        value={filters.source}
        onChange={(e) => onChange('source', e.target.value)}
        className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option value="">All sources</option>
        {['Website', 'Instagram', 'Referral'].map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>

      <select
        value={filters.sort}
        onChange={(e) => onChange('sort', e.target.value)}
        className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option value="latest">Latest first</option>
        <option value="oldest">Oldest first</option>
      </select>
    </div>
  );
};

export default Filters;