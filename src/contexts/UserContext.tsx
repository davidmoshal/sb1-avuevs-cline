import React, { createContext, useState, useContext, ReactNode } from 'react'

type UserRole = 'ADMIN' | 'AUCTIONEER' | 'TRADER' | 'EXTERNAL_OBSERVER' | null

interface User {
  id: string
  name: string
  role: UserRole
}

interface UserContextType {
  user: User | null
  setUser: React.Dispatch<React.SetStateAction<User | null>>
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>({
    id: '1',
    name: 'Demo User',
    role: 'ADMIN'
  })

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}