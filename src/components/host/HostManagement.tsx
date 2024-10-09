import React, { useState } from 'react';
import { Host, User, UserGroup, GroupRole } from '../../types';
import GroupManagement from './GroupManagement';
import InvitationManagement from './InvitationManagement';

interface HostManagementProps {
  host: Host;
}

const HostManagement: React.FC<HostManagementProps> = ({ host }) => {
  const [activeTab, setActiveTab] = useState<'groups' | 'invitations'>('groups');

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Host Management: {host.name}</h1>
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
      {activeTab === 'groups' && <GroupManagement host={host} />}
      {activeTab === 'invitations' && <InvitationManagement host={host} />}
    </div>
  );
};

export default HostManagement;