import type { TaskStore } from './taskStore';

type QueueAction = {
  type: 'CREATE' | 'UPDATE' | 'DELETE';
  payload: any;
};

class OfflineQueue {
  private queue: QueueAction[] = [];

  enqueue(action: QueueAction) {
    this.queue.push(action);
  }

  flush(store: TaskStore) {
    while (this.queue.length) {
      const action = this.queue.shift()!;
      switch (action.type) {
        case 'CREATE':
          store.optimisticCreate(action.payload);
          break;
        case 'UPDATE':
          store.optimisticUpdate(action.payload.id, action.payload);
          break;
        case 'DELETE':
          store.optimisticDelete(action.payload);
          break;
      }
    }
  }
}

export const offlineQueue = new OfflineQueue();