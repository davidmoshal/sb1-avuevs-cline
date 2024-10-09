import React, { useState } from 'react';
import { useAuth } from '../components/auth/AuthProvider';
import { mockHosts, mockUsers } from '../mockData';
import { Host, User, UserGroup, GroupRole } from '../types';
import GroupManagement from '../components/host/GroupManagement';
import InvitationManagement from '../components/host/InvitationManagement';

const HostManagement: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'groups' | 'invitations'>('groups');

  // In a real application, we would fetch this data from an API
  const currentHost = mockHosts.find(host => host.auctioneerGroup.users.some(u => u.id === user?.id));

  if (!currentHost) {
    return <div>No host found for the current user.</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Host Management: {currentHost.name}</h1>
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => setActiveTab('groups')}
          className={`px-4 py-2 rounded ${activeTab === 'groups' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Manage Groups
        </button>
        <button
          onClick={() => setActiveTab('invitations')}
          className={`px-4 py-2 rounded ${activeTab === 'invitations' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Manage Invitations
        </button>
      </div>
      {activeTab === 'groups' && <GroupManagement host={currentHost} />}
      {activeTab === 'invitations' && <InvitationManagement host={currentHost} />}
    </div>
  );
};

export default HostManagement;