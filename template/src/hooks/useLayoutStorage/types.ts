export interface LayoutStorage {
  isCollapsed?: boolean;
}

export interface UseLayoutStorage {
  layoutStorage: LayoutStorage;
  setLayoutStorage: (props: LayoutStorage) => void;
}
