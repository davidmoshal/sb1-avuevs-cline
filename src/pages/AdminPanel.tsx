import React, { useState } from 'react';
import HostManagement from '../components/admin/HostManagement';
import UserManagement from '../components/admin/UserManagement';
import SystemSettings from '../components/admin/SystemSettings';
import InvitationManagement from '../components/admin/InvitationManagement';
import TradingGroupManagement from '../components/admin/TradingGroupManagement';

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'hosts' | 'users' | 'settings' | 'invitations' | 'tradingGroups'>('hosts');

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Admin Panel</h1>
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => setActiveTab('hosts')}
          className={`px-4 py-2 rounded ${activeTab === 'hosts' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Manage Hosts
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2 rounded ${activeTab === 'users' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Manage Users
        </button>
        <button
          onClick={() => setActiveTab('invitations')}
          className={`px-4 py-2 rounded ${activeTab === 'invitations' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Manage Invitations
        </button>
        <button
          onClick={() => setActiveTab('tradingGroups')}
          className={`px-4 py-2 rounded ${activeTab === 'tradingGroups' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Trading Groups
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`px-4 py-2 rounded ${activeTab === 'settings' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          System Settings
        </button>
      </div>
      {activeTab === 'hosts' && <HostManagement />}
      {activeTab === 'users' && <UserManagement />}
      {activeTab === 'invitations' && <InvitationManagement />}
      {activeTab === 'tradingGroups' && <TradingGroupManagement />}
      {activeTab === 'settings' && <SystemSettings />}
    </div>
  );
};

export default AdminPanel;
