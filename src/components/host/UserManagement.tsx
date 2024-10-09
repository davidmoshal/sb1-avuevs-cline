import React, { useState } from 'react';
import { Host, User } from '../../types';

interface UserManagementProps {
  host: Host;
}

const UserManagement: React.FC<UserManagementProps> = ({ host }) => {
  const [users, setUsers] = useState<User[]>([...host.adminGroup.users, ...host.traderGroup.users]);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">User Management for {host.name}</h2>
      <ul className="space-y-2">
        {users.map(user => (
          <li key={user.id} className="bg-white shadow rounded-lg p-4">
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
            <p>Role: {user.hostRoles?.[host.id] || 'N/A'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserManagement;