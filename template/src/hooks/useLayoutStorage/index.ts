import { useState } from 'react';
import { UseLayoutStorage, LayoutStorage } from './types';

const LAYOUT_STORAGE_KEY = 'LAYOUT_STORAGE';

function useLayoutStorage(): UseLayoutStorage {
  const [layoutStorage, setLayoutStorage] = useState({});

  function getLayoutStorage() {
    const data = localStorage.getItem(LAYOUT_STORAGE_KEY);
    return { ...JSON.parse(data || '{}'), ...layoutStorage };
  }

  function saveLayoutStorage(data: LayoutStorage) {
    setLayoutStorage(data);
    localStorage.setItem(LAYOUT_STORAGE_KEY, JSON.stringify(data));
  }

  return {
    layoutStorage: getLayoutStorage(),
    setLayoutStorage: saveLayoutStorage,
  };
}

export default useLayoutStorage;
