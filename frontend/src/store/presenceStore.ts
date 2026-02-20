import { create } from 'zustand';

export interface EditingInfo {
  taskId: string;
  username: string;
}

interface PresenceStore {
  onlineUsers: string[];
  editingTasks: EditingInfo[];
  setOnlineUsers: (users: string[]) => void;
  addEditing: (taskId: string, username: string) => void;
  removeEditing: (taskId: string, username: string) => void;
  clearEditingByUser: (username: string) => void;
}

export const usePresenceStore = create<PresenceStore>((set) => ({
  onlineUsers: [],
  editingTasks: [],
  setOnlineUsers: (users) => set({ onlineUsers: users }),
  addEditing: (taskId, username) =>
    set((state) => ({
      editingTasks: [...state.editingTasks, { taskId, username }],
    })),
  removeEditing: (taskId, username) =>
    set((state) => ({
      editingTasks: state.editingTasks.filter(
        (e) => !(e.taskId === taskId && e.username === username)
      ),
    })),
  clearEditingByUser: (username) =>
    set((state) => ({
      editingTasks: state.editingTasks.filter((e) => e.username !== username),
    })),
}));