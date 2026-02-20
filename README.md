# Real-Time Collaborative Task Board

A Kanban-style task board with real-time synchronization, conflict resolution, and offline support. Built with React, Node.js, Socket.IO, and PostgreSQL.

## 🌐 Live Demo



## ✨ Features

- **Three-column Kanban**: To Do, In Progress, Done
- **Real-time sync**: All changes propagate to connected clients in <200ms (local)
- **Drag-and-drop**: Move tasks between columns and reorder within a column
- **Optimistic UI**: Instant feedback, then reconcile with server
- **Offline support**: Queue actions when disconnected, replay on reconnect
- **Conflict resolution**:
  - Concurrent move + edit → both preserved
  - Concurrent move + move → last write wins, loser notified
  - Concurrent reorder + add → consistent order via fractional indexing
- **Multi-user presence**: Avatars and editing indicators (who is viewing/editing)
- **Persistent storage**: PostgreSQL with Prisma ORM

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript + Vite, Zustand (state), dnd-kit (drag & drop), Socket.IO-client
- **Backend**: Node.js + Express + TypeScript, Socket.IO, Prisma (ORM)
- **Database**: PostgreSQL (with fractional indexing for ordering)
- **Deployment**: Railway (Dockerized)

## ⚙️ Local Development Setup

### Prerequisites
- Node.js v20+ (v20.19 or higher)
- PostgreSQL (local or Docker)
- Git

