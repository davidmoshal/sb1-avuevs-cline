import React from 'react'

const UserProfile: React.FC = () => {
  const user = { name: 'Demo User', role: 'TRADER' } // Mocked user data

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      <p>Name: {user.name}</p>
      <p>Role: {user.role}</p>
      {/* TODO: Add more profile information and edit functionality */}
    </div>
  )
}

export default UserProfile