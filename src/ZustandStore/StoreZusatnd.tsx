import create from 'zustand';
import { persist } from 'zustand/middleware';

type UserState = {
  User: {
    FirstName: string;
    LastName: string;
    Email: string;
    password: string;
    IsReader: ("Reader" | "Writer");
    confirmPassword: string;
    DisplayName: string;
    HasAdminPower: boolean;
    docId: string ;
  };
  setFirstName: (name: string) => void;
  setLastName: (lastName: string) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setDisplayName: (displayname: string) => void;
  setConfirmPassword: (confirmPassword: string) => void;
  setHasAdminPower: (hasAdminPower: boolean) => void;
  setIsReader: (IsReader: "Reader" | "Writer") => void;
  setDocId: (docId: string) => void; 
};

const useStore = create(
  persist<UserState>(
    (set) => ({
      User: {
        FirstName: '',
        LastName: '',
        Email: '',
        IsReader: "Reader",
        password: '',
        confirmPassword: '',
        DisplayName: '',
        HasAdminPower: false,
        docId: ""
      },
      setFirstName: (name: string) => set((state) => ({ User: { ...state.User, FirstName: name } })),
      setLastName: (lastName: string) => set((state) => ({ User: { ...state.User, LastName: lastName } })),
      setEmail: (email: string) => set((state) => ({ User: { ...state.User, Email: email } })),
      setPassword: (password: string) => set((state) => ({ User: { ...state.User, password: password } })),
      setDisplayName: (displayname: string) => set((state) => ({ User: { ...state.User, DisplayName: displayname } })),
      setIsReader: (isreader: "Reader" | "Writer") => set((state) => ({ User: { ...state.User, IsReader: isreader } })),
      setConfirmPassword: (confirmPassword: string) => set((state) => ({ User: { ...state.User, confirmPassword: confirmPassword } })),
      setHasAdminPower: (hasAdminPower: boolean) => set((state) => ({ User: { ...state.User, HasAdminPower: hasAdminPower } })),
      setDocId: (docId: string ) => set((state) => ({ User: { ...state.User, docId: docId } })), 
    }),
    {
      name: 'userStore',
      getStorage: () => localStorage,
    }
  )
);

export { useStore };
