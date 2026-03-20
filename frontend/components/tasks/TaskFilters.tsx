'use client';

import { useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { TaskFilters } from '@/types';

interface Props {
  filters: TaskFilters;
  onChange: (patch: Partial<TaskFilters>) => void;
}

const STATUS_TABS: Array<{ label: string; value: TaskFilters['status'] }> = [
  { label: 'All',       value: '' },
  { label: 'Pending',   value: 'pending' },
  { label: 'Completed', value: 'completed' },
];

export default function TaskFiltersBar({ filters, onChange }: Props) {
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSearch = (val: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      onChange({ search: val, page: 1 });
    }, 350);
  };

  useEffect(() => () => { if (debounceRef.current) clearTimeout(debounceRef.current); }, []);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
        marginBottom: 24,
      }}
    >
      {/* Search */}
      <div style={{ position: 'relative' }}>
        <Search
          size={16}
          style={{
            position: 'absolute',
            left: 14,
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--ink-faint)',
            pointerEvents: 'none',
          }}
        />
        <input
          className="input-base"
          style={{ paddingLeft: 40, paddingRight: filters.search ? 40 : 16 }}
          placeholder="Search tasks…"
          defaultValue={filters.search}
          onChange={(e) => handleSearch(e.target.value)}
        />
        {filters.search && (
          <button
            onClick={() => onChange({ search: '', page: 1 })}
            aria-label="Clear search"
            style={{
              position: 'absolute',
              right: 12,
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              color: 'var(--ink-faint)',
              cursor: 'pointer',
              padding: 2,
              display: 'flex',
            }}
          >
            <X size={15} />
          </button>
        )}
      </div>

      {/* Status tabs */}
      <div
        style={{
          display: 'inline-flex',
          background: 'rgba(255,255,255,0.04)',
          borderRadius: 10,
          padding: 3,
          gap: 2,
          alignSelf: 'flex-start',
        }}
      >
        {STATUS_TABS.map((tab) => {
          const active = filters.status === tab.value;
          return (
            <button
              key={tab.value}
              onClick={() => onChange({ status: tab.value, page: 1 })}
              style={{
                padding: '7px 16px',
                borderRadius: 8,
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'var(--font-body)',
                fontSize: 13,
                fontWeight: active ? 600 : 400,
                transition: 'all 0.15s',
                background: active ? 'var(--accent)' : 'transparent',
                color: active ? 'var(--ink)' : 'var(--chalk-muted)',
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
