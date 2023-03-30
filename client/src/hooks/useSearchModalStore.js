import { create } from 'zustand';

const useSearchModalStore = create((set) => ({
    isOpen: false,
    openModal: () => set((state) => ({ isOpen: true })),
    closeModal: () => set((state) => ({ isOpen: false })),
}));

export default useSearchModalStore;