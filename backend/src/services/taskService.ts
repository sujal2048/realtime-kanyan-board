import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAllTasks() {
  return prisma.task.findMany({
    orderBy: [{ column: 'asc' }, { rank: 'asc' }]
  });
}

export async function createTask(data: {
  title: string;
  description?: string;
  column: string;
  rank: string;
}) {
  return prisma.task.create({
    data: {
      title: data.title,
      description: data.description || '',
      column: data.column,
      rank: data.rank,
    },
  });
}

export async function updateTask(
  id: string,
  data: Partial<{
    title: string;
    description: string;
    column: string;
    rank: string;
  }>
) {
  return prisma.task.update({
    where: { id },
    data,
  });
}

export async function deleteTask(id: string) {
  return prisma.task.delete({ where: { id } });
}