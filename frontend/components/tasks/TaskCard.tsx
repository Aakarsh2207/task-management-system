'use client';

import { useState } from 'react';
import { Check, Pencil, Trash2, Clock } from 'lucide-react';
import { Task } from '@/types';
import Spinner from '@/components/ui/Spinner';

interface TaskCardProps {
  task: Task;
  actionLoading: string | null;
  onToggle: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export default function TaskCard({
  task,
  actionLoading,
  onToggle,
  onEdit,
  onDelete,
}: TaskCardProps) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const isLoading = actionLoading === task.id;
  const isDone = task.status === 'completed';

  const handleDelete = () => {
    if (confirmDelete) {
      onDelete(task.id);
      setConfirmDelete(false);
    } else {
      setConfirmDelete(true);
      setTimeout(() => setConfirmDelete(false), 3000);
    }
  };

  return (
    <div className={`task-card ${isDone ? 'completed' : ''}`}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>

        {/* Toggle checkbox */}
        <button
          onClick={() => onToggle(task.id)}
          disabled={isLoading}
          aria-label="Toggle status"
          style={{
            flexShrink: 0,
            marginTop: 2,
            width: 22,
            height: 22,
            borderRadius: 6,
            border: isDone
              ? '2px solid var(--completed)'
              : '2px solid rgba(255,255,255,0.2)',
            background: isDone ? 'var(--completed)' : 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s',
            padding: 0,
          }}
        >
          {isLoading ? (
            <Spinner size="sm" color="white" />
          ) : isDone ? (
            <Check size={13} color="#0A0A0F" strokeWidth={3} />
          ) : null}
        </button>

        {/* Content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p
            style={{
              fontSize: 15,
              fontWeight: 500,
              color: isDone ? 'var(--chalk-muted)' : 'var(--chalk)',
              textDecoration: isDone ? 'line-through' : 'none',
              marginBottom: 8,
              lineHeight: 1.4,
              wordBreak: 'break-word',
            }}
          >
            {task.title}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <span className={`badge badge-${task.status}`}>
              {task.status}
            </span>
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                fontSize: 12,
                color: 'var(--ink-faint)',
                fontFamily: 'var(--font-mono)',
              }}
            >
              <Clock size={11} />
              {new Date(task.createdAt).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
          <button
            onClick={() => onEdit(task)}
            disabled={isLoading}
            className="btn-ghost"
            style={{ padding: '6px 10px' }}
            aria-label="Edit task"
          >
            <Pencil size={14} />
          </button>

          <button
            onClick={handleDelete}
            disabled={isLoading}
            aria-label={confirmDelete ? 'Confirm delete' : 'Delete task'}
            style={{
              padding: '6px 10px',
              borderRadius: 8,
              border: confirmDelete
                ? '1px solid rgba(248,113,113,0.4)'
                : '1px solid rgba(255,255,255,0.08)',
              background: confirmDelete
                ? 'rgba(248,113,113,0.12)'
                : 'rgba(255,255,255,0.05)',
              color: confirmDelete ? '#F87171' : 'var(--chalk-muted)',
              cursor: 'pointer',
              transition: 'all 0.15s',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              fontSize: 12,
              fontFamily: 'var(--font-body)',
            }}
          >
            <Trash2 size={14} />
            {confirmDelete && <span>Sure?</span>}
          </button>
        </div>
      </div>
    </div>
  );
}
