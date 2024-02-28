export interface CreateEditFormProps<T> {
  children?: React.ReactNode;
  onClose?: () => void;
  type: "create" | "edit";
  spaces?: string[];
  userId?: string;
  itemId?: string;
  defaultData?: T
}
