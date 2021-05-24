import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function AppWrapper({ children }) {
  const [globalStore, setGlobalStore] = useState(new Map());

  const addPropToStore = (key, data) => {
    const store = globalStore;
    store.set(key, data);
    setGlobalStore(store);
  };

  const removePropFromStore = (key) => {
    const store = globalStore;
    store.delete(key);
    setGlobalStore(store);
  };

  const contextProps = {
    globalStore,
    contextManagment: {
      addPropToStore,
      removePropFromStore,
      store:globalStore
    },
  };

  return (
    <AppContext.Provider value={contextProps}>
      {children}
    </AppContext.Provider>
  );
}

export function useGlobalState() {
  const state = useContext(AppContext);

  if (state === undefined) {
    throw new Error('useGlobalState must be used within a AppContext.Provider');
  }

  return state;
}
