import React, { useState } from 'react';
import { User, Host } from '../../types';
import { mockUsers, mockHosts } from '../../mockData';

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [newUser, setNewUser] = useState({ username: '', email: '', role: 'HOST' as 'SYSTEM_ADMIN' | 'HOST' });

  const addUser = () => {
    if (newUser.username && newUser.email) {
      setUsers([...users, { ...newUser, id: Date.now().toString(), isMock: false, hostRoles: {} }]);
      setNewUser({ username: '', email: '', role: 'HOST' });
    }
  };

  const deleteUser = (id: string) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const getUserHosts = (user: User): Host[] => {
    return mockHosts.filter(host => 
      host.adminGroup.users.some(u => u.id === user.id) ||
      host.traderGroup.users.some(u => u.id === user.id)
    );
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">User Management</h2>
      <div className="mb-4 flex space-x-2">
        <input
          type="text"
          value={newUser.username}
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
          placeholder="Username"
          className="p-2 border rounded"
        />
        <input
          type="email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          placeholder="Email"
          className="p-2 border rounded"
        />
        <select
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value as 'SYSTEM_ADMIN' | 'HOST' })}
          className="p-2 border rounded"
        >
          <option value="SYSTEM_ADMIN">System Admin</option>
          <option value="HOST">Host</option>
        </select>
        <button onClick={addUser} className="bg-green-500 text-white px-4 py-2 rounded">Add User</button>
      </div>
      <ul>
        {users.map(user => (
          <li key={user.id} className="mb-2 p-2 border rounded">
            <div className="flex justify-between items-center">
              <span>{user.username} - {user.email} ({user.role})</span>
              <button
                onClick={() => deleteUser(user.id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
            {user.role === 'HOST' && (
              <div className="mt-2">
                <strong>Hosts:</strong>
                <ul className="list-disc list-inside">
                  {getUserHosts(user).map(host => (
                    <li key={host.id}>
                      {host.name} - {user.hostRoles?.[host.id] || 'Unknown Role'}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserManagement;