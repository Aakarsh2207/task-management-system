import prisma from "../utils/prisma";

// ── Get Tasks (paginated, filtered, searchable) ───────────────────────────────

export const getTasks = async (userId: string, page: number, limit: number, status?: string, search?: string) => {
  const skip = (page - 1) * limit;

  const where: Record<string, unknown> = { userId };

  if (status) {
    where.status = status;
  }

  if (search) {
    where.title = { contains: search };
  }

  const [tasks, total] = await prisma.$transaction([
    prisma.task.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    prisma.task.count({ where }),
  ]);

  return {
    tasks,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      hasNextPage: page < Math.ceil(total / limit),
      hasPrevPage: page > 1,
    },
  };
};

// ── Get Single Task ───────────────────────────────────────────────────────────

export const getTaskById = async (taskId: string, userId: string) => {
  const task = await prisma.task.findFirst({
    where: { id: taskId, userId },
  });

  if (!task) {
    throw Object.assign(new Error("Task not found"), { status: 404 });
  }

  return task;
};

// ── Create Task ───────────────────────────────────────────────────────────────

export const createTask = async (userId: string, title: string) => {
  return prisma.task.create({
    data: { title, userId },
  });
};

// ── Update Task ───────────────────────────────────────────────────────────────

export const updateTask = async (taskId: string, userId: string, data: { title?: string; status?: string }) => {
  // Ensure task belongs to this user
  await getTaskById(taskId, userId);

  return prisma.task.update({
    where: { id: taskId },
    data,
  });
};

// ── Delete Task ───────────────────────────────────────────────────────────────

export const deleteTask = async (taskId: string, userId: string) => {
  // Ensure task belongs to this user
  await getTaskById(taskId, userId);

  return prisma.task.delete({ where: { id: taskId } });
};

// ── Toggle Task Status ────────────────────────────────────────────────────────

export const toggleTaskStatus = async (taskId: string, userId: string) => {
  const task = await getTaskById(taskId, userId);

  const newStatus = task.status === "pending" ? "completed" : "pending";

  return prisma.task.update({
    where: { id: taskId },
    data: { status: newStatus },
  });
};
