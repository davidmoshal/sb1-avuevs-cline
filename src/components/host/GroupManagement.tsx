import React, { useState } from 'react';
import { Host, User, UserGroup, GroupRole } from '../../types';
import { PlusCircle, UserPlus, UserMinus } from 'lucide-react';

interface GroupManagementProps {
  host: Host;
}

const GroupManagement: React.FC<GroupManagementProps> = ({ host }) => {
  const [selectedGroup, setSelectedGroup] = useState<UserGroup | null>(null);
  const [newGroupName, setNewGroupName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  const allGroups: UserGroup[] = [
    host.adminGroup,
    host.traderGroup,
  ];

  const handleSelectGroup = (group: UserGroup) => {
    setSelectedGroup(group);
    setCurrentPage(1);
  };

  const handleCreateGroup = () => {
    if (newGroupName.trim()) {
      // In a real app, you'd call an API to create the group
      console.log(`Creating new group: ${newGroupName}`);
      setNewGroupName('');
    }
  };

  const handleMoveUser = (user: User, targetGroup: UserGroup) => {
    // In a real app, you'd call an API to move the user
    console.log(`Moving user ${user.username} to group ${targetGroup.name}`);
  };

  const filteredUsers = selectedGroup
    ? selectedGroup.users.filter(user => 
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Group Management</h2>
      <div className="flex space-x-2">
        <input
          type="text"
          value={newGroupName}
          onChange={(e) => setNewGroupName(e.target.value)}
          placeholder="New Group Name"
          className="flex-grow p-2 border rounded"
        />
        <button
          onClick={handleCreateGroup}
          className="flex items-center space-x-1 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          <PlusCircle size={20} />
          <span>Create Group</span>
        </button>
      </div>
      <div className="flex space-x-4">
        <div className="w-1/3">
          <h3 className="text-lg font-medium mb-2">Groups</h3>
          <ul className="space-y-2">
            {allGroups.map(group => (
              <li
                key={group.id}
                className={`cursor-pointer p-2 rounded ${selectedGroup?.id === group.id ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
                onClick={() => handleSelectGroup(group)}
              >
                {group.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="w-2/3">
          {selectedGroup ? (
            <div>
              <h3 className="text-lg font-medium mb-2">Users in {selectedGroup.name}</h3>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search users..."
                className="w-full p-2 border rounded mb-2"
              />
              <ul className="space-y-2">
                {currentUsers.map(user => (
                  <li key={user.id} className="p-2 bg-white shadow rounded flex justify-between items-center">
                    <span>{user.username} ({user.email})</span>
                    <div className="flex space-x-2">
                      {allGroups.filter(g => g.id !== selectedGroup.id).map(group => (
                        <button
                          key={group.id}
                          onClick={() => handleMoveUser(user, group)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <UserPlus size={20} />
                          <span className="sr-only">Move to {group.name}</span>
                        </button>
                      ))}
                      <button
                        onClick={() => handleMoveUser(user, { id: 'unassigned', name: 'Unassigned', role: 'UNASSIGNED', users: [] })}
                        className="text-red-500 hover:text-red-700"
                      >
                        <UserMinus size={20} />
                        <span className="sr-only">Remove from group</span>
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex justify-center">
                {Array.from({ length: Math.ceil(filteredUsers.length / usersPerPage) }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => paginate(i + 1)}
                    className={`mx-1 px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <p>Select a group to view its users</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GroupManagement;