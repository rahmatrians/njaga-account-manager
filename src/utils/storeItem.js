import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

// ⬇️ not exported, so that no one can subscribe to the entire store
export const storeItem = create(
    persist(
        (set, get) => ({
            // bears: 0,
            // fish: 0,
            // increasePopulation: (by) =>
            //     set((state) => ({ bears: state.bears + by })),
            // eatFish: () => set((state) => ({ fish: state.fish - 1 })),
            // removeAllBears: () => set({ bears: 0 }),
            bears: 0,
            userId: null,
            fullname: null,
            email: null,
            userToken: null,
            refreshToken: null,
            menuActive: '1',

            increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
            fillUserId: (val) => set({ userId: val }),
            fillFullname: (val) => set({ fullname: val }),
            fillEmail: (val) => set({ email: val }),
            fillUserToken: (val) => set({ userToken: val }),
            fillRefreshToken: (val) => set({ refreshToken: val }),
            fillMenuActive: (val) => set({ menuActive: val }),

            removeUserId: () => set({ userId: null }),
            removeFullname: () => set({ fullname: null }),
            removeEmail: () => set({ emai: null }),
            removeUserToken: () => set({ userToken: null }),
            removeRefreshToken: () => set({ refreshToken: null }),
            removeMenuActive: () => set({ menuActive: 1 }),

        }),
        {
            name: 'user-storage', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used      
        }
    ))

// 💡 exported - consumers don't need to write selectors
// export const storeItem = () => storeItem((state) => state.bears)