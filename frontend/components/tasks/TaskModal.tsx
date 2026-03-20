'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X } from 'lucide-react';
import { Task } from '@/types';
import Spinner from '@/components/ui/Spinner';

const schema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(255, 'Title is too long'),
});
type FormValues = z.infer<typeof schema>;

interface TaskModalProps {
  task?: Task | null;         // null = create mode
  loading: boolean;
  onClose: () => void;
  onSubmit: (title: string) => void;
}

export default function TaskModal({ task, loading, onClose, onSubmit }: TaskModalProps) {
  const isEdit = !!task;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { title: task?.title ?? '' },
  });

  useEffect(() => {
    reset({ title: task?.title ?? '' });
  }, [task, reset]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const submit = (values: FormValues) => onSubmit(values.title);

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-box">

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 22,
              color: 'var(--chalk)',
            }}
          >
            {isEdit ? 'Edit task' : 'New task'}
          </h2>
          <button
            onClick={onClose}
            className="btn-ghost"
            style={{ padding: '6px 8px' }}
            aria-label="Close modal"
          >
            <X size={16} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(submit)}>
          <div style={{ marginBottom: 20 }}>
            <label
              style={{
                display: 'block',
                fontSize: 13,
                fontWeight: 500,
                color: 'var(--chalk-muted)',
                marginBottom: 8,
                letterSpacing: '0.03em',
              }}
            >
              TASK TITLE
            </label>
            <input
              {...register('title')}
              className="input-base"
              placeholder="What needs to be done?"
              autoFocus
              disabled={loading}
            />
            {errors.title && (
              <p style={{ color: '#F87171', fontSize: 13, marginTop: 6 }}>
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={onClose}
              className="btn-ghost"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-accent"
              disabled={loading}
              style={{ minWidth: 110 }}
            >
              {loading ? <Spinner size="sm" color="white" /> : isEdit ? 'Save changes' : 'Create task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
