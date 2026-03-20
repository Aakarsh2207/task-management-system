"use client";

import { useState } from "react";
import { Plus, LogOut, CheckSquare } from "lucide-react";
import AuthGuard from "@/components/auth/AuthGuard";
import TaskCard from "@/components/tasks/TaskCard";
import TaskModal from "@/components/tasks/TaskModal";
import TaskFiltersBar from "@/components/tasks/TaskFilters";
import Pagination from "@/components/tasks/Pagination";
import EmptyState from "@/components/ui/EmptyState";
import Spinner from "@/components/ui/Spinner";
import { useTasks } from "@/hooks/useTasks";
import { useAuth } from "@/hooks/useAuth";
import { Task } from "@/types";
import { getUser } from "@/lib/auth";

export default function DashboardPage() {
  return (
    <AuthGuard>
      <Dashboard />
    </AuthGuard>
  );
}

function Dashboard() {
  const { logout } = useAuth();
  const { tasks, pagination, filters, loading, actionLoading, updateFilters, createTask, updateTask, deleteTask, toggleTask } = useTasks();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [modalLoading, setModalLoading] = useState(false);

  const user = getUser();

  const openCreate = () => {
    setEditingTask(null);
    setModalOpen(true);
  };

  const openEdit = (task: Task) => {
    setEditingTask(task);
    setModalOpen(true);
  };

  const handleModalSubmit = async (title: string) => {
    setModalLoading(true);
    try {
      if (editingTask) {
        await updateTask(editingTask.id, { title });
      } else {
        await createTask(title);
      }
      setModalOpen(false);
    } finally {
      setModalLoading(false);
    }
  };

  // Summary counts
  const total = pagination?.total ?? tasks.length;
  const doneCount = tasks.filter((t) => t.status === "completed").length;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--ink)",
        backgroundImage: "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(232,255,71,0.06) 0%, transparent 60%)",
      }}>
      {/* ── Navbar ── */}
      <header
        style={{
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          backdropFilter: "blur(12px)",
          position: "sticky",
          top: 0,
          zIndex: 40,
          background: "rgba(10,10,15,0.8)",
        }}>
        <div
          style={{
            maxWidth: 860,
            margin: "0 auto",
            padding: "0 20px",
            height: 60,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 32,
                height: 32,
                background: "var(--accent)",
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
              <CheckSquare size={17} color="#0A0A0F" strokeWidth={2.5} />
            </div>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 20,
                color: "var(--chalk)",
              }}>
              TaskFlow
            </span>
          </div>

          {/* User + logout */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span
              style={{
                fontSize: 13,
                color: "var(--chalk-muted)",
                fontFamily: "var(--font-mono)",
                display: "none",
              }}
              className="sm:block">
              {user?.email}
            </span>
            <button onClick={logout} className="btn-ghost" style={{ gap: 6 }} aria-label="Log out">
              <LogOut size={15} />
              <span style={{ fontSize: 13 }}>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* ── Main ── */}
      <main
        style={{
          maxWidth: 860,
          margin: "0 auto",
          padding: "40px 20px 80px",
        }}>
        {/* Page header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: 32,
            gap: 16,
            flexWrap: "wrap",
          }}>
          <div>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 38,
                color: "var(--chalk)",
                lineHeight: 1.1,
                marginBottom: 6,
              }}>
              My Tasks
            </h1>
            <p style={{ fontSize: 14, color: "var(--chalk-muted)" }}>
              {total} task{total !== 1 ? "s" : ""} total
              {doneCount > 0 && <span style={{ color: "var(--completed)", marginLeft: 6 }}>· {doneCount} completed</span>}
            </p>
          </div>

          <button onClick={openCreate} className="btn-accent" style={{ gap: 8 }}>
            <Plus size={18} strokeWidth={2.5} />
            New task
          </button>
        </div>

        {/* Filters */}
        <TaskFiltersBar filters={filters} onChange={updateFilters} />

        {/* Task list */}
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              paddingTop: 60,
            }}>
            <Spinner size="lg" />
          </div>
        ) : tasks.length === 0 ? (
          <EmptyState
            title={filters.search || filters.status ? "No tasks found" : "No tasks yet"}
            description={filters.search || filters.status ? "Try adjusting your search or filter." : "Create your first task to get started."}
            action={
              !filters.search && !filters.status ? (
                <button onClick={openCreate} className="btn-accent">
                  <Plus size={16} />
                  Create a task
                </button>
              ) : undefined
            }
          />
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} actionLoading={actionLoading} onToggle={toggleTask} onEdit={openEdit} onDelete={deleteTask} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {pagination && <Pagination pagination={pagination} onPageChange={(p) => updateFilters({ page: p })} />}
      </main>

      {/* ── Modal ── */}
      {modalOpen && <TaskModal task={editingTask} loading={modalLoading} onClose={() => setModalOpen(false)} onSubmit={handleModalSubmit} />}
    </div>
  );
}
