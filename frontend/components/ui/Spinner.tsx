'use client';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'accent' | 'white';
}

const sizes = { sm: 16, md: 22, lg: 32 };

export default function Spinner({ size = 'md', color = 'accent' }: SpinnerProps) {
  const px = sizes[size];
  const stroke = color === 'accent' ? '#E8FF47' : '#F5F4F0';

  return (
    <svg
      width={px}
      height={px}
      viewBox="0 0 24 24"
      fill="none"
      style={{ animation: 'spin 0.75s linear infinite' }}
    >
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      <circle cx="12" cy="12" r="10" stroke={stroke} strokeWidth="2.5" strokeOpacity="0.2" />
      <path
        d="M12 2a10 10 0 0 1 10 10"
        stroke={stroke}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
