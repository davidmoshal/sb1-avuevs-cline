import React, { useState } from 'react';
import { mockData } from '../../mockData';

interface Invitation {
  id: string;
  email: string;
  hostId: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
}

const InvitationManagement: React.FC = () => {
  const [invitations, setInvitations] = useState<Invitation[]>(mockData.invitations);
  const [newInvitation, setNewInvitation] = useState({ email: '', hostId: '' });

  const handleInvite = () => {
    if (newInvitation.email && newInvitation.hostId) {
      const invitation: Invitation = {
        id: Date.now().toString(),
        ...newInvitation,
        status: 'PENDING'
      };
      setInvitations([...invitations, invitation]);
      setNewInvitation({ email: '', hostId: '' });
    }
  };

  const handleResend = (id: string) => {
    // In a real app, this would trigger an API call to resend the invitation
    console.log(`Resending invitation ${id}`);
  };

  const handleCancel = (id: string) => {
    setInvitations(invitations.filter(inv => inv.id !== id));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Invitation Management</h2>
      <div className="flex space-x-2">
        <input
          type="email"
          value={newInvitation.email}
          onChange={(e) => setNewInvitation({ ...newInvitation, email: e.target.value })}
          placeholder="Email"
          className="flex-grow p-2 border rounded"
        />
        <input
          type="text"
          value={newInvitation.hostId}
          onChange={(e) => setNewInvitation({ ...newInvitation, hostId: e.target.value })}
          placeholder="Host ID"
          className="w-32 p-2 border rounded"
        />
        <button
          onClick={handleInvite}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Invite
        </button>
      </div>
      <ul className="space-y-2">
        {invitations.map(invitation => (
          <li key={invitation.id} className="flex justify-between items-center bg-white p-4 rounded shadow">
            <div>
              <p>{invitation.email}</p>
              <p className="text-sm text-gray-500">Host ID: {invitation.hostId}</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 rounded text-sm ${
                invitation.status === 'PENDING' ? 'bg-yellow-200 text-yellow-800' :
                invitation.status === 'ACCEPTED' ? 'bg-green-200 text-green-800' :
                'bg-red-200 text-red-800'
              }`}>
                {invitation.status}
              </span>
              {invitation.status === 'PENDING' && (
                <>
                  <button
                    onClick={() => handleResend(invitation.id)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Resend
                  </button>
                  <button
                    onClick={() => handleCancel(invitation.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InvitationManagement;