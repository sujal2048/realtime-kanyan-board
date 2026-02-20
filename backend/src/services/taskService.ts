import { PrismaClient } from '@prisma/client';
import { generateKeyBetween } from 'fractional-indexing'; // npm install this

const prisma = new PrismaClient();

export async function getAllTasks() {
  return prisma.task.findMany({
    orderBy: [{ column: 'asc' }, { rank: 'asc' }]
  });
}

export async function createTask(data: {
  id?: string;            // optional – if client sends a temp ID we ignore it
  title: string;
  description?: string;
  column: string;
  afterId?: string | null; // ID of task to insert after (null means beginning)
}) {
  // Determine rank based on afterId
  let rank: string;
  const columnTasks = await prisma.task.findMany({
    where: { column: data.column },
    orderBy: { rank: 'asc' }
  });

  if (!data.afterId) {
    // Insert at the beginning
    const firstRank = columnTasks.length > 0 ? columnTasks[0].rank : null;
    rank = generateKeyBetween(null, firstRank);
  } else {
    const afterIndex = columnTasks.findIndex(t => t.id === data.afterId);
    if (afterIndex === -1) {
      throw new Error('Task to insert after not found');
    }
    const prevRank = columnTasks[afterIndex].rank;
    const nextRank = afterIndex + 1 < columnTasks.length ? columnTasks[afterIndex + 1].rank : null;
    rank = generateKeyBetween(prevRank, nextRank);
  }

  return prisma.task.create({
    data: {
      title: data.title,
      description: data.description || '',
      column: data.column,
      rank,
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

export async function moveTask(data: {
  id: string;
  column: string;
  afterId?: string | null; // ID of task to move after (null means beginning)
}) {
  const task = await prisma.task.findUnique({ where: { id: data.id } });
  if (!task) throw new Error('Task not found');

  // Get all tasks in the target column, excluding the moving task itself
  const columnTasks = await prisma.task.findMany({
    where: { column: data.column },
    orderBy: { rank: 'asc' }
  }).then(tasks => tasks.filter(t => t.id !== data.id));

  let newRank: string;
  if (!data.afterId) {
    // Move to beginning of column
    const firstRank = columnTasks.length > 0 ? columnTasks[0].rank : null;
    newRank = generateKeyBetween(null, firstRank);
  } else {
    const afterIndex = columnTasks.findIndex(t => t.id === data.afterId);
    if (afterIndex === -1) throw new Error('Target task not found in column');
    const prevRank = columnTasks[afterIndex].rank;
    const nextRank = afterIndex + 1 < columnTasks.length ? columnTasks[afterIndex + 1].rank : null;
    newRank = generateKeyBetween(prevRank, nextRank);
  }

  return prisma.task.update({
    where: { id: data.id },
    data: {
      column: data.column,
      rank: newRank,
    },
  });
}

export async function deleteTask(id: string) {
  return prisma.task.delete({ where: { id } });
}