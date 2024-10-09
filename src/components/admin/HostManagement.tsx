import React, { useState } from 'react';
import { mockHosts } from '../../mockData';
import { Host } from '../../types';

const HostManagement: React.FC = () => {
  const [hosts, setHosts] = useState<Host[]>(mockHosts);
  const [newHostName, setNewHostName] = useState('');

  const addHost = () => {
    if (newHostName.trim()) {
      const newHost: Host = {
        id: (hosts.length + 1).toString(),
        name: newHostName,
        auctions: [],
        adminGroup: { id: '', name: `${newHostName} Admins`, role: 'HOST_ADMIN', users: [] },
        traderGroup: { id: '', name: `${newHostName} Traders`, role: 'TRADER', users: [] },
        isMock: false,
      };
      setHosts([...hosts, newHost]);
      setNewHostName('');
    }
  };

  const toggleMockStatus = (hostId: string) => {
    setHosts(hosts.map(host => 
      host.id === hostId ? { ...host, isMock: !host.isMock } : host
    ));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Host Management</h2>
      <div className="flex space-x-2">
        <input
          type="text"
          value={newHostName}
          onChange={(e) => setNewHostName(e.target.value)}
          placeholder="New Host Name"
          className="flex-grow p-2 border rounded"
        />
        <button onClick={addHost} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Add Host
        </button>
      </div>
      <ul className="space-y-2">
        {hosts.map(host => (
          <li key={host.id} className="bg-white shadow rounded-lg p-4">
            <h3 className="text-xl font-semibold">{host.name}</h3>
            <p>Auctions: {host.auctions.length}</p>
            <p>Admins: {host.adminGroup.users.length}</p>
            <p>Traders: {host.traderGroup.users.length}</p>
            <div className="mt-2">
              <button
                onClick={() => toggleMockStatus(host.id)}
                className={`px-3 py-1 rounded ${host.isMock ? 'bg-yellow-500' : 'bg-green-500'} text-white`}
              >
                {host.isMock ? 'Mock' : 'Real'}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HostManagement;