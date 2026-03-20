'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Pagination as PaginationType } from '@/types';

interface Props {
  pagination: PaginationType;
  onPageChange: (page: number) => void;
}

export default function Pagination({ pagination, onPageChange }: Props) {
  const { page, totalPages, total, limit } = pagination;

  if (totalPages <= 1) return null;

  const from = (page - 1) * limit + 1;
  const to = Math.min(page * limit, total);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 24,
        paddingTop: 20,
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <span
        style={{
          fontSize: 13,
          color: 'var(--ink-faint)',
          fontFamily: 'var(--font-mono)',
        }}
      >
        {from}–{to} of {total}
      </span>

      <div style={{ display: 'flex', gap: 6 }}>
        <button
          className="btn-ghost"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          style={{ padding: '7px 12px', opacity: page <= 1 ? 0.4 : 1 }}
          aria-label="Previous page"
        >
          <ChevronLeft size={16} />
        </button>

        {/* Page numbers */}
        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
          .reduce<(number | string)[]>((acc, p, idx, arr) => {
            if (idx > 0 && (p as number) - (arr[idx - 1] as number) > 1) acc.push('…');
            acc.push(p);
            return acc;
          }, [])
          .map((p, idx) =>
            p === '…' ? (
              <span
                key={`ellipsis-${idx}`}
                style={{
                  padding: '7px 4px',
                  color: 'var(--ink-faint)',
                  fontSize: 13,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {p}
              </span>
            ) : (
              <button
                key={p}
                className="btn-ghost"
                onClick={() => onPageChange(p as number)}
                style={{
                  padding: '7px 13px',
                  background: p === page ? 'var(--accent)' : undefined,
                  color: p === page ? 'var(--ink)' : undefined,
                  borderColor: p === page ? 'var(--accent)' : undefined,
                  fontWeight: p === page ? 600 : 400,
                  fontSize: 13,
                }}
              >
                {p}
              </button>
            )
          )}

        <button
          className="btn-ghost"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          style={{ padding: '7px 12px', opacity: page >= totalPages ? 0.4 : 1 }}
          aria-label="Next page"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
