
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'
import uuid from 'react-native-uuid';

export interface Client {
  id: string;
  name: string;
}

interface ClientState {
  clients: Client[];
  addClient: (name: string) => void;
  dropClient: (id: string) => void;
}

export const useClientStore = create<ClientState>()(
  persist(
    (set) => ({
      clients: [],
      addClient: (name: string) => 
        set((state) => ({
          clients: [
            ...state.clients,
            {
              'id': uuid.v4(),
              name
            } as Client,
          ]
        })
      ),
      dropClient: (id: string) => 
        set((state) => ({
          clients: state.clients.filter((client) => client.id !== id)
        })
      )
    }),
    { name: 'client-storage', storage: createJSONStorage(() => sessionStorage)}
  ),
);
