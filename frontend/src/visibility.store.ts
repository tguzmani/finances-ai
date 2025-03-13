import { create } from 'zustand'

type VisibilityStore = {
  visibility: boolean
  toggleVisibility: () => void
}

export const useVisibilityStore = create<VisibilityStore>(set => ({
  visibility: true,
  toggleVisibility: () => set(state => ({ visibility: !state.visibility })),
}))
