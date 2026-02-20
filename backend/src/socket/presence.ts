// backend/src/socket/presence.ts
interface User {
  id: string;      // socket id
  name: string;
}

const onlineUsers = new Map<string, User>();

export const registerPresence = (socketId: string, user: User) => {
  onlineUsers.set(socketId, user);
};

export const unregisterPresence = (socketId: string) => {
  onlineUsers.delete(socketId);
};

export const getOnlineUsers = () => Array.from(onlineUsers.values());