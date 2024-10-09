import React, { useState } from 'react';
import { PlusCircle, Trash2, UserPlus, UserMinus } from 'lucide-react';

interface User {
  id: string;
  name: string;
  role: 'ADMIN' | 'AUCTIONEER' | 'TRADER' | 'EXTERNAL_OBSERVER';
}

interface UserGroup {
  id: string;
  name: string;
  users: User[];
}

const UserGroupManagement: React.FC = () => {
  const [userGroups, setUserGroups] = useState<UserGroup[]>([
    { id: '1', name: 'Group 1', users: [] },
    { id: '2', name: 'Group 2', users: [] },
  ]);
  const [newGroupName, setNewGroupName] = useState('');
  const [availableUsers] = useState<User[]>([
    { id: '1', name: 'John Doe', role: 'TRADER' },
    { id: '2', name: 'Jane Smith', role: 'TRADER' },
    { id: '3', name: 'Bob Johnson', role: 'EXTERNAL_OBSERVER' },
  ]);

  const addUserGroup = () => {
    if (newGroupName.trim()) {
      setUserGroups([...userGroups, { id: Date.now().toString(), name: newGroupName, users: [] }]);
      setNewGroupName('');
    }
  };

  const deleteUserGroup = (id: string) => {
    setUserGroups(userGroups.filter(group => group.id !== id));
  };

  const addUserToGroup = (groupId: string, user: User) => {
    setUserGroups(userGroups.map(group =>
      group.id === groupId ? { ...group, users: [...group.users, user] } : group
    ));
  };

  const removeUserFromGroup = (groupId: string, userId: string) => {
    setUserGroups(userGroups.map(group =>
      group.id === groupId ? { ...group, users: group.users.filter(u => u.id !== userId) } : group
    ));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">User Group Management</h2>
      <div className="flex space-x-2">
        <input
          type="text"
          value={newGroupName}
          onChange={(e) => setNewGroupName(e.target.value)}
          placeholder="New Group Name"
          className="flex-grow p-2 border rounded"
        />
        <button onClick={addUserGroup} className="flex items-center space-x-1 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          <PlusCircle size={20} />
          <span>Add Group</span>
        </button>
      </div>
      <div className="space-y-4">
        {userGroups.map(group => (
          <div key={group.id} className="bg-white shadow rounded p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xl font-semibold">{group.name}</h3>
              <button
                onClick={() => deleteUserGroup(group.id)}
                className="flex items-center space-x-1 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                <Trash2 size={20} />
                <span>Delete Group</span>
              </button>
            </div>
            <div className="flex space-x-4">
              <div className="flex-1">
                <h4 className="font-medium mb-2">Group Users</h4>
                <ul className="space-y-1">
                  {group.users.map(user => (
                    <li key={user.id} className="flex justify-between items-center bg-gray-100 p-2 rounded">
                      <span>{user.name} ({user.role})</span>
                      <button
                        onClick={() => removeUserFromGroup(group.id, user.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <UserMinus size={20} />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex-1">
                <h4 className="font-medium mb-2">Available Users</h4>
                <ul className="space-y-1">
                  {availableUsers.filter(user => !group.users.some(u => u.id === user.id)).map(user => (
                    <li key={user.id} className="flex justify-between items-center bg-gray-100 p-2 rounded">
                      <span>{user.name} ({user.role})</span>
                      <button
                        onClick={() => addUserToGroup(group.id, user)}
                        className="text-green-500 hover:text-green-700"
                      >
                        <UserPlus size={20} />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserGroupManagement;