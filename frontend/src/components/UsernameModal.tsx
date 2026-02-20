import React, { useState } from 'react';

interface Props {
  onSubmit: (username: string) => void;
}

export default function UsernameModal({ onSubmit }: Props) {
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onSubmit(username.trim());
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Enter your username</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Username"
            autoFocus
          />
          <button type="submit">Join Board</button>
        </form>
      </div>
    </div>
  );
}