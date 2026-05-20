import React from 'react';
import { PaginationMeta } from '../types';

interface Props {
  meta: PaginationMeta;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<Props> = ({ meta, onPageChange }) => {
  const { page, totalPages, total, limit } = meta;
  const from = (page - 1) * limit + 1;
  const to = Math.min(page * limit, total);

  return (
    <div className="flex items-center justify-between mt-6">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Showing {from}–{to} of {total} leads
      </p>
      <div className="flex gap-2">
        <button onClick={() => onPageChange(page - 1)} disabled={page <= 1}
          className="px-3 py-1 text-sm border rounded-lg disabled:opacity-40 dark:border-gray-600 dark:text-gray-300">
          Previous
        </button>
        <span className="px-3 py-1 text-sm text-gray-600 dark:text-gray-300">
          {page} / {totalPages}
        </span>
        <button onClick={() => onPageChange(page + 1)} disabled={page >= totalPages}
          className="px-3 py-1 text-sm border rounded-lg disabled:opacity-40 dark:border-gray-600 dark:text-gray-300">
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;