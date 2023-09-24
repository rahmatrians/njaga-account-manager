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

            userId: null,
            fullname: null,
            email: null,
            avatar: null,
            lastLogin: null,

            userToken: null,
            refreshToken: null,

            menuActive: '1',
            toastMessage: null,
            accountAddModal: false,
            accountUpdateModal: false,

            // increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
            fillUserId: (val) => set({ userId: val }),
            fillFullname: (val) => set({ fullname: val }),
            fillEmail: (val) => set({ email: val }),
            fillAvatar: (val) => set({ avatar: val }),
            fillLastLogin: (val) => set({ lastLogin: val }),

            fillUserToken: (val) => set({ userToken: val }),
            fillRefreshToken: (val) => set({ refreshToken: val }),

            fillMenuActive: (val) => set({ menuActive: val }),
            fillToastMessage: (val) => set({ toastMessage: val }),
            fillAccountAddModal: (val) => set({ accountAddModal: val }),
            fillAccountUpdateModal: (val) => set({ accountUpdateModal: val }),

            removeUserId: () => set({ userId: null }),
            removeFullname: () => set({ fullname: null }),
            removeEmail: () => set({ email: null }),
            removeAvatar: () => set({ avatar: null }),
            removeLastLogin: () => set({ lastLogin: null }),

            removeUserToken: () => set({ userToken: null }),
            removeRefreshToken: () => set({ refreshToken: null }),
            removeMenuActive: () => set({ menuActive: 1 }),

            resetAll: () => set({
                userId: null,
                fullname: null,
                email: null,
                avatar: null,
                lastLogin: null,

                userToken: null,
                refreshToken: null,

                menuActive: '1',
                toastMessage: null,
                accountAddModal: false,
                accountUpdateModal: false,
            }),

        }),
        {
            name: 'user-storage', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used      
        }
    ))

// 💡 exported - consumers don't need to write selectors
// export const storeItem = () => storeItem((state) => state.bears)