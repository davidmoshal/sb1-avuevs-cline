import React, { useState } from 'react';
import { Host, User } from '../../types';
import { Send, XCircle, RefreshCw } from 'lucide-react';

interface Invitation {
  id: string;
  email: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
}

interface InvitationManagementProps {
  host: Host;
}

const InvitationManagement: React.FC<InvitationManagementProps> = ({ host }) => {
  const [invitations, setInvitations] = useState<Invitation[]>([
    { id: '1', email: 'pending@example.com', status: 'PENDING' },
    { id: '2', email: 'accepted@example.com', status: 'ACCEPTED' },
  ]);
  const [newInvitationEmail, setNewInvitationEmail] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const invitationsPerPage = 10;

  const handleInvite = () => {
    if (newInvitationEmail) {
      const newInvitation: Invitation = {
        id: Date.now().toString(),
        email: newInvitationEmail,
        status: 'PENDING',
      };
      setInvitations([...invitations, newInvitation]);
      setNewInvitationEmail('');
    }
  };

  const handleResendInvitation = (id: string) => {
    // In a real app, you'd call an API to resend the invitation
    console.log(`Resending invitation to ${id}`);
  };

  const handleCancelInvitation = (id: string) => {
    setInvitations(invitations.filter(inv => inv.id !== id));
  };

  const filteredInvitations = invitations.filter(inv => 
    inv.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastInvitation = currentPage * invitationsPerPage;
  const indexOfFirstInvitation = indexOfLastInvitation - invitationsPerPage;
  const currentInvitations = filteredInvitations.slice(indexOfFirstInvitation, indexOfLastInvitation);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Invitation Management</h2>
      <div className="flex space-x-2">
        <input
          type="email"
          value={newInvitationEmail}
          onChange={(e) => setNewInvitationEmail(e.target.value)}
          placeholder="Enter email to invite"
          className="flex-grow p-2 border rounded"
        />
        <button
          onClick={handleInvite}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center space-x-1"
        >
          <Send size={20} />
          <span>Invite</span>
        </button>
      </div>
      <div>
        <h3 className="text-lg font-medium mb-2">Invitations</h3>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search invitations..."
          className="w-full p-2 border rounded mb-2"
        />
        <ul className="space-y-2">
          {currentInvitations.map(invitation => (
            <li key={invitation.id} className="p-2 bg-white shadow rounded flex justify-between items-center">
              <span>{invitation.email}</span>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded ${
                  invitation.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                  invitation.status === 'ACCEPTED' ? 'bg-green-100 text-green-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {invitation.status}
                </span>
                {invitation.status === 'PENDING' && (
                  <>
                    <button
                      onClick={() => handleResendInvitation(invitation.id)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <RefreshCw size={20} />
                      <span className="sr-only">Resend</span>
                    </button>
                    <button
                      onClick={() => handleCancelInvitation(invitation.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <XCircle size={20} />
                      <span className="sr-only">Cancel</span>
                    </button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex justify-center">
          {Array.from({ length: Math.ceil(filteredInvitations.length / invitationsPerPage) }, (_, i) => (
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
    </div>
  );
};

export default InvitationManagement;