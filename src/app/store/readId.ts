import { create } from 'zustand'
import { localGet } from '../utils/storage'

interface State {
  readId: string
  setReadId: (val: string) => void
}

export const useReadIdStore = create<State>(set => ({
  readId: '' || localGet('readId'),
  setReadId: val =>
    set({
      readId: val,
    }),
}))
