import { create } from 'zustand'

export type UserStore = {
    user: {
        name: string
    },
    setUser: (user: { name: string }) => void
}

export const useUserStore = create<UserStore>((set) => ({
    user: {
        name: ''
    },
    setUser: (user) => set({ user })
}))