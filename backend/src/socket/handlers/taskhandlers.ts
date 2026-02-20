// backend/src/socket/handlers/taskHandlers.ts
import { Server, Socket } from 'socket.io';
import * as taskService from '../../services/taskService';

export const handleCreate = async (io: Server, socket: Socket, data: any) => {
  try {
    const { id, title, column, afterId } = data;
    const task = await taskService.createTask({ id, title, column, afterId });
    io.to('board').emit('task:created', { task, createdBy: socket.id });
  } catch (err: any) {
    socket.emit('error', { message: err.message });
  }
};

export const handleUpdate = async (io: Server, socket: Socket, data: any) => {
  try {
    const { taskId, title, description } = data;
    const task = await taskService.updateTask(taskId, { title, description });
    io.to('board').emit('task:updated', { task, updatedBy: socket.id });
  } catch (err: any) {
    socket.emit('error', { message: err.message });
  }
};

export const handleMove = async (io: Server, socket: Socket, data: any) => {
  try {
    const { taskId, column, afterId } = data;
    const task = await taskService.moveTask(taskId, column, afterId);
    io.to('board').emit('task:moved', { task, movedBy: socket.id });
  } catch (err: any) {
    socket.emit('error', { message: err.message });
  }
};

export const handleDelete = async (io: Server, socket: Socket, data: any) => {
  try {
    const { taskId } = data;
    await taskService.deleteTask(taskId);
    io.to('board').emit('task:deleted', { taskId, deletedBy: socket.id });
  } catch (err: any) {
    socket.emit('error', { message: err.message });
  }
};