'use client';

interface EmptyStateProps {
  title: string;
  description: string;
  action?: React.ReactNode;
}

export default function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      {/* Decorative icon */}
      <div
        style={{
          width: 72,
          height: 72,
          borderRadius: 18,
          background: 'rgba(232,255,71,0.06)',
          border: '1px solid rgba(232,255,71,0.12)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 20,
        }}
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="4" width="18" height="16" rx="3" stroke="rgba(232,255,71,0.5)" strokeWidth="1.5" />
          <path d="M7 9h10M7 13h6" stroke="rgba(232,255,71,0.5)" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>

      <h3
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 22,
          color: 'var(--chalk)',
          marginBottom: 8,
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontSize: 14,
          color: 'var(--chalk-muted)',
          maxWidth: 280,
          lineHeight: 1.6,
          marginBottom: action ? 24 : 0,
        }}
      >
        {description}
      </p>
      {action}
    </div>
  );
}
